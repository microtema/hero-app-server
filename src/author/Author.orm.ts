const AuthorModel = (sequelize, DataTypes) => {

    const model = sequelize.define('author', {
        name: {
            type: DataTypes.STRING,
        },
    });

    model.associate = (models) => {
        model.hasMany(models.BookModel, {onDelete: 'CASCADE'});
    };

    return model;
};

export default AuthorModel;
