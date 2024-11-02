// jest.setup.js
const { TextEncoder, TextDecoder } = require('util');
const next = require('next');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add these configurations
jest.setTimeout(30000);

// Suppress Next.js console output during tests
console.log = jest.fn();
console.info = jest.fn();
console.warn = jest.fn();

// Mock Next.js router
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        pathname: '',
        route: '',
        asPath: '',
        query: '',
    }),
}));

// Setup process.env for tests
process.env.NODE_ENV = 'test';