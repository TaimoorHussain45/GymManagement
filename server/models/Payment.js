const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['membership', 'class', 'personal_training', 'supplement'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true
  },
  transactionId: {
    type: String
  },
  stripePaymentIntentId: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'bank_transfer'],
    default: 'card'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);