import {AddressService} from '../../../src/address';
import {default as addressRepository} from '../repository/MockCrudRepository';
import AddressBuilder from './Address.builder';

describe('AddressService', () => {

    const sut = new AddressService(addressRepository);
    const builder = new AddressBuilder();

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('getAddresses filter by name', () => {

        // given
        const address = builder.min();

        // when
        const promise = sut.getAddresses(address);

        // then
        expect(promise).toBeDefined();
        expect(addressRepository.findAll).toBeCalledWith(address.street);
    });

    it('getAddress by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.getAddress(id);

        // then
        expect(promise).toBeDefined();
        expect(addressRepository.findByPk).toBeCalledWith(id);
    });

    it('deleteAddress by id', () => {

        // given
        const {id} = builder.min();

        // when
        const promise = sut.deleteAddress(id);

        // then
        expect(promise).toBeDefined();
        expect(addressRepository.delete).toBeCalledWith(id);
    });

    it('createAddress', () => {

        // given
        const address = builder.min();

        // when
        const promise = sut.createAddress(address);

        // then
        expect(promise).toBeDefined();
        expect(addressRepository.save).toBeCalledWith(address);
    });

    it('updateAddress', () => {

        // given
        const address = builder.min();

        // when
        const promise = sut.updateAddress(address);

        // then
        expect(promise).toBeDefined();
        expect(addressRepository.update).toBeCalledWith(address);
    });
});
