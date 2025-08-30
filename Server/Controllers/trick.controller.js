const Trick = require("../Models/trick.model");
const { post, patch } = require("../Routes/message.route");

const trickController = {
  // Get all tricks
  getAll: async (req, res) => {
    try {
      const tricks = await Trick.findAll();
      res.status(200).json(tricks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tricks", error });
    }
  },
  delete: async (req, res) => {
    try {
      const trick = await Trick.findByPk(req.params.id);
      if (trick) {
        await trick.destroy();
        res.status(200).json({ message: "Trick deleted successfully" });
      } else {
        res.status(404).json({ message: "Trick not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting trick", error });
    }
  },
  post: async (req, res) => {
    try {
      const { title, description, photo } = req.body;
      if (!title || !description || !photo) {
        return res
          .status(400)
          .json({ message: "Title, description, and photo are required" });
      }
      const newTrick = await Trick.create(req.body);
      res.status(201).json(newTrick);
    } catch (error) {
      res.status(500).json({ message: "Error creating trick", error });
    }
  },
  patch: async (req, res) => {
    try {
      const trick = await Trick.findByPk(req.params.id);
      if (trick) {
        await trick.update(req.body);
        res.status(200).json(trick);
      } else {
        res.status(404).json({ message: "Trick not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating trick", error });
    }
  },
};

module.exports = trickController;
