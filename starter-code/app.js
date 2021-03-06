const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const ejs = require('ejs')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index')
});

app.get('/random', (req, res, next) => {
  let data = {
    test: 'woo'
  }

  client.getRandomJoke().then((response) => {
    data['joke'] = response.value
    res.render('random', data)
  }).catch((error) => {
    throw error
  })
});

app.get('/categories', (req, res, next) => {
  let data = {
    test: 'woo'
  }

  client.getJokeCategories().then((response) => {
    data['categories'] = response
    console.log('***** DATA *****', data)
    res.render('categories', data)
  }).catch((error) => {
    throw error
  })
});

app.get('/category', (req, res, next) => {
  let data = {
    test: 'woo',
    cat: req.query.cat
  }

  client.getRandomJoke(data.cat).then((response) => {
    data['joke'] = response.value
    res.render('joke-by-category', data)
  }).catch((error) => {
    throw error
  })
});

app.get('/search', (req, res, next) => {
  res.render('search-form')  
});

app.post('/search', (req, res, next) => {
  let data = req.body.searched
  console.log('***** SEARCH *****  ', data)
  client.search(data).then((response) => {
    console.log('**** JOKE SEARCH ***** ', response)
    res.render('search-result', response)
  }).catch((error) => {
    throw error
  })
})
app.listen(3000);