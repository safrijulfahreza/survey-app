const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    template: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('template', templateSchema);
