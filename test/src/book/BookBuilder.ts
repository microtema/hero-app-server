import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Singleton} from 'typescript-ioc';
import {Book} from '../../../src/book/Book';

@Singleton
export default class BookBuilder extends ModelBuilder<Book> {

    public min(): Book {
        return {
            id: faker.random.uuid(),
            title: faker.lorem.words(),
        } as Book;
    }
}
