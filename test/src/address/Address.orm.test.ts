import {DataTypes} from 'sequelize';
import BookModel from '../../../src/address/Address.orm';
import {EntityStatic} from '../../../src/repository/Entity';

describe('Address orm API', () => {

    const model = {belongsTo: jest.fn() as any} as EntityStatic<number>;
    const sequelize = {define: jest.fn(() => model)};

    const sut = BookModel(sequelize, DataTypes) as any;

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('Check Model Name', () => {

        expect(sequelize.define).toBeCalledWith('address', {
            city: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            country: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            street: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            zip: {
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
        const AuthorModel = {};
        const models = {AuthorModel};

        // when
        sut.associate(models);

        // then
        expect(sut.belongsTo).toBeCalledWith(AuthorModel);
    });
});
