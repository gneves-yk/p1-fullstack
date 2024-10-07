const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const Message = require('../model/Message');

router.post('/chat-rooms', authMiddleware, chatController.createRoom);

router.get('/chat-rooms', authMiddleware, chatController.getChatRooms);

router.get('/chat-rooms/:roomId', authMiddleware, chatController.getChatRoomById);

router.get('/chat-rooms/:roomId/messages', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
        res.json(messages); 
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

module.exports = router;
