import readdirSync from 'recursive-readdir-synchronous';
import Model, {Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PWD,
    {
        dialect: 'postgres',
    },
);

const importModel = (it) => sequelize.import(it);
const filterModel = (it) => it.match('.orm.ts');
const cleanupModelPath = (it) => '..' + it.substring(it.indexOf('/src') + 4).replace('.ts', '');
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
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
};

Object.keys(models).forEach(associate);

console.log('Models', models);

export {sequelize};

export default models;
