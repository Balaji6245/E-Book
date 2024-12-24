import express from 'express';
import { Controller } from '../book/controller';

let app = express.Router();

app.post('/', (req, res) => {
    Controller.createBook(req, res);
});

app.get('/:id', (req, res) => {
    Controller.getBook(req, res);
});

app.get('/', (req, res) => {
    Controller.getBooks(req, res);
});

app.put('/:id', (req, res) => {
    Controller.updateBook(req, res);
});

app.delete('/:id', (req, res) => {
    Controller.deleteBook(req, res);
});

export const BookRouter = app;