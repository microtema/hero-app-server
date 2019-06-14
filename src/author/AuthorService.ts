import {Inject, Singleton} from 'typescript-ioc';
import {Author} from './Author';
import AuthorRepository from './AuthorRepository';

@Singleton
export default class AuthorService {

    constructor(@Inject private repository: AuthorRepository) {
    }

    public getAuthors(sample: Author): Promise<Author[]> {

        return this.repository.findAll(sample.name);
    }

    public getAuthor(id: number): Promise<Author> {

        return this.repository.findByPk(id);
    }

    public createAuthor(author: Author): Promise<Author> {

        author.books = [];

        return this.repository.save(author);
    }

    /**
     * Note: Since the ...repository.update does not return nothing,
     *       we need to return the updated entity
     * @param author may not be null
     */
    public updateAuthor(author: Author): Promise<Author> {

        return this.repository.update(author)
            .then(() => this.getAuthor(author.id));
    }

    public deleteAuthor(id: number): Promise<boolean> {

        return this.repository.delete(id);
    }
}
