import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Singleton} from 'typescript-ioc';
import {Address} from '../../../src/address';

@Singleton
export default class AddressBuilder extends ModelBuilder<Address> {

    public min(): Address {

        const model = {
            city: faker.address.sity,
            country: faker.address.country,
            id: faker.random.uuid(),
            street: faker.address.streetName,
            zip: faker.address.zip,
        } as Address;

        return model;
    }
}
