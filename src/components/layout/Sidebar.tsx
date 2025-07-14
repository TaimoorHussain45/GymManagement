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
  FileText
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
          { icon: FileText, label: 'Announcements', path: '/admin/announcements' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      case 'trainer':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/trainer' },
          { icon: Users, label: 'My Members', path: '/trainer/members' },
          { icon: Calendar, label: 'My Classes', path: '/trainer/classes' },
          { icon: Dumbbell, label: 'Workout Plans', path: '/trainer/workouts' },
          { icon: ChefHat, label: 'Diet Plans', path: '/trainer/diet-plans' },
          { icon: UserCheck, label: 'Attendance', path: '/trainer/attendance' },
          { icon: BarChart3, label: 'Progress', path: '/trainer/progress' },
          { icon: MessageSquare, label: 'Messages', path: '/trainer/messages' },
        ];
      case 'member':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/member' },
          { icon: Calendar, label: 'Book Classes', path: '/member/classes' },
          { icon: Dumbbell, label: 'Workout Plans', path: '/member/workouts' },
          { icon: ChefHat, label: 'Diet Plans', path: '/member/diet-plans' },
          { icon: BarChart3, label: 'Progress', path: '/member/progress' },
          { icon: CreditCard, label: 'Payments', path: '/member/payments' },
          { icon: Trophy, label: 'Achievements', path: '/member/achievements' },
          { icon: MessageSquare, label: 'Support', path: '/member/support' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="bg-white dark:bg-gray-900 shadow-lg w-64 min-h-screen border-r border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;