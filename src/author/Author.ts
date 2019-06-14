import {Book} from '../book/Book';
import {Entity} from '../repository/Entity';

export interface Author extends Entity {
    name: string;
    books: Book[];
}
