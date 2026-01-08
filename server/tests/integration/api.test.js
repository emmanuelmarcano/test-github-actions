const request = require('supertest');
const app = require('../../src/app');
const path = require('path');
// Cargamos las variables de entorno para el test (usando .env.test por defecto si existe, o .env)
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('Integration Test: API Endpoints', () => {
    
    // Validación de configuración antes de empezar
    test('Environment config should be valid', () => {
        if (!process.env.PORT) {
            throw new Error('Test Failure: PORT env var is missing (check .env.test)');
        }
    });

    test('GET /api/hello returns correct JSON', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello from Express Backend!' });
    });

    test('GET / returns index.html', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
    });
});
