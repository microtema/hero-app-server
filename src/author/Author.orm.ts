import {EntityStatic} from '../repository/Entity';

const AuthorModel = (sequelize, DataTypes): EntityStatic<number> => {

    const model = sequelize.define('author', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });

    model.associate = ({BookModel, AddressModel}) => {
        model.hasMany(BookModel, {onDelete: 'CASCADE'});
        model.hasMany(AddressModel, {onDelete: 'CASCADE'});
    };

    return model as EntityStatic<number>;
};

export default AuthorModel;
