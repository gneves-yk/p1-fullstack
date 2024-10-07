const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created' });
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await userRepository.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10s' });
    
    // Armazenar o token no localStorage 
    res.json({ token, userId: user._id }); 
}
}

module.exports = new AuthController();
