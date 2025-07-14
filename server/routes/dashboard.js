const express = require('express');
const User = require('../models/User');
const Class = require('../models/Class');
const Payment = require('../models/Payment');
const WorkoutPlan = require('../models/WorkoutPlan');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Admin dashboard stats
router.get('/admin-stats', [auth, checkRole(['admin'])], async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalClasses,
      activeMembers,
      todayClasses,
      monthlyRevenue,
      pendingPayments
    ] = await Promise.all([
      User.countDocuments({ role: 'member', isActive: true }),
      User.countDocuments({ role: 'trainer', isActive: true }),
      Class.countDocuments({ isActive: true }),
      User.countDocuments({ 
        role: 'member', 
        isActive: true,
        membershipExpiry: { $gt: new Date() }
      }),
      Class.countDocuments({
        date: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999)
        }
      }),
      Payment.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Payment.countDocuments({ status: 'pending' })
    ]);

    res.json({
      totalMembers,
      totalTrainers,
      totalClasses,
      activeMembers,
      todayAttendance: todayClasses,
      totalRevenue: monthlyRevenue[0]?.total || 0,
      upcomingClasses: todayClasses,
      pendingPayments
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Trainer dashboard stats
router.get('/trainer-stats', [auth, checkRole(['trainer'])], async (req, res) => {
  try {
    const [
      assignedMembers,
      todayClasses,
      activeWorkouts,
      totalSessions
    ] = await Promise.all([
      User.countDocuments({ trainerId: req.userId, isActive: true }),
      Class.countDocuments({
        instructorId: req.userId,
        date: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999)
        }
      }),
      WorkoutPlan.countDocuments({ trainerId: req.userId, isActive: true }),
      Class.countDocuments({ instructorId: req.userId })
    ]);

    res.json({
      assignedMembers,
      todayClasses,
      activeWorkouts,
      sessionHours: totalSessions * 1.5 // Assuming average 1.5 hours per session
    });
  } catch (error) {
    console.error('Trainer stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Member dashboard stats
router.get('/member-stats', [auth, checkRole(['member'])], async (req, res) => {
  try {
    const [
      classesBooked,
      workoutsCompleted,
      totalPayments,
      upcomingClasses
    ] = await Promise.all([
      Class.countDocuments({ enrolled: req.userId }),
      WorkoutPlan.countDocuments({ memberId: req.userId, isActive: true }),
      Payment.countDocuments({ memberId: req.userId, status: 'completed' }),
      Class.countDocuments({
        enrolled: req.userId,
        date: { $gte: new Date() }
      })
    ]);

    res.json({
      classesBooked,
      workoutsCompleted,
      goalsAchieved: Math.floor(workoutsCompleted / 5), // Simple calculation
      hoursTrained: classesBooked * 1.5,
      upcomingClasses
    });
  } catch (error) {
    console.error('Member stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;