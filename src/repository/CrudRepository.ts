import {Entity} from './Entity';

abstract class CrudRepository<T extends Entity<ID>, ID> {

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
        };

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
        };

        return this.model().update(entity, predicate);
    }

    /**
     * Delete enity by Id
     *
     * @param id may not be null
     */
    public delete(id: ID) {

        return this.model().destroy({where: {id}});
    }

    public abstract model();
}

export default CrudRepository;
