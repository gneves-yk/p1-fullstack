const ChatRoom = require('../model/ChatRoom'); 
const { v4: uuidv4 } = require('uuid'); 

class ChatRoomRepository {
    async createRoom(name, description, capacity) {
        const room = new ChatRoom({
            id: uuidv4(), 
            name,
            description,
            capacity,
            isActive: true, 
            createdAt: new Date(),
        });

        await room.save();
        return room;
    }

    async findRoomById(roomId) {
        try {
            return await ChatRoom.findById(roomId); 
        } catch (error) {
            console.error('Error finding room by ID:', error);
            throw error; 
        }
    }
    
    async getAllRooms() {
        return ChatRoom.find(); 
    }
}

module.exports = new ChatRoomRepository();
