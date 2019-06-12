import {Inject, Singleton} from 'typescript-ioc';
import {Author} from './Author';
import AuthorBuilder from './AuthorBuilder';

@Singleton
export default class AuthorService {

    private authors: Author[];

    constructor(@Inject private authorBuilder: AuthorBuilder) {

        this.authors = authorBuilder.list(10);
    }

    public getAuthors({name}: { name: string }): Author[] {

        return this.authors.filter((it) => it.name.match(name));
    }

    public getAuthor(id: string): Author {

        return this.authors.find((it) => it.id === id);
    }

    public createAuthor(setting: any): Author {

        const author = this.authorBuilder.min();
        author.name = setting.name;
        author.books = [];

        this.authors.push(author);

        return author;
    }

    public deleteAuthor(id: string): boolean {

        const size = this.authors.length;

        this.authors = this.authors.filter((it) => it.id !== id);

        return size > this.authors.length;
    }
}
