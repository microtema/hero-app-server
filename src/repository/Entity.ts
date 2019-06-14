import {BuildOptions, Model} from 'sequelize';

export interface Entity<ID> extends Model {
    id: ID;
}

// Need to declare the static model so `findOne` etc. use correct types.
export type EntityStatic<ID> = typeof Model & (new (values?: object, options?: BuildOptions) => Entity<ID>);
