const articleService = require('../services/article');

const createArticle = async (req, res) => {
    const newArticle = await articleService.createArticle(req.body.title);
    res.json(newArticle);
};

const getArticles = async (req, res) => {
    const articles = await articleService.getArticles();
    res.json(articles);
};

const getArticle = async (req, res) => {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ errors: ['Article not found'] });
    }

    res.json(article);
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
    createArticle,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle
  };