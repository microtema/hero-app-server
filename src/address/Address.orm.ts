import {EntityStatic} from '../repository/Entity';

const AddressModel = (sequelize, DataTypes): EntityStatic<number> => {

    const model = sequelize.define('address', {
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

    model.associate = (models) => {

        model.belongsTo(models.AuthorModel);
    };

    return model as EntityStatic<number>;
};

export default AddressModel;
