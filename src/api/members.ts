import { api } from './index';
import { Member } from '../types';

export const membersAPI = {
  getMembers: (params?: any) =>
    api.get('/members', { params }),

  getMember: (id: string) =>
    api.get(`/members/${id}`),

  createMember: (data: Partial<Member>) =>
    api.post('/members', data),

  updateMember: (id: string, data: Partial<Member>) =>
    api.put(`/members/${id}`, data),

  deleteMember: (id: string) =>
    api.delete(`/members/${id}`),

  assignTrainer: (memberId: string, trainerId: string) =>
    api.put(`/members/${memberId}/assign-trainer`, { trainerId }),

  getProgress: (memberId: string) =>
    api.get(`/members/${memberId}/progress`),
};