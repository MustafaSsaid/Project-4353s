// jest.config.cjs
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
    },
    testTimeout: 30000,  // Add this
    verbose: true,       // Add this
    testMatch: ['**/*.test.js'],  // Add this
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
};