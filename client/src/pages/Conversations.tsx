import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Conversation } from '../types';

const ConversationCard = ({ conversation }: { conversation: Conversation }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {conversation.metadata.leadName || 'Cliente'}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {conversation.status === 'active' ? 'Ativa' : 'Fechada'}
        </span>
      </div>
      
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
        {conversation.metadata.lastMessage || 'Nenhuma mensagem'}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {format(new Date(conversation.lastMessageAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
        </span>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Ver conversa
        </button>
      </div>
    </div>
  </div>
);

const Conversations = () => {
  const [search, setSearch] = useState('');
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => Promise.resolve([]) // Replace with actual API call
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Conversas</h1>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative max-w-md mb-6">
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {isLoading ? (
          <div className="text-center py-4">Carregando...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conversations.map((conversation) => (
              <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;