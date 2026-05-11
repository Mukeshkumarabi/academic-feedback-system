import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { item, rating, message } = req.body;

    const feedback = await Feedback.create({
      userId: req.user.id,
      item,
      rating,
      message
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.id });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const now = new Date();
    const createdTime = new Date(feedback.createdAt);
    const diffInMinutes = (now - createdTime) / (1000 * 60);

    if (diffInMinutes > 15) {
      return res.status(400).json({
        message: "Edit time expired (15 minutes passed)"
      });
    }

    feedback.message = req.body.message;
    feedback.updatedAt = new Date();

    await feedback.save();

    res.json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await feedback.deleteOne();

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};