const articleService = require('../services/article');
const userService = require('../services/user');

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.email, req.body.password, req.body.type, req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city);
    res.json(newUser);
};

const getUsers = async (req, res) => {
    const articles = await userService.getUsers();
    res.json(articles);
};

const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }

    res.json(user);
};

const updateArticle = async (req, res) => {
    if (!req.body.title) {
      res.status(400).json({
        message: "title is required",
      });
    }
  
    const article = await articleService.updateArticle(req.params.id, req.body.title);
    if (!article) {
      return res.status(404).json({ errors: ['Article not found'] });
    }
  
    res.json(article);
  };

  const deleteArticle = async (req, res) => {
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ errors: ['Article not found'] });
    }
  
    res.send();
  };

  module.exports = {
    createUser,
    getUsers,
    getUser,
    updateArticle,
    deleteArticle
  };