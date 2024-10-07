const User = require('../model/User');

class UserRepository {
  async createUser(username, password) {
    const user = new User({ username, password });
    return await user.save();
  }

  async findUserByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = new UserRepository();
