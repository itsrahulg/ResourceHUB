const mongoose = require("mongoose");

const GlobalMetricsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("GlobalMetrics", GlobalMetricsSchema);
