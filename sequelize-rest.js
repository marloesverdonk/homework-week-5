const express = require('express')
const Sequelize = require('sequelize')
const { Router } = require('express')
const movieRouter = new Router()
const databaseUrl =
  process.env.DATABASE_URL ||
  'postgres://postgres:vie@localhost:5432/postgres'

const db = new Sequelize(databaseUrl)

const Movie = db.define(
  'movie',
  {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING,
  }
)

db
  .sync()
  .then(() => console.log('data schema has been updated'))
  .catch(console.error)

const app = express()
app.use(movieRouter)

movieRouter.post('/movie', (request, response, next) => {
  Movie.create(request.body)
    .then((newlyCreatedMovie) => response.send(newlyCreatedMovie))
    .catch(next)
})

movieRouter.get(
  '/movie',
  (request, response, next) => {
    Movie.findAll()
      .then((arrayOfMovies) => response.send(arrayOfMovies))
      .catch(next)
  }
)

movieRouter.get(
  '/movie/:id',
  (request, response, next) => {
    Movie.findByPk(request.params.id)
      .then((movie) => response.send(movie))
      .catch(next)
  }
)

movieRouter.put(
  '/movie/:id',
  (request, response, next) => {
    Movie.findByPk(request.params.id)
    .then(movie => movie.update(request.body))
    .then(response.send)
    .catch(next)
  }
)

movieRouter.delete(
  '/movie/:id',
  (request, response, next) => {
    Movie.destroy({ where: {id: request.params.id}})
    .then(deletedMovie => response.send(deletedMovie))
    .catch(next)
  }
)
