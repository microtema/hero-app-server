const BookModel = (sequelize, DataTypes) => {

    const model = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
        },
    });

    model.associate = (models) => {
        model.belongsTo(models.AuthorModel);
    };

    return model;
};

export default BookModel;
