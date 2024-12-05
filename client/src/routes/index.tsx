import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import Conversations from '../pages/Conversations';
import Appointments from '../pages/Appointments';
import Settings from '../pages/Settings';
import Analytics from '../pages/Analytics';
import Procedures from '../pages/Procedures';
import Tags from '../pages/Tags';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'leads', element: <Leads /> },
      { path: 'conversations', element: <Conversations /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'procedures', element: <Procedures /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'tags', element: <Tags /> },
      { path: 'settings', element: <Settings /> }
    ]
  }
]);