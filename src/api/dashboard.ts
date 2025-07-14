import { api } from './index';

export const dashboardAPI = {
  getAdminStats: () =>
    api.get('/dashboard/admin-stats'),

  getTrainerStats: () =>
    api.get('/dashboard/trainer-stats'),

  getMemberStats: () =>
    api.get('/dashboard/member-stats'),

  getAttendanceData: (period: string = '7d') =>
    api.get('/dashboard/attendance', { params: { period } }),

  getRevenueData: (period: string = '7d') =>
    api.get('/dashboard/revenue', { params: { period } }),
};