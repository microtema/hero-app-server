import {Author} from './Author';
import AuthorService from './Author.service';

export default {
    Query: {
        author(parent: any, author: Author, {authorService}: { authorService: AuthorService }) {

            return authorService.getAuthor(author.id);
        },
        authors(parent, author: Author, {authorService}: { authorService: AuthorService }) {

            return authorService.getAuthors(author);
        },
    },

    Mutation: {
        createAuthor(parent: any, author: Author, {authorService}: { authorService: AuthorService }) {

            return authorService.createAuthor(author);
        },

        updateAuthor(parent: any, author: Author, {authorService}: { authorService: AuthorService }) {

            return authorService.updateAuthor(author);
        },

        deleteAuthor(parent: any, author: Author, {authorService}: { authorService: AuthorService }) {

            return authorService.deleteAuthor(author.id);
        },
    },
};
