import {Book} from '../book/Book';

export interface Author {
    id: string;
    name: string;
    books: Book[];
}
