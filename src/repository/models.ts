import readdirSync from 'recursive-readdir-synchronous';
import Model, {Sequelize} from 'sequelize';

const {DATABASE, DATABASE_USER, DATABASE_PWD} = process.env;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PWD,
    {
        dialect: 'postgres',
    },
);

console.log('Connected to database successfully');

const filterModel = (it) => it.match('.orm.ts');
const cleanupModelPath = (it) => '..' + it.substring(it.indexOf('/src') + 4).replace('.ts', '');
const importModel = (it) => sequelize.import(it);
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Note: Autowired models
const models = readdirSync('./src')
    .filter(filterModel)
    .map(cleanupModelPath)
    .map(importModel)
    .reduce((map, it) => {
        const key = capitalizeFirstLetter(it.name + 'Model');
        map[key] = it;
        return map;
    }, {});

const associate = (modelName) => {
    models[modelName].associate(models);
};

Object.keys(models).forEach(associate);

export {sequelize};

export default models;
