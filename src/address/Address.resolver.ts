import {Address} from './Address';
import AddressService from './Address.service';

export default {
    Mutation: {

        createAddress(parent: any, address: Address, {addressService}: { addressService: AddressService }) {

            return addressService.createAddress(address);
        },

        updateAddress(parent: any, address: Address, {addressService}: { addressService: AddressService }) {

            return addressService.updateAddress(address);
        },

        deleteAddress(parent: any, address: Address, {addressService}: { addressService: AddressService }) {

            return addressService.deleteAddress(address.id);
        },
    },
    Query: {

        address(parent: any, address: Address, {addressService}: { addressService: AddressService }) {

            return addressService.getAddress(address.id);
        },
        addresses(parent, address: Address, {addressService}: { addressService: AddressService }) {

            return addressService.getAddresses(address);
        },
    },
};
