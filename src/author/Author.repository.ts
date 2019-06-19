import {Op} from 'sequelize';
import {Singleton} from 'typescript-ioc';
import CrudRepository from '../repository/CrudRepository';
import models from '../repository/models';
import {Author} from './Author';

@Singleton
export default class AuthorRepository extends CrudRepository<Author, number> {

    /**
     * Provide AuthorModel
     */
    public model() {

        return models.AuthorModel;
    }

    /**
     * Find all Authors filtered by name
     *
     * @param name may be undefined or null
     */
    public findAll(name?: string) {

        const options = {
            include: [models.BookModel, models.AddressModel],
            where: {
                name: {
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

        return super.findByPk(id, {include: [models.BookModel, models.AddressModel]});
    }
}
