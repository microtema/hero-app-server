import {Op} from 'sequelize';
import {Singleton} from 'typescript-ioc';
import CrudRepository from '../repository/CrudRepository';
import models from '../repository/models';
import {Address} from './Address';

@Singleton
export default class AddressRepository extends CrudRepository<Address, number> {

    public model() {

        return models.AddressModel;
    }

    /**
     * Find all Authors filtered by name
     *
     * @param name may be undefined or null
     */
    public findAll(name?: string) {

        const options = {
            include: [models.AuthorModel],
            where: {
                street: {
                    [Op.iLike]: '%' + (name || ''),
                },
            },
        };

        return super.findAll(options);
    }

    /**
     * Find Author by name
     *
     * @param id may not be null
     */
    public findByPk(id: number) {

        return super.findByPk(id, {include: [models.AuthorModel]});
    }

}
