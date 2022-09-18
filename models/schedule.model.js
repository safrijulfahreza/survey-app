const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: Number,
      required: true,
    },
    customer_ids: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'customer',
      },
    ],
    customer_ids_done: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'customer',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('schedule', scheduleSchema);
