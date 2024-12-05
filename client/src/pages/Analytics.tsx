import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card } from '../components/common';

const Analytics = () => {
  const [chartData] = useState({
    proceduresChart: {
      series: [35, 25, 20, 20],
      options: {
        chart: {
          type: 'pie',
          foreColor: '#64748B',
        },
        labels: ['Botox', 'Preenchimento', 'Limpeza de Pele', 'Outros'],
        colors: ['#3C50E0', '#80CAEE', '#10B981', '#FF6766'],
        legend: {
          position: 'bottom',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    },
    leadsChart: {
      series: [
        {
          name: 'Leads',
          data: [45, 78, 92, 84, 76, 98],
        },
      ],
      options: {
        chart: {
          type: 'area',
          height: 350,
          foreColor: '#64748B',
          toolbar: {
            show: false,
          },
        },
        colors: ['#3C50E0'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        },
        tooltip: {
          theme: 'dark',
        },
      },
    },
  });

  const stats = [
    {
      title: 'Total de Leads',
      value: '245',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      title: 'Taxa de Conversão',
      value: '15.4%',
      bgColor: 'bg-secondary/10',
      textColor: 'text-secondary',
    },
    {
      title: 'Agendamentos do Mês',
      value: '78',
      bgColor: 'bg-meta-3/10',
      textColor: 'text-meta-3',
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 1.250',
      bgColor: 'bg-meta-5/10',
      textColor: 'text-meta-5',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Análises</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="flex flex-col p-6">
            <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </dt>
            <dd className={`mt-2 text-3xl font-semibold ${stat.textColor}`}>
              {stat.value}
            </dd>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Leads por Mês</h3>
          <div className="h-[350px]">
            <ReactApexChart
              options={chartData.leadsChart.options}
              series={chartData.leadsChart.series}
              type="area"
              height={350}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-xl font-semibold">
            Procedimentos Mais Procurados
          </h3>
          <div className="h-[350px]">
            <ReactApexChart
              options={chartData.proceduresChart.options}
              series={chartData.proceduresChart.series}
              type="pie"
              height={350}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
