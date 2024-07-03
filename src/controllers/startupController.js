const Startup = require('../models/Startup');

// Create a new startup
const createStartup = async (req, res) => {
  try {
    const { name, description, category, founder, website, contactEmail, establishedDate, location, marketValue, stage } = req.body;
    const newStartup = new Startup({ name, description, category, founder, website, contactEmail, establishedDate, location, marketValue, stage });
    await newStartup.save();
    res.status(201).json(newStartup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all startups
const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.status(200).json(startups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a startup by ID
const getStartupById = async (req, res) => {
  try {
    const { id } = req.params;
    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.status(200).json(startup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a startup by ID
const updateStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStartup = await Startup.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStartup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.status(200).json(updatedStartup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a startup by ID
const deleteStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStartup = await Startup.findByIdAndDelete(id);
    if (!deletedStartup) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.status(200).json({ message: 'Startup deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
};
