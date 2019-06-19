import {Address, AddressService} from '../../../src/address';
import sut from '../../../src/address/Address.resolver';
import AddressBuilder from './Address.builder';

describe('Address resolver', () => {

    const builder = new AddressBuilder();

    const addressService = {
        createAddress: jest.fn((it) => it) as any,
        deleteAddress: jest.fn((it) => it) as any,
        getAddress: jest.fn((it) => it) as any,
        getAddresses: jest.fn((it) => it) as any,
        updateAddress: jest.fn((it) => it) as any,
    } as AddressService;

    const context = {addressService};

    let address: Address;

    beforeEach(() => address = builder.min());

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('resolvers.Query.address', () => {

        const actual = sut.Query.address(null, address, context);

        expect(actual).toBeDefined();

        expect(addressService.getAddress).toBeCalledWith(address.id);
    });

    it('resolvers.Query.addresses', () => {

        const actual = sut.Query.addresses(null, address, context);

        expect(actual).toBeDefined();

        expect(addressService.getAddresses).toBeCalledWith(address);
    });

    it('resolvers.Mutation.createAddress', () => {

        const actual = sut.Mutation.createAddress(null, address, context);

        expect(actual).toBeDefined();

        expect(addressService.createAddress).toBeCalledWith(address);
    });

    it('resolvers.Mutation.updateAddress', () => {

        const actual = sut.Mutation.updateAddress(null, address, context);

        expect(actual).toBeDefined();

        expect(addressService.updateAddress).toBeCalledWith(address);
    });

    it('resolvers.Mutation.deleteAddress', () => {

        const actual = sut.Mutation.deleteAddress(null, address, context);

        expect(actual).toBeDefined();

        expect(addressService.deleteAddress).toBeCalledWith(address.id);
    });
});
