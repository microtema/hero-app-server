import {Op} from 'sequelize';
import {Singleton} from 'typescript-ioc';
import models from '../database/models';
import {Author} from './Author';

@Singleton
export default class AuthorRepository {

    private readonly model: any;
    private readonly containerModel: any;

    constructor() {
        this.model = models.AuthorModel;
        this.containerModel = models.BookModel;
    }

    /**
     * Find all Authors filtered by name
     *
     * @param name may be undefined or null
     */
    public findAll(name?: string) {

        const options = {
            include: [this.containerModel],
            where: {
                name: {
                    [Op.iLike]: '%' + (name || ''),
                },
            },
        };

        return this.model.findAll(options);
    }

    /**
     * Find Author by name
     *
     * @param id may not be null
     */
    public findByPk(id: string) {

        return this.model.findByPk(id, {include: [this.containerModel]});
    }

    /**
     * Save new Author
     *
     * @param entity may not be null
     */
    public save(entity: Author) {

        return this.model.create(entity);
    }

    /**
     * Update new Author
     *
     * @param entity may not be null
     */
    public update(entity: Author) {

        const properties = {
            name: entity.name,
        };

        const predicate = {
            where: {
                id: entity.id,
            },
        };

        return this.model.update(properties, predicate);
    }

    /**
     * Delete Author by Id
     *
     * @param id may not be null
     */
    public delete(id: string) {

        return this.model.destroy({where: {id}});
    }
}
