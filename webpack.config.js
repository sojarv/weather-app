import { resolve } from 'path';

export const entry = './js/index.js';
export const output = {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
};