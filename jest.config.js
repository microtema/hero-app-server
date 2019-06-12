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
