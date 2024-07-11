const Dataset = require("../models/Dataset");
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

    // Get the top 3 messages about this dataset
    const dataset = await Dataset.findById(req.params.datasetId);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSampleQuestions = async (req, res) => {
  try {
    const { fileName, datasetId } = req.body;
    const dataset = await Dataset.findById(datasetId);

    if (!dataset) return res.status(404).json({ message: "Dataset not found" });
    else if (dataset.sampleQuestions?.length > 0)
      return res.status(200).json(dataset.sampleQuestions);

    const response = await axios.post(
      `http://localhost:8080/sample-questions/`,
      {
        file_name: fileName,
      }
    );

    if (response.data) {
      if(response.data?.questions?.length === 4){
        dataset.sampleQuestions = response.data?.questions;
        await dataset.save();
      }
      res.status(200).json(response.data);
    }
    else res.status(400).json({ message: "Failed to get sample questions" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
