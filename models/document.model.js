const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    type_of_document: {
      type: String,
      enum: ['ktp', 'npwp', 'land_certificate', 'electricity_bills', 'water_bills', 'photo_of_building'],
    },
    file_name: {
      type: String,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'customer',
    },
    is_for_report: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('document', documentSchema);
