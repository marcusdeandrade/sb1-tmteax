import { create } from 'zustand';
import type { Lead, Message, Tag } from '../types';

interface Store {
  leads: Lead[];
  messages: Record<string, Message[]>;
  tags: Tag[];
  setLeads: (leads: Lead[]) => void;
  addMessage: (message: Message) => void;
  setTags: (tags: Tag[]) => void;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
}

export const useStore = create<Store>((set) => ({
  leads: [],
  messages: {},
  tags: [],
  
  setLeads: (leads) => set({ leads }),
  
  addMessage: (message) => set((state) => ({
    messages: {
      ...state.messages,
      [message.conversationId]: [
        ...(state.messages[message.conversationId] || []),
        message
      ]
    }
  })),
  
  setTags: (tags) => set({ tags }),
  
  updateLeadStatus: (leadId, status) => set((state) => ({
    leads: state.leads.map((lead) =>
      lead.id === leadId ? { ...lead, status } : lead
    )
  }))
}));