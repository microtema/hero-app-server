import {Book} from '../book/Book';
import {Entity} from '../repository/Entity';

export interface Author extends Entity<number> {
    name: string;
    books: Book[];
}
