import { api } from './index';
import { WorkoutPlan, DietPlan } from '../types';

export const workoutsAPI = {
  getWorkoutPlans: (memberId?: string) =>
    api.get('/workouts', { params: { memberId } }),

  getWorkoutPlan: (id: string) =>
    api.get(`/workouts/${id}`),

  createWorkoutPlan: (data: Partial<WorkoutPlan>) =>
    api.post('/workouts', data),

  updateWorkoutPlan: (id: string, data: Partial<WorkoutPlan>) =>
    api.put(`/workouts/${id}`, data),

  deleteWorkoutPlan: (id: string) =>
    api.delete(`/workouts/${id}`),

  getDietPlans: (memberId?: string) =>
    api.get('/diet-plans', { params: { memberId } }),

  getDietPlan: (id: string) =>
    api.get(`/diet-plans/${id}`),

  createDietPlan: (data: Partial<DietPlan>) =>
    api.post('/diet-plans', data),

  updateDietPlan: (id: string, data: Partial<DietPlan>) =>
    api.put(`/diet-plans/${id}`, data),

  deleteDietPlan: (id: string) =>
    api.delete(`/diet-plans/${id}`),
};