import { api } from './index';
import { Trainer } from '../types';

export const trainersAPI = {
  getTrainers: (params?: any) =>
    api.get('/trainers', { params }),

  getTrainer: (id: string) =>
    api.get(`/trainers/${id}`),

  createTrainer: (data: Partial<Trainer>) =>
    api.post('/trainers', data),

  updateTrainer: (id: string, data: Partial<Trainer>) =>
    api.put(`/trainers/${id}`, data),

  deleteTrainer: (id: string) =>
    api.delete(`/trainers/${id}`),

  getAssignedMembers: (trainerId: string) =>
    api.get(`/trainers/${trainerId}/members`),
};