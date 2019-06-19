import {Author} from '../author';
import {Entity} from '../repository/Entity';

export interface Address extends Entity<number> {
    street: string;
    zip: string;
    city: string;
    country: string;
    author: Author;
}
