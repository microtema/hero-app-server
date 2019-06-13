import {Inject, Singleton} from 'typescript-ioc';
import {Author} from './Author';
import AuthorRepository from './AuthorRepository';

@Singleton
export default class AuthorService {

    constructor(@Inject private authorRepository: AuthorRepository) {
    }

    public getAuthors({name}: { name: string }): Promise<Author[]> {

        return this.authorRepository.findAll(name);
    }

    public getAuthor(id: string): Promise<Author> {

        return this.authorRepository.findByPk(id);
    }

    public createAuthor(author: Author): Promise<Author> {

        author.books = [];

        return this.authorRepository.save(author);
    }

    /**
     * Note: Since the ...repository.update does not return nothing,
     *       we need to return the updated entity
     * @param author may not be null
     */
    public updateAuthor(author: Author): Promise<Author> {

        return this.authorRepository.update(author)
            .then(() => this.getAuthor(author.id));
    }

    public deleteAuthor(id: string): Promise<boolean> {

        return this.authorRepository.delete(id);
    }
}
