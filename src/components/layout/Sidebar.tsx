import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Dumbbell,
  ChefHat,
  BarChart3,
  Settings,
  UserCheck,
  Trophy,
  Package,
  MessageSquare,
  FileText,
  Activity,
  Target,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
          { icon: Users, label: 'Members', path: '/admin/members' },
          { icon: UserCheck, label: 'Trainers', path: '/admin/trainers' },
          { icon: Calendar, label: 'Classes', path: '/admin/classes' },
          { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
          { icon: Package, label: 'Equipment', path: '/admin/equipment' },
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
          { icon: FileText, label: 'Reports', path: '/admin/reports' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      case 'trainer':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/trainer' },
          { icon: Users, label: 'My Members', path: '/trainer/members' },
          { icon: Calendar, label: 'My Classes', path: '/trainer/classes' },
          { icon: Dumbbell, label: 'Workout Plans', path: '/trainer/workouts' },
          { icon: ChefHat, label: 'Diet Plans', path: '/trainer/diet-plans' },
          { icon: Activity, label: 'Attendance', path: '/trainer/attendance' },
          { icon: BarChart3, label: 'Progress', path: '/trainer/progress' },
          { icon: MessageSquare, label: 'Messages', path: '/trainer/messages' },
        ];
      case 'member':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/member' },
          { icon: Calendar, label: 'Book Classes', path: '/member/classes' },
          { icon: Dumbbell, label: 'My Workouts', path: '/member/workouts' },
          { icon: ChefHat, label: 'Diet Plans', path: '/member/diet-plans' },
          { icon: Target, label: 'My Progress', path: '/member/progress' },
          { icon: CreditCard, label: 'Payments', path: '/member/payments' },
          { icon: Trophy, label: 'Achievements', path: '/member/achievements' },
          { icon: Heart, label: 'Health', path: '/member/health' },
          { icon: MessageSquare, label: 'Support', path: '/member/support' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleInfo = () => {
    switch (user?.role) {
      case 'admin':
        return { color: 'bg-red-500', label: 'Administrator' };
      case 'trainer':
        return { color: 'bg-blue-500', label: 'Trainer' };
      case 'member':
        return { color: 'bg-green-500', label: 'Member' };
      default:
        return { color: 'bg-gray-500', label: 'User' };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="bg-white dark:bg-gray-900 shadow-lg w-64 min-h-screen border-r border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        {/* User Role Badge */}
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${roleInfo.color}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {roleInfo.label}
            </span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Role-specific footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user?.role === 'admin' && 'Full system access'}
            {user?.role === 'trainer' && 'Member management'}
            {user?.role === 'member' && 'Personal fitness'}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;