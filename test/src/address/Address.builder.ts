import faker from 'faker';
import {ModelBuilder} from 'model-builder-ts';
import {Address} from '../../../src/address';

export default class AddressBuilder extends ModelBuilder<Address> {

    public min(): Address {

        return {
            city: faker.address.sity,
            country: faker.address.country,
            id: faker.random.uuid(),
            street: faker.address.streetName,
            zip: faker.address.zip,
        } as Address;
    }
}
