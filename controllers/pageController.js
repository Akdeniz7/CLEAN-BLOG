const Blog = require('../models/BlogDetails')

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.render('edit', {
    blog,
  });
};
