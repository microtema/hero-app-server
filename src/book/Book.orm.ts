import {EntityStatic} from '../repository/Entity';

const BookModel = (sequelize, DataTypes): EntityStatic<number> => {

    const model = sequelize.define('book', {
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });

    model.associate = ({AuthorModel}) => {
        model.belongsTo(AuthorModel);
    };

    return model as EntityStatic<number>;
};

export default BookModel;
