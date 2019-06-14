import {Author} from '../author/Author';
import {Entity} from '../repository/Entity';

export interface Book extends Entity {
    title: string;
    author: Author;
}
