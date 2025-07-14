import { api } from './index';
import { GymClass } from '../types';

export const classesAPI = {
  getClasses: (params?: any) =>
    api.get('/classes', { params }),

  getClass: (id: string) =>
    api.get(`/classes/${id}`),

  createClass: (data: Partial<GymClass>) =>
    api.post('/classes', data),

  updateClass: (id: string, data: Partial<GymClass>) =>
    api.put(`/classes/${id}`, data),

  deleteClass: (id: string) =>
    api.delete(`/classes/${id}`),

  bookClass: (classId: string) =>
    api.post(`/classes/${classId}/book`),

  cancelBooking: (classId: string) =>
    api.delete(`/classes/${classId}/book`),

  getMyBookings: () =>
    api.get('/classes/my-bookings'),
};