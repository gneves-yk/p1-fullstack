const ChatRoom = require('../model/ChatRoom');

class ChatRepository {
  async createChatRoom(roomName, participants) {
    const chatRoom = new ChatRoom({ roomName, participants });
    return await chatRoom.save();
  }

  async findChatRooms() {
    return await ChatRoom.find().populate('participants');
  }
}

module.exports = new ChatRepository();

