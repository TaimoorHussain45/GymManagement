import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Dumbbell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData, UserRole } from '../../types';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  role: yup.string().oneOf(['admin', 'trainer', 'member']).required('Role is required'),
  phone: yup.string(),
  // Conditional fields based on role
  specialization: yup.array().when('role', {
    is: 'trainer',
    then: (schema) => schema.min(1, 'At least one specialization is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  experience: yup.number().when('role', {
    is: 'trainer',
    then: (schema) => schema.min(0, 'Experience must be 0 or more').required('Experience is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  membershipType: yup.string().when('role', {
    is: 'member',
    then: (schema) => schema.oneOf(['basic', 'premium', 'vip']).required('Membership type is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  emergencyContact: yup.string().when('role', {
    is: 'member',
    then: (schema) => schema.required('Emergency contact is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  address: yup.string().when('role', {
    is: 'member',
    then: (schema) => schema.required('Address is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  age: yup.number().when('role', {
    is: 'member',
    then: (schema) => schema.min(16, 'Must be at least 16 years old').required('Age is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

type FormData = RegisterData & {
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      // Navigate based on user role after successful registration
      const user = JSON.parse(localStorage.getItem('gym_user') || '{}');
      if (user.role) {
        navigate(`/${user.role}`);
      }
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const fillDemoAccount = (role: UserRole) => {
    setValue('name', role === 'admin' ? 'Admin User' : role === 'trainer' ? 'John Smith' : 'Mike Chen');
    setValue('email', role === 'admin' ? 'admin@gymflow.com' : role === 'trainer' ? 'john@gymflow.com' : 'mike@example.com');
    setValue('password', role === 'admin' ? 'admin123' : role === 'trainer' ? 'trainer123' : 'member123');
    setValue('confirmPassword', role === 'admin' ? 'admin123' : role === 'trainer' ? 'trainer123' : 'member123');
    setValue('role', role);
    setValue('phone', '555-0001');
    
    if (role === 'trainer') {
      setValue('specialization', ['Weight Training', 'Cardio']);
      setValue('experience', 5);
    } else if (role === 'member') {
      setValue('membershipType', 'premium');
      setValue('emergencyContact', '555-0005');
      setValue('address', '123 Main St, City, State');
      setValue('age', 28);
    }
    
    toast.success(`Demo ${role} credentials filled! Complete registration to continue.`);
  };

  const specializations = [
    'Weight Training',
    'Cardio',
    'Yoga',
    'Pilates',
    'CrossFit',
    'Boxing',
    'Nutrition',
    'Rehabilitation',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-full">
              <Dumbbell className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Join GymFlow
          </h2>
          <p className="mt-2 text-sm text-blue-200">
            Create your account and start your fitness journey
          </p>
          
          {/* Demo Accounts Section */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-sm text-blue-200 mb-3 font-medium">🚀 Quick Demo Registration (Click to auto-fill):</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-3 rounded-lg transition-colors border border-red-400/30 hover:border-red-400/50"
              >
                <div className="font-semibold text-red-200">👑 Admin Demo</div>
                <div className="text-red-100 mt-1">Full Management</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('trainer')}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-white px-4 py-3 rounded-lg transition-colors border border-blue-400/30 hover:border-blue-400/50"
              >
                <div className="font-semibold text-blue-200">💪 Trainer Demo</div>
                <div className="text-blue-100 mt-1">Member Training</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('member')}
                className="bg-green-500/20 hover:bg-green-500/30 text-white px-4 py-3 rounded-lg transition-colors border border-green-400/30 hover:border-green-400/50"
              >
                <div className="font-semibold text-green-200">🏃 Member Demo</div>
                <div className="text-green-100 mt-1">Fitness Journey</div>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  {...register('role')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a role</option>
                  <option value="member">Member</option>
                  <option value="trainer">Trainer</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Role-specific fields */}
            {selectedRole === 'trainer' && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Trainer Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Specializations
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {specializations.map((spec) => (
                      <label key={spec} className="flex items-center">
                        <input
                          {...register('specialization')}
                          type="checkbox"
                          value={spec}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{spec}</span>
                      </label>
                    ))}
                  </div>
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Years of Experience
                  </label>
                  <input
                    {...register('experience')}
                    type="number"
                    min="0"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Years of experience"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                  )}
                </div>
              </div>
            )}

            {selectedRole === 'member' && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Member Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Membership Type
                    </label>
                    <select
                      {...register('membershipType')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select membership</option>
                      <option value="basic">Basic - $29/month</option>
                      <option value="premium">Premium - $49/month</option>
                      <option value="vip">VIP - $79/month</option>
                    </select>
                    {errors.membershipType && (
                      <p className="mt-1 text-sm text-red-600">{errors.membershipType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Age
                    </label>
                    <input
                      {...register('age')}
                      type="number"
                      min="16"
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your age"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Emergency Contact
                    </label>
                    <input
                      {...register('emergencyContact')}
                      type="tel"
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Emergency contact number"
                    />
                    {errors.emergencyContact && (
                      <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <textarea
                      {...register('address')}
                      rows={3}
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Create Account
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;