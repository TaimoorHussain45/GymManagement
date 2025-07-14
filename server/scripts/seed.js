const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Class = require('../models/Class');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym-management');
    
    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@gymflow.com',
      password: adminPassword,
      role: 'admin',
      phone: '555-0001',
      permissions: ['all']
    });
    await admin.save();
    
    // Create trainer users
    const trainerPassword = await bcrypt.hash('trainer123', 10);
    const trainers = [
      {
        name: 'John Smith',
        email: 'john@gymflow.com',
        password: trainerPassword,
        role: 'trainer',
        phone: '555-0002',
        specialization: ['Weight Training', 'Cardio'],
        experience: 5,
        rating: 4.8,
        bio: 'Certified personal trainer with 5 years of experience',
        certifications: ['NASM', 'ACE']
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@gymflow.com',
        password: trainerPassword,
        role: 'trainer',
        phone: '555-0003',
        specialization: ['Yoga', 'Pilates'],
        experience: 7,
        rating: 4.9,
        bio: 'Yoga instructor specializing in mindful movement',
        certifications: ['RYT-500', 'PMA']
      }
    ];
    
    const savedTrainers = await User.insertMany(trainers);
    
    // Create member users
    const memberPassword = await bcrypt.hash('member123', 10);
    const members = [
      {
        name: 'Mike Chen',
        email: 'mike@example.com',
        password: memberPassword,
        role: 'member',
        phone: '555-0004',
        membershipType: 'premium',
        membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        emergencyContact: '555-0005',
        address: '123 Main St, City, State',
        age: 28,
        goals: ['Weight Loss', 'Muscle Gain'],
        trainerId: savedTrainers[0]._id
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        password: memberPassword,
        role: 'member',
        phone: '555-0006',
        membershipType: 'basic',
        membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        emergencyContact: '555-0007',
        address: '456 Oak Ave, City, State',
        age: 25,
        goals: ['Flexibility', 'Stress Relief'],
        trainerId: savedTrainers[1]._id
      }
    ];
    
    await User.insertMany(members);
    
    // Create sample classes
    const classes = [
      {
        name: 'Morning Yoga',
        instructor: savedTrainers[1].name,
        instructorId: savedTrainers[1]._id,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: '07:00',
        duration: 60,
        capacity: 20,
        enrolled: [],
        description: 'Start your day with energizing yoga flow',
        difficulty: 'beginner',
        type: 'yoga',
        price: 25
      },
      {
        name: 'HIIT Training',
        instructor: savedTrainers[0].name,
        instructorId: savedTrainers[0]._id,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        time: '18:00',
        duration: 45,
        capacity: 15,
        enrolled: [],
        description: 'High-intensity interval training for maximum results',
        difficulty: 'intermediate',
        type: 'cardio',
        price: 30
      }
    ];
    
    await Class.insertMany(classes);
    
    console.log('Seed data created successfully!');
    console.log('Admin: admin@gymflow.com / admin123');
    console.log('Trainer: john@gymflow.com / trainer123');
    console.log('Member: mike@example.com / member123');
    
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();