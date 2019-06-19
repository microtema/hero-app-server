import {Inject, Singleton} from 'typescript-ioc';
import {Address} from './Address';
import AddressRepository from './Address.repository';

@Singleton
export default class AddressService {

    constructor(@Inject private repository: AddressRepository) {
    }

    public getAddresses(sample: Address) {

        return this.repository.findAll(sample.street);
    }

    public getAddress(id: number) {

        return this.repository.findByPk(id);
    }

    public createAddress(address: Address) {

        return this.repository.save(address);
    }

    public updateAddress(address: Address) {

        return this.repository.update(address)
            .then(() => this.getAddress(address.id));
    }

    public deleteAddress(id: number) {

        return this.repository.delete(id);
    }
}
