const { join } = require('path');
const express = require('express');
const fs = require('fs');

const books = JSON.parse(
  fs.readFileSync(join(__dirname, 'books.json'), {
    encoding: 'utf-8'
  })
);

const app = express();
app.use(express.static(join(__dirname, 'dist')));

app.get('/api/books', (req, res) => {
  res.send(
    books.map(({ id, title }) => ({
      id,
      title
    }))
  );
});

app.get('/api/book/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(item => item.id === id);
  book ? res.send(book) : res.sendStatus(404);
});

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('port 3000'));
