const userService = require('../services/user');

const isValid = (req, res, fields) => {
  for (let field of fields) {
    if (!req.body[field]) {
      res.status(400).json({ message: `${field} is required` });
      return false;
    }
  }
  return true;
};

const createUser = async (req, res) => {
  try {
    const requiredFields = ['email', 'password', 'type', 'firstName', 'lastName', 'streetAddress', 'city'];

    if (!isValid(req, res, requiredFields)) return;

    const newUser = await userService.createUser(
      req.body.email,
      req.body.password,
      req.body.type,
      req.body.firstName,
      req.body.lastName,
      req.body.streetAddress,
      req.body.city
    );

    res.json(newUser);
  } catch (error) {
    //console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }

    res.json(user);
  } catch (error) {
    //console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const requiredFields = ['email', 'password', 'type', 'firstName', 'lastName', 'streetAddress', 'city'];

    if (!isValid(req, res, requiredFields)) return;

    const user = await userService.updateUser(
      req.params.id,
      req.body.email,
      req.body.password,
      req.body.type,
      req.body.firstName,
      req.body.lastName,
      req.body.streetAddress,
      req.body.city
    );

    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }

    res.json(user);
  } catch (error) {
    //console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  const deleteUser = async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      
      if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
      }
      
      res.send();
    } catch (error) {
      //console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
  };