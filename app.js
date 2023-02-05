const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Blog = require('./models/BlogDetails');
const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//ROUTES
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/blogs/edit/:id', pageController.getEditPage);
app.get('/', postController.getAllPosts);
app.get('/blogs/:id', postController.getPost);
app.post('/blog', postController.createPost);
app.delete('/blogs/:id', postController.deletePost);
app.put('/blogs/:id', postController.updatePost);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
