const Message = require("../models/Message");
const axios = require("axios");

exports.sendMessage = async (req, res) => {
  try {
    const { userMessage, fileName, datasetId } = req.body;
    const userId = req.user.authId;

    const response = await axios.post("http://localhost:8080/chat/", {
      file_name: fileName,
      question: userMessage,
    });

    if (response.data) {
      const message = new Message({
        userId,
        userMessage,
        botMessage: response.data.answer,
        datasetId,
      });

      await message.save();
      res.status(201).json(message);
    } else res.status(400).json({ message: "Failed to send message" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      userId: req.user.authId,
      datasetId: req.params.datasetId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
