import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Dumbbell,
  Clock,
  TrendingUp,
  MessageSquare,
  Trophy,
  Target
} from 'lucide-react';
import StatCard from '../common/StatCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { dashboardAPI } from '../../api/dashboard';

const TrainerDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getTrainerStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch trainer stats:', error);
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
          Trainer Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your members' progress and manage your training sessions.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Members"
          value={stats?.assignedMembers || 15}
          icon={Users}
          trend={{ value: 10, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Today's Classes"
          value={stats?.todayClasses || 3}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Active Workouts"
          value={stats?.activeWorkouts || 8}
          icon={Dumbbell}
          color="purple"
        />
        <StatCard
          title="Session Hours"
          value={stats?.sessionHours || 24}
          icon={Clock}
          trend={{ value: 5, isPositive: true }}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Dumbbell className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Create Workout</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule Session</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Message Member</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <TrendingUp className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">View Progress</span>
          </button>
        </div>
      </motion.div>

      {/* Member Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Member Progress
          </h2>
          <div className="space-y-4">
            {[
              { name: 'John Doe', progress: 85, goal: 'Weight Loss' },
              { name: 'Jane Smith', progress: 70, goal: 'Muscle Gain' },
              { name: 'Mike Johnson', progress: 92, goal: 'Endurance' },
              { name: 'Sarah Wilson', progress: 78, goal: 'Strength' },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&sig=${index}`}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.goal}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {member.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Upcoming Sessions
          </h2>
          <div className="space-y-4">
            {[
              { member: 'John Doe', time: '9:00 AM', type: 'Personal Training' },
              { member: 'Jane Smith', time: '11:00 AM', type: 'Yoga Class' },
              { member: 'Mike Johnson', time: '2:00 PM', type: 'Strength Training' },
              { member: 'Sarah Wilson', time: '4:00 PM', type: 'Cardio Session' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.member}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.type}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{session.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainerDashboard;