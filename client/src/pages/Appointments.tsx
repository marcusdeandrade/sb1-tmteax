import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Appointment {
  id: string;
  patientName: string;
  procedure: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const appointments: Record<string, Appointment[]> = {
  '2024-01-08': [
    { id: '1', patientName: 'Maria Silva', procedure: 'Botox', time: '09:00', status: 'scheduled' },
    { id: '2', patientName: 'João Santos', procedure: 'Limpeza de Pele', time: '14:30', status: 'scheduled' }
  ],
  '2024-01-15': [
    { id: '3', patientName: 'Ana Oliveira', procedure: 'Preenchimento', time: '10:00', status: 'scheduled' }
  ]
};

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayAppointments = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return appointments[dateStr] || [];
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Agendamentos</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="btn">
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px border-t border-gray-200">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-semibold text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, dayIdx) => {
            const dayAppointments = getDayAppointments(day);
            const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

            return (
              <div
                key={day.toString()}
                className={clsx(
                  'min-h-[120px] bg-white p-2 cursor-pointer hover:bg-gray-50',
                  !isSameMonth(day, currentDate) && 'bg-gray-50 text-gray-400'
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className={clsx(
                  'flex justify-center items-center h-6 w-6 rounded-full mx-auto mb-1',
                  isToday(day) && 'bg-indigo-600 text-white',
                  isSelected && !isToday(day) && 'bg-indigo-100 text-indigo-700'
                )}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="px-2 py-1 text-xs rounded-md bg-gray-100"
                    >
                      <div className="font-medium truncate">{appointment.patientName}</div>
                      <div className="text-gray-600">{appointment.time} - {appointment.procedure}</div>
                      <span className={clsx(
                        'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium mt-1',
                        statusColors[appointment.status]
                      )}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Agendamentos para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          <div className="space-y-4">
            {getDayAppointments(selectedDate).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.procedure}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary">Editar</button>
                  <button className="btn-secondary text-red-700 hover:text-red-800">
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;