const Message = require('../model/message');

async function saveMessage(roomId, userId, content) {
    const message = new Message({
        roomId,
        userId,
        content,
        timestamp: new Date()
    });
    
    await message.save();
}

module.exports = {
    saveMessage
};
