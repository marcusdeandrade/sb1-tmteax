import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { addMessage, updateLeadStatus } = useStore();

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    socketRef.current = io(SOCKET_URL);

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('whatsapp:message', (data) => {
      const { lead, message } = data;
      addMessage(message);
      updateLeadStatus(lead.id, lead.status);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage, updateLeadStatus]);

  return socketRef.current;
};