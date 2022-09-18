const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

//** For field that prefix date the value is epoch time millis, timestamp is not included */
const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: pointSchema,
      index: '2dsphere',
    },
    documents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'document',
      },
    ],
    personal_data: {
      amount_of_kids: {
        type: Number,
        default: 0,
      },
      marital_status: {
        type: String,
        enum: ['married', 'divorced', 'not_married'],
      },
      personal_income: {
        type: Number,
        default: 0,
      },
      profession: {
        type: String,
        default: '',
      },
    },
    done_survey_date: {
      type: Number,
    },
    assessment: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('customer', customerSchema);
