import {Book} from './Book';
import BookService from './BookService';

export default {
    Query: {
        book(parent: any, book: Book, {bookService}: { bookService: BookService }) {

            return bookService.getBook(book.id);
        },
        books(parent: any, book: Book, {bookService}: { bookService: BookService }) {

            return bookService.getBooks(book);
        },
    },

    Mutation: {

        createBook(parent: any, book: Book, {bookService}: { bookService: BookService }) {

            return bookService.createBook(book);
        },

        updateBook(parent: any, book: Book, {bookService}: { bookService: BookService }) {

            return bookService.updateBook(book);
        },

        deleteBook(parent: any, book: Book, {bookService}: { bookService: BookService }) {

            return bookService.deleteBook(book.id);
        },
    },
};
