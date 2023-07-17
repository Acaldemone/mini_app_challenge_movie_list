const express = require('express')
const knex = require('knex')(require('./knexfile.js')["development"])
const app = express()
const port = 8080
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('api is running')
})

app.get('/movies', (req, res) => {
    knex('movies')
        .select()
        .then((movies) => {
            res.json(movies);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to retrieve movies' });
          });
})

app.post('/movies', (req, res) => {
    const movieData = req.body;
    if (movieData && movieData.title) {
        knex('movies')
        .insert(movieData)
        .then(() => {
            res.status(200).json({ message: 'Movie created successfully', movie: movieData });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create movie' });
          });
    } else {
        res.status(400).json({ error: 'Invalid movie data' });
    }
})

app.patch('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    knex('movies')
    .where('id', movieId)
    .update(req.body)
    .then(() => {
        res.send(`Updating movie with ID ${movieId}`);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to update movie' });
    });
});

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    knex('movies')
    .where('id', movieId)
    .del()
    .then(() => {
      res.send(`Movie with ID ${movieId} deleted successfully`);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete movie' });
    });
});
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
