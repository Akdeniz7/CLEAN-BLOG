const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Blog = require('./models/BlogDetails');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add_post');
});
app.post('/blog', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
