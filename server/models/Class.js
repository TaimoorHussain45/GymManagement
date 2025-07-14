const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: String,
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  type: {
    type: String,
    enum: ['cardio', 'strength', 'yoga', 'pilates', 'crossfit', 'boxing', 'swimming'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
classSchema.index({ date: 1, time: 1 });
classSchema.index({ instructorId: 1 });
classSchema.index({ type: 1 });

module.exports = mongoose.model('Class', classSchema);