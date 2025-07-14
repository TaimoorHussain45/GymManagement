const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'member'],
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Member specific fields
  membershipType: {
    type: String,
    enum: ['basic', 'premium', 'vip'],
    required: function() { return this.role === 'member'; }
  },
  membershipExpiry: {
    type: Date,
    required: function() { return this.role === 'member'; }
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  emergencyContact: {
    type: String,
    required: function() { return this.role === 'member'; }
  },
  address: {
    type: String,
    required: function() { return this.role === 'member'; }
  },
  age: {
    type: Number,
    required: function() { return this.role === 'member'; }
  },
  goals: [{
    type: String
  }],
  // Trainer specific fields
  specialization: [{
    type: String,
    required: function() { return this.role === 'trainer'; }
  }],
  experience: {
    type: Number,
    required: function() { return this.role === 'trainer'; }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  bio: {
    type: String
  },
  certifications: [{
    type: String
  }],
  // Admin specific fields
  permissions: [{
    type: String
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide password in JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);