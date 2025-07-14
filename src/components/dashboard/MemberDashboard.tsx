import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Dumbbell,
  Target,
  Clock,
  TrendingUp,
  Award,
  Activity,
  ChefHat,
  Heart,
  Zap,
  Trophy,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import StatCard from '../common/StatCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { dashboardAPI } from '../../api/dashboard';
import toast from 'react-hot-toast';

const MemberDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock data for member dashboard
        const mockStats = {
          classesBooked: 24,
          workoutsCompleted: 45,
          goalsAchieved: 7,
          hoursTrained: 68,
          caloriesBurned: 12450,
          currentStreak: 12,
          upcomingClasses: 3,
          membershipDays: 89
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch member stats:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back, Mike! 🏃‍♂️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Keep pushing towards your fitness goals - you're doing great!
        </p>
      </motion.div>

      {/* Member Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Classes Booked"
          value={stats.classesBooked}
          icon={Calendar}
          trend={{ value: 20, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Workouts Completed"
          value={stats.workoutsCompleted}
          icon={Dumbbell}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Goals Achieved"
          value={stats.goalsAchieved}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Hours Trained"
          value={stats.hoursTrained}
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          color="yellow"
        />
      </div>

      {/* Additional Member Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Calories Burned"
          value={stats.caloriesBurned.toLocaleString()}
          icon={Zap}
          color="red"
        />
        <StatCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          icon={Trophy}
          color="green"
        />
        <StatCard
          title="Upcoming Classes"
          value={stats.upcomingClasses}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Membership Days"
          value={stats.membershipDays}
          icon={Heart}
          color="purple"
        />
      </div>

      {/* Fitness Goals Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Fitness Goals Progress
        </h2>
        <div className="space-y-6">
          {[
            { goal: 'Weight Loss', current: 8, target: 10, unit: 'kg', progress: 80, color: 'bg-red-500' },
            { goal: 'Muscle Gain', current: 3, target: 5, unit: 'kg', progress: 60, color: 'bg-blue-500' },
            { goal: 'Cardio Endurance', current: 25, target: 30, unit: 'min', progress: 83, color: 'bg-green-500' },
            { goal: 'Strength Training', current: 40, target: 50, unit: 'kg', progress: 80, color: 'bg-purple-500' },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">{item.goal}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.current}/{item.target} {item.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.progress}% Complete
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Member Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => toast.success('Book Class feature coming soon!')}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Calendar className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Book Class</span>
          </button>
          <button 
            onClick={() => toast.success('Start Workout feature coming soon!')}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Dumbbell className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Start Workout</span>
          </button>
          <button 
            onClick={() => toast.success('Diet Plan feature coming soon!')}
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <ChefHat className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Diet Plan</span>
          </button>
          <button 
            onClick={() => toast.success('View Progress feature coming soon!')}
            className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">View Progress</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { activity: 'Completed HIIT Class', time: '2 hours ago', icon: Activity, calories: 450 },
              { activity: 'Reached Weight Goal', time: '1 day ago', icon: Target, achievement: true },
              { activity: 'Booked Yoga Session', time: '2 days ago', icon: Calendar, upcoming: true },
              { activity: 'Updated Diet Plan', time: '3 days ago', icon: ChefHat, plan: true },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center space-x-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.time}</span>
                      {item.calories && <span>• {item.calories} calories burned</span>}
                      {item.achievement && <span className="text-green-600">• Goal achieved!</span>}
                      {item.upcoming && <span className="text-blue-600">• Upcoming</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Achievements & Badges
          </h2>
          <div className="space-y-4">
            {[
              { title: 'First Workout', description: 'Completed your first workout session', earned: true, date: '2 months ago' },
              { title: '7-Day Streak', description: 'Worked out for 7 consecutive days', earned: true, date: '1 month ago' },
              { title: 'Weight Warrior', description: 'Lost 5kg in weight', earned: true, date: '2 weeks ago' },
              { title: 'Class Champion', description: 'Attended 20 group classes', earned: false, progress: '18/20' },
            ].map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.earned ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-900/20'}`}>
                <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-yellow-100 dark:bg-yellow-900/40' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <Award className={`h-4 w-4 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {achievement.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-gray-500">Earned {achievement.date}</p>
                  )}
                  {!achievement.earned && achievement.progress && (
                    <p className="text-xs text-blue-600">Progress: {achievement.progress}</p>
                  )}
                </div>
                {achievement.earned && (
                  <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
                    Earned
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          This Week's Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[
            { day: 'Mon', classes: ['HIIT 9AM', 'Yoga 6PM'] },
            { day: 'Tue', classes: ['Strength 10AM'] },
            { day: 'Wed', classes: ['Cardio 8AM', 'Pilates 7PM'] },
            { day: 'Thu', classes: ['Rest Day'] },
            { day: 'Fri', classes: ['CrossFit 9AM'] },
            { day: 'Sat', classes: ['Yoga 10AM', 'Swimming 2PM'] },
            { day: 'Sun', classes: ['Rest Day'] },
          ].map((schedule, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{schedule.day}</h3>
              <div className="space-y-1">
                {schedule.classes.map((cls, clsIndex) => (
                  <div key={clsIndex} className={`text-xs px-2 py-1 rounded ${
                    cls === 'Rest Day' 
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400' 
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  }`}>
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MemberDashboard;