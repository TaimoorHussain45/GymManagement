const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true,
    min: 1
  },
  reps: {
    type: String,
    required: true
  },
  weight: {
    type: String
  },
  duration: {
    type: Number // in minutes
  },
  restTime: {
    type: Number // in seconds
  },
  instructions: {
    type: String,
    required: true
  },
  targetMuscles: [{
    type: String
  }]
});

const workoutPlanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number,
    required: true // in weeks
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);