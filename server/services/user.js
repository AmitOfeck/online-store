const Article = require('../models/article');
const User = require('../models/user');

const createUser = async (email, password, type, firstName, lastName, streetAddress, city) => {
    const user = new User({
        email : email,
        password : password,
        type : type,
        firstName : firstName,
        lastName : lastName,
        streetAddress : streetAddress,
        city : city,
    });

    return await user.save();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUsers = async () => {
    return await User.find({});
};

const updateArticle = async (id, title) => {
    const article = await getArticleById(id);
    if (!article)
        return null;

    article.title = title;
    await article.save();
    return article;
};

const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article)
        return null;

    await article.remove();
    return article;
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateArticle,
    deleteArticle
}