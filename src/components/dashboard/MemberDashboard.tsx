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
  ChefHat
} from 'lucide-react';
import StatCard from '../common/StatCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { dashboardAPI } from '../../api/dashboard';

const MemberDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getMemberStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch member stats:', error);
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your fitness journey and achieve your goals.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Classes Booked"
          value={stats?.classesBooked || 12}
          icon={Calendar}
          trend={{ value: 20, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Workouts Completed"
          value={stats?.workoutsCompleted || 28}
          icon={Dumbbell}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Goals Achieved"
          value={stats?.goalsAchieved || 5}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Hours Trained"
          value={stats?.hoursTrained || 45}
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          color="yellow"
        />
      </div>

      {/* Progress Overview */}
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
            { goal: 'Weight Loss', current: 8, target: 10, unit: 'kg', progress: 80 },
            { goal: 'Muscle Gain', current: 3, target: 5, unit: 'kg', progress: 60 },
            { goal: 'Cardio Endurance', current: 25, target: 30, unit: 'min', progress: 83 },
            { goal: 'Strength Training', current: 40, target: 50, unit: 'kg', progress: 80 },
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
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
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
          <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Calendar className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Book Class</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Dumbbell className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Start Workout</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <ChefHat className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Diet Plan</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
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
              { activity: 'Completed Yoga Class', time: '2 hours ago', icon: Activity },
              { activity: 'Reached Weight Goal', time: '1 day ago', icon: Target },
              { activity: 'Booked Strength Training', time: '2 days ago', icon: Calendar },
              { activity: 'Updated Diet Plan', time: '3 days ago', icon: ChefHat },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
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
            Achievements
          </h2>
          <div className="space-y-4">
            {[
              { title: 'First Workout', description: 'Completed your first workout session', earned: true },
              { title: '7-Day Streak', description: 'Worked out for 7 consecutive days', earned: true },
              { title: 'Weight Warrior', description: 'Lost 5kg in weight', earned: true },
              { title: 'Class Champion', description: 'Attended 20 group classes', earned: false },
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
    </div>
  );
};

export default MemberDashboard;