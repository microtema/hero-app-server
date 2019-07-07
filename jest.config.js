module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.ts",
        "!**/server.ts",
        "!**/app.ts",
        "!**/App.properties.ts",
        "!**/apollo.server.ts",
        "!**/CrudRepository.ts",
        "!**/index.ts",
        "!**/node_modules/**",
        "!**/test/**"
    ],
    transform: {
        "\\.(ts|tsx)$": "ts-jest"
    },
    coverageThreshold: {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    }
};
