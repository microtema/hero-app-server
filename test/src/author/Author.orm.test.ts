import {DataTypes} from 'sequelize';
import AuthorModel from '../../../src/author/Author.orm';
import {EntityStatic} from '../../../src/repository/Entity';

describe('Author orm API', () => {

    const model = {hasMany: jest.fn() as any} as EntityStatic<number>;
    const sequelize = {define: jest.fn(() => model)};

    const sut = AuthorModel(sequelize, DataTypes) as any;

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('Check Model Name', () => {

        expect(sequelize.define).toBeCalledWith('author', {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        });
    });

    it('check associate to be defined as function', () => {

        expect(sut).toHaveProperty('associate');
        expect(typeof sut.associate).toBe('function');
    });

    it('check associate', () => {

        // given
        const BookModel = {};
        const AddressModel = {};
        const models = {BookModel, AddressModel};

        // when
        sut.associate(models);

        // then
        expect(sut.hasMany).toBeCalledWith(BookModel, {onDelete: 'CASCADE'});
        expect(sut.hasMany).toBeCalledWith(AddressModel, {onDelete: 'CASCADE'});
    });
});
