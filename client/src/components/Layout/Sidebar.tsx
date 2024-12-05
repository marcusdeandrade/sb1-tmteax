import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  TagIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { APP_ROUTES } from '../../types/routes';

const navigation = [
  {
    path: APP_ROUTES.DASHBOARD,
    icon: HomeIcon,
    label: 'Dashboard'
  },
  {
    path: APP_ROUTES.LEADS,
    icon: UserGroupIcon,
    label: 'Pacientes'
  },
  {
    path: APP_ROUTES.CONVERSATIONS,
    icon: ChatBubbleLeftRightIcon,
    label: 'Conversas'
  },
  {
    path: APP_ROUTES.APPOINTMENTS,
    icon: CalendarIcon,
    label: 'Agendamentos'
  },
  {
    path: APP_ROUTES.PROCEDURES,
    icon: ClipboardDocumentListIcon,
    label: 'Procedimentos'
  },
  {
    path: APP_ROUTES.ANALYTICS,
    icon: ChartBarIcon,
    label: 'Análises'
  },
  {
    path: APP_ROUTES.TAGS,
    icon: TagIcon,
    label: 'Tags'
  },
  {
    path: APP_ROUTES.SETTINGS,
    icon: Cog6ToothIcon,
    label: 'Configurações'
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-boxdark">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Clínica Estética</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={clsx(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              location.pathname === path
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-boxdark-2'
            )}
          >
            <Icon
              className={clsx(
                'mr-3 h-5 w-5 flex-shrink-0',
                location.pathname === path
                  ? 'text-white'
                  : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
              )}
            />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;