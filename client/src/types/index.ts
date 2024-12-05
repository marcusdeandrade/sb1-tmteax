export interface Lead {
  id: string;
  phoneNumber: string;
  name: string | null;
  email: string | null;
  tagList: string[];
  lastContact: string;
  status: 'new' | 'active' | 'inactive';
  metadata: Record<string, any>;
}

export interface Conversation {
  id: string;
  leadId: string;
  status: 'active' | 'closed';
  lastMessageAt: string;
  metadata: Record<string, any>;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  type: 'text' | 'audio' | 'image' | 'document' | 'location';
  content: string;
  direction: 'incoming' | 'outgoing';
  metadata: Record<string, any>;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  description?: string;
  category?: string;
}