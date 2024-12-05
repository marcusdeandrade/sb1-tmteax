import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date | string) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatDateTime = (date: Date | string) => {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

export const formatTimeAgo = (date: Date | string) => {
  return formatDistance(new Date(date), new Date(), { 
    addSuffix: true,
    locale: ptBR 
  });
};