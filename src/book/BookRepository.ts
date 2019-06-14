import {Op} from 'sequelize';
import {Singleton} from 'typescript-ioc';
import CrudRepository from '../repository/CrudRepository';
import models from '../repository/models';
import {Book} from './Book';

@Singleton
class BookRepository extends CrudRepository<Book, number> {

    public model() {
        return models.BookModel;
    }

    /**
     * Find all Books filtered by name
     *
     * @param title may be undefined or null
     */
    public findAll(title?: string) {

        const options = {
            include: [models.AuthorModel],
            where: {
                title: {
                    [Op.iLike]: '%' + (title || ''),
                },
            },
        };

        return super.findAll(options);
    }

    /**
     * Find Book by name
     *
     * @param id may not be null
     */
    public findByPk(id: number) {

        return super.findByPk(id, {include: [models.AuthorModel]});
    }

}

export default BookRepository;
