import readdirSync from 'recursive-readdir-synchronous';

const cleanupModelPath = (it) => it.substring(it.indexOf('/src') + 4).replace('.ts', '');

/**
 *
 * @param filter may be null of undefined
 */
const loadModules = (filter?: any): any[] => {

    return readPaths(filter)
        .map((it) => require(it))
        .map((it) => it.default);
};

/**
 *
 * @param filter may be null or not defined
 * @param prefix may be null or not defined
 */
const readPaths = (filter?: any, prefix?: string): string[] => {

    return readdirSync('./src')
        .filter((it) => it.match(filter || ''))
        .map(cleanupModelPath)
        .map((it) => (prefix || '..') + it);
};

export {loadModules, readPaths};
