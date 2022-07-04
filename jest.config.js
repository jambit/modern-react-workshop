module.exports = {
    testEnvironment: 'jsdom',
    roots: [
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts',
    ],
};
