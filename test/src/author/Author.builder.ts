import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Author} from '../../../src/author';
import BookBuilder from '../book/Book.builder';

export default class AuthorBuilder extends ModelBuilder<Author> {

    constructor(private bookBuilder: BookBuilder) {
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
