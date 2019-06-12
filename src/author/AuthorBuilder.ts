import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Inject, Singleton} from 'typescript-ioc';
import BookBuilder from '../book/BookBuilder';
import {Author} from './Author';

@Singleton
export default class AuthorBuilder extends ModelBuilder<Author> {

    constructor(@Inject private bookBuilder: BookBuilder) {
        super();
    }

    public min(): Author {

        const author = {
            books: this.bookBuilder.list(3),
            id: faker.random.uuid(),
            name: faker.name.findName(),
        } as Author;

        author.books.forEach((it) => it.author = author);

        return author;
    }
}
