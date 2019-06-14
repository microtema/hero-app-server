import {merge} from 'lodash';
import {loadModules} from '../util/File.util';

export default loadModules('.resolver.ts').reduce((map, it) => merge(map, it), {});
