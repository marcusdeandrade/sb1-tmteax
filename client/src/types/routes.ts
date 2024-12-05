export type AppRoute = {
  path: string;
  label: string;
  icon: string;
};

export const APP_ROUTES = {
  DASHBOARD: '/',
  LEADS: '/leads',
  CONVERSATIONS: '/conversations',
  APPOINTMENTS: '/appointments',
  PROCEDURES: '/procedures',
  ANALYTICS: '/analytics',
  TAGS: '/tags',
  SETTINGS: '/settings'
} as const;