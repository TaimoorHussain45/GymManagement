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
  Target,
  BookOpen,
  Star,
  AlertCircle,
  Plus
} from 'lucide-react';
import StatCard from '../common/StatCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { dashboardAPI } from '../../api/dashboard';
import toast from 'react-hot-toast';

const TrainerDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock data for trainer dashboard
        const mockStats = {
          assignedMembers: 18,
          todayClasses: 4,
          activeWorkouts: 12,
          sessionHours: 32,
          completedSessions: 156,
          memberProgress: 85,
          upcomingClasses: 6,
          rating: 4.8
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch trainer stats:', error);
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
          Trainer Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your members and track their fitness journey
        </p>
      </motion.div>

      {/* Trainer Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Members"
          value={stats.assignedMembers}
          icon={Users}
          trend={{ value: 10, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Today's Classes"
          value={stats.todayClasses}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Active Workouts"
          value={stats.activeWorkouts}
          icon={Dumbbell}
          color="purple"
        />
        <StatCard
          title="Session Hours"
          value={stats.sessionHours}
          icon={Clock}
          trend={{ value: 5, isPositive: true }}
          color="yellow"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Completed Sessions"
          value={stats.completedSessions}
          icon={Trophy}
          color="green"
        />
        <StatCard
          title="Member Progress"
          value={`${stats.memberProgress}%`}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Upcoming Classes"
          value={stats.upcomingClasses}
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Trainer Rating"
          value={stats.rating}
          icon={Star}
          color="yellow"
        />
      </div>

      {/* Trainer Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Trainer Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => toast.success('Create Workout feature coming soon!')}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Dumbbell className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Create Workout</span>
          </button>
          <button 
            onClick={() => toast.success('Schedule Session feature coming soon!')}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule Session</span>
          </button>
          <button 
            onClick={() => toast.success('Message Member feature coming soon!')}
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Message Member</span>
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

      {/* Member Progress & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Member Progress Tracking
          </h2>
          <div className="space-y-4">
            {[
              { name: 'John Doe', progress: 85, goal: 'Weight Loss', sessions: 12 },
              { name: 'Jane Smith', progress: 70, goal: 'Muscle Gain', sessions: 8 },
              { name: 'Mike Johnson', progress: 92, goal: 'Endurance', sessions: 15 },
              { name: 'Sarah Wilson', progress: 78, goal: 'Strength', sessions: 10 },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&sig=${index}`}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.goal} • {member.sessions} sessions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {[
              { member: 'John Doe', time: '9:00 AM', type: 'Personal Training', duration: '60 min' },
              { member: 'Group Class', time: '11:00 AM', type: 'HIIT Training', duration: '45 min' },
              { member: 'Jane Smith', time: '2:00 PM', type: 'Strength Training', duration: '60 min' },
              { member: 'Group Class', time: '4:00 PM', type: 'Yoga Session', duration: '60 min' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{session.member}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.type} • {session.duration}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">{session.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Workout Plans & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Active Workout Plans
          </h2>
          <div className="space-y-4">
            {[
              { plan: 'Beginner Strength', members: 5, completion: 78 },
              { plan: 'Advanced Cardio', members: 3, completion: 92 },
              { plan: 'Weight Loss Program', members: 7, completion: 65 },
              { plan: 'Muscle Building', members: 4, completion: 88 },
            ].map((plan, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{plan.plan}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{plan.members} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${plan.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {plan.completion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Performance Metrics
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Satisfaction</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Goal Achievement Rate</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Attendance</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">92%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainerDashboard;