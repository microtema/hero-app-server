import {EntityStatic} from '../repository/Entity';

const AuthorModel = (sequelize, DataTypes): EntityStatic<number> => {

    const model = sequelize.define('author', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });

    model.associate = (models) => {
        model.hasMany(models.BookModel, {onDelete: 'CASCADE'});
    };

    return model as EntityStatic<number>;
};

export default AuthorModel;
