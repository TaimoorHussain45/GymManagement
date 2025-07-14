export type UserRole = 'admin' | 'trainer' | 'member';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  joinDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Member extends User {
  membershipType: 'basic' | 'premium' | 'vip';
  membershipExpiry: string;
  trainerId?: string;
  emergencyContact: string;
  address: string;
  age: number;
  goals: string[];
}

export interface Trainer extends User {
  specialization: string[];
  experience: number;
  rating: number;
  assignedMembers: string[];
  bio: string;
  certifications: string[];
}

export interface Admin extends User {
  permissions: string[];
}

export interface GymClass {
  _id: string;
  name: string;
  instructor: string;
  instructorId: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: string[];
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'cardio' | 'strength' | 'yoga' | 'pilates' | 'crossfit';
  price: number;
  image?: string;
}

export interface WorkoutPlan {
  _id: string;
  memberId: string;
  trainerId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdDate: string;
  duration: number;
  isActive: boolean;
}

export interface Exercise {
  _id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  duration?: number;
  restTime?: number;
  instructions: string;
  targetMuscles: string[];
}

export interface DietPlan {
  _id: string;
  memberId: string;
  trainerId: string;
  name: string;
  description: string;
  meals: Meal[];
  createdDate: string;
  duration: number;
  calories: number;
  isActive: boolean;
}

export interface Meal {
  _id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Payment {
  _id: string;
  memberId: string;
  amount: number;
  type: 'membership' | 'class' | 'personal_training';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  description: string;
  transactionId?: string;
}

export interface Attendance {
  _id: string;
  memberId: string;
  classId?: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  type: 'gym' | 'class';
}

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface Equipment {
  _id: string;
  name: string;
  type: string;
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_order';
  purchaseDate: string;
  maintenanceDate?: string;
  notes?: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'event' | 'promotion';
  targetRoles: UserRole[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  specialization?: string[];
  experience?: number;
  membershipType?: 'basic' | 'premium' | 'vip';
  emergencyContact?: string;
  address?: string;
  age?: number;
}

export interface DashboardStats {
  totalMembers: number;
  totalTrainers: number;
  totalClasses: number;
  totalRevenue: number;
  activeMembers: number;
  todayAttendance: number;
  upcomingClasses: number;
  pendingPayments: number;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}