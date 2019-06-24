import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Book} from '../../../src/book/Book';

export default class BookBuilder extends ModelBuilder<Book> {

    public min(): Book {
        return {
            id: faker.random.uuid(),
            title: faker.lorem.words(),
        } as Book;
    }
}
