import {Author} from '../author/Author';
import {Entity} from '../repository/Entity';

export interface Book extends Entity<number> {
    title: string;
    author: Author;
}
