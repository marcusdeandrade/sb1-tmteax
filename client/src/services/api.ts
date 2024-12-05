import axios from 'axios';
import type { Lead, Conversation, Message, Tag } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const leadsApi = {
  getAll: () => api.get<Lead[]>('/leads').then(res => res.data),
  getById: (id: string) => api.get<Lead>(`/leads/${id}`).then(res => res.data),
  update: (id: string, data: Partial<Lead>) => api.patch<Lead>(`/leads/${id}`, data).then(res => res.data),
  updateTags: (id: string, tags: string[]) => api.patch<Lead>(`/leads/${id}/tags`, { tags }).then(res => res.data)
};

export const conversationsApi = {
  getByLead: (leadId: string) => 
    api.get<Conversation[]>(`/leads/${leadId}/conversations`).then(res => res.data),
  getMessages: (conversationId: string) =>
    api.get<Message[]>(`/conversations/${conversationId}/messages`).then(res => res.data)
};

export const tagsApi = {
  getAll: () => api.get<Tag[]>('/tags').then(res => res.data),
  create: (data: Omit<Tag, 'id'>) => api.post<Tag>('/tags', data).then(res => res.data),
  update: (id: string, data: Partial<Tag>) => api.patch<Tag>(`/tags/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/tags/${id}`).then(res => res.data)
};

export default api;