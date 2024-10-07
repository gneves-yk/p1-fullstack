const chatRoomRepository = require('../repositories/chatRoomRepository');

class ChatController {
    async createRoom(req, res) {
        const { name, description, capacity } = req.body;

        try {
            const room = await chatRoomRepository.createRoom(name, description, capacity);
            res.status(201).json(room);
        } catch (error) {
            console.error('Error creating chat room:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getChatRooms(req, res) {
        try {
            const rooms = await chatRoomRepository.getAllRooms();
            res.json(rooms);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

   
    async getChatRoomById(req, res) {
      const { roomId } = req.params;
      console.log(roomId); 
  
      try {
          const room = await chatRoomRepository.findRoomById(roomId);
          if (!room) {
              console.error("Room not found for ID:", roomId); 
              return res.status(404).json({ message: 'Room not found' });
          }
          console.log("Room found:", room);
          res.json(room);
      } catch (error) {
          console.error('Error fetching chat room:', error); 
          res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  
  
}

module.exports = new ChatController();
