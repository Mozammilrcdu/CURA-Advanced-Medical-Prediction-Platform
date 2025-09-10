const express = require("express");
const router = express.Router();
const axios = require("axios");

const FLASK_URL = process.env.FLASK_URL || "http://127.0.0.1:8000";

// JSON-based predictions only
router.post("/:disease", async (req, res) => {
  try {
    const response = await axios.post(
      `${FLASK_URL}/predict/${req.params.disease}`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
