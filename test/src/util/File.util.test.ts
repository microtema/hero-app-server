import * as sut from './../../../src/util/File.util';

describe('File Util', () => {

    it('It should be defined', () => {

        expect(sut).toBeDefined();
    });

    it('readPaths', () => {

        expect(sut.readPaths('.util.ts')).toEqual(['../util/File.util']);
    });

    it('readPaths without filter', () => {

        expect(sut.readPaths()).toBeDefined();
    });

    it('readPaths with prefix', () => {

        expect(sut.readPaths('.util.ts', '$')).toEqual(['$/util/File.util']);
    });

    it('loadModules', () => {

        expect(sut.loadModules('Author.schema.ts')).toMatchSnapshot();
    });
});
