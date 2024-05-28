const userService = require('../services/user');

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.email, req.body.password, req.body.type, req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city);
    res.json(newUser);
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

    if (!req.body.email) {  res.status(400).json({  message: "Email is required", }); }
    if (!req.body.password) {  res.status(400).json({  message: "Password is required", }); }
    if (!req.body.type) {  res.status(400).json({  message: "Type is required", }); }
    if (!req.body.firstName) {  res.status(400).json({  message: "First name is required", }); }
    if (!req.body.lastName) {  res.status(400).json({  message: "Last name is required", }); }
    if (!req.body.streetAddress) {  res.status(400).json({  message: "Street address is required", }); }
    if (!req.body.city) {  res.status(400).json({  message: "City is required", }); }
    
    const user = await userService.updateUser(req.params.id, req.body.email, req.body.password, req.body.type, req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city);
    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }
  
    res.json(user);
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