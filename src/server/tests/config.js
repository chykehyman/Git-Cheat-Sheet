import supertest from 'supertest';
import app from '../server';

export { STATUS_CODES } from 'http';
export { expect } from 'chai';

export const request = supertest(app);
export const wrongToken = 'ThisIsAWrongToken';
