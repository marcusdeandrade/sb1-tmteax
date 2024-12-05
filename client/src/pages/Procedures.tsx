const procedures = [
  {
    id: 1,
    name: 'Botox',
    description: 'Tratamento para rugas e linhas de expressão',
    duration: '30 minutos',
    price: 'R$ 1.200,00',
    category: 'Facial',
  },
  {
    id: 2,
    name: 'Preenchimento Labial',
    description: 'Aumento e definição dos lábios',
    duration: '45 minutos',
    price: 'R$ 1.500,00',
    category: 'Facial',
  },
  // Adicione mais procedimentos conforme necessário
];

function Procedures() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Procedimentos</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6">
        Adicionar Procedimento
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {procedures.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                Duração: {item.duration}
              </p>
              <p className="text-sm text-gray-600 mt-2">Valor: {item.price}</p>
              <span className="inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {item.category}
              </span>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                className="text-blue-500 hover:text-blue-700 transition"
                aria-label={`Editar ${item.name}`}
              >
                Editar
              </button>
              <button
                className="text-red-500 hover:text-red-700 transition"
                aria-label={`Excluir ${item.name}`}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Procedures;
