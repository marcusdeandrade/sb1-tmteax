import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { ChartBarIcon, UserGroupIcon, ChatBubbleLeftRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => Promise.resolve({
      totalPatients: 156,
      activeConversations: 23,
      todayAppointments: 8,
      weekAppointments: 45
    })
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard - {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Pacientes"
          value={stats?.totalPatients}
          icon={UserGroupIcon}
          color="text-blue-500"
        />
        <StatCard
          title="Conversas Ativas"
          value={stats?.activeConversations}
          icon={ChatBubbleLeftRightIcon}
          color="text-green-500"
        />
        <StatCard
          title="Consultas Hoje"
          value={stats?.todayAppointments}
          icon={CalendarIcon}
          color="text-purple-500"
        />
        <StatCard
          title="Consultas na Semana"
          value={stats?.weekAppointments}
          icon={ChartBarIcon}
          color="text-yellow-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;