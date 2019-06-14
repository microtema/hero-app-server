import CrudRepository from '../../../src/repository/CrudRepository';

const FakeCrudRepository = {
    delete: jest.fn(() => Promise.resolve({})) as any,
    findAll: jest.fn(() => Promise.resolve({})) as any,
    findByPk: jest.fn(() => Promise.resolve({})) as any,
    save: jest.fn(() => Promise.resolve({})) as any,
    update: jest.fn(() => Promise.resolve({})) as any,
} as CrudRepository<any, any>;

export default FakeCrudRepository;
