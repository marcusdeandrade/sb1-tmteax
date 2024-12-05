import { useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

const tabs = [
  { name: 'Geral', id: 'general' },
  { name: 'Horários', id: 'schedule' },
  { name: 'Mensagens', id: 'messages' },
  { name: 'Integrações', id: 'integrations' }
];

const Settings = () => {
  const [generalForm, setGeneralForm] = useState({
    clinicName: '',
    phone: '',
    address: ''
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
        </div>
      </div>

      <div className="mt-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  clsx(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-indigo-700 shadow'
                      : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel>
              <div className="bg-white shadow rounded-lg p-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700">
                      Nome da Clínica
                    </label>
                    <input
                      type="text"
                      id="clinicName"
                      value={generalForm.clinicName}
                      onChange={(e) => setGeneralForm(prev => ({ ...prev, clinicName: e.target.value }))}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={generalForm.phone}
                      onChange={(e) => setGeneralForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      value={generalForm.address}
                      onChange={(e) => setGeneralForm(prev => ({ ...prev, address: e.target.value }))}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <button type="submit" className="btn">
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            </Tab.Panel>
            {/* Add other tab panels here */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Settings;