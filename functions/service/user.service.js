const userRepository = require('../repository/user.repository')

const create = (req, response) => {
  userRepository.create(req,response)
};

const list = async (req, response) => {
  return userRepository.list(req,response)
};

const getById = (req, response) => {
  userRepository.getById(req,response)
};

const deleteById = (req, response) => {
  userRepository.deleteById(req,response)
};

const populateList = () => {
  userRepository.populateList()
};

const getUserList = () => {
  return userRepository.userList
};


module.exports = {
  create,
  list,
  getById,
  deleteById,
  populateList,
  getUserList
};
