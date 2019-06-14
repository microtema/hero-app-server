import {DestroyOptions, FindOptions, Identifier, UpdateOptions} from 'sequelize';
import {Entity, EntityStatic} from './Entity';

abstract class CrudRepository<T extends Entity<ID>, ID extends Identifier> {

    /**
     * Find all Authors filtered by name
     *
     * @param options may be undefined or null
     */
    public findAll(options?: any) {

        return this.model().findAll(options || {});
    }

    /**
     * Find entity by id
     *
     * @param id may not be null
     * @param options may be null
     */
    public findByPk(id: ID, options?: any) {

        options = options || {
            where: {
                id,
            },
        } as FindOptions;

        return this.model().findByPk(id, options);
    }

    /**
     * Save new entity
     *
     * @param entity may not be null
     */
    public save(entity: T) {

        return this.model().create(entity);
    }

    /**
     * Update new Author
     *
     * @param entity may not be null
     */
    public update(entity: T) {

        const predicate = {
            where: {
                id: entity.id,
            },
        } as UpdateOptions;

        return this.model().update(entity, predicate);
    }

    /**
     * Delete enity by Id
     *
     * @param id may not be null
     */
    public delete(id: ID) {

        return this.model().destroy({where: {id}} as DestroyOptions);
    }

    public abstract model(): EntityStatic<ID>;
}

export default CrudRepository;
