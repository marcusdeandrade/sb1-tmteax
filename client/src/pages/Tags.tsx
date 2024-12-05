import { useState } from 'react';

function Tags() {
  const [tags] = useState([
    {
      id: '1',
      name: 'Interessado em Botox',
      color: '#f50',
      count: 15,
      category: 'Interesse',
    },
    {
      id: '2',
      name: 'Cliente VIP',
      color: '#87d068',
      count: 8,
      category: 'Status',
    },
    {
      id: '3',
      name: 'Aguardando Retorno',
      color: '#108ee9',
      count: 12,
      category: 'Follow-up',
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Gerenciamento de Tags</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6">
        Nova Tag
      </button>
      <div className="overflow-hidden rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Leads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {tag.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{tag.count}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-4">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      Editar
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tags;
