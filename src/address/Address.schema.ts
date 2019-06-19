import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        address(id: ID): Address
        addresses(street: String): [Address]
    }

    extend type Mutation {
        createAddress(street: String,zip: String, city: String,country: String, authorId:ID): Address
        updateAddress(id: ID,name: String): Address
        deleteAddress(id: ID): Boolean
    }

    type Address {
        id: ID
        street: String
        zip: String
        city: String
        country: String
        author: Author
    }
`;
