export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    GET: (id) => `/leads/${id}`,
    UPDATE: (id) => `/leads/${id}`,
    DELETE: (id) => `/leads/${id}`,
  },
  DASHBOARD: {
    STATS: '/dashboard',
  },
  NOTES: {
    ADD: (leadId) => `/leads/${leadId}/notes`,
    LIST: (leadId) => `/leads/${leadId}/notes`,
  },
};

export const LEAD_STATUS_OPTIONS = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Proposal Sent', label: 'Proposal Sent' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' },
];

export const LEAD_SOURCE_OPTIONS = [
  { value: 'Website', label: 'Website' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Cold Email', label: 'Cold Email' },
  { value: 'Event', label: 'Event' },
  { value: 'Other', label: 'Other' },
];

export const STATUS_COLORS = {
  New: 'border border-blue-200 bg-blue-100/80 text-blue-700',
  Contacted: 'border border-amber-200 bg-amber-100/80 text-amber-700',
  Qualified: 'border border-violet-200 bg-violet-100/80 text-violet-700',
  'Proposal Sent': 'border border-indigo-200 bg-indigo-100/80 text-indigo-700',
  Won: 'border border-emerald-200 bg-emerald-100/80 text-emerald-700',
  Lost: 'border border-rose-200 bg-rose-100/80 text-rose-700',
};

export const STATUS_LABEL_MAP = {
  New: 'New',
  Contacted: 'Contacted',
  Qualified: 'Qualified',
  'Proposal Sent': 'Proposal Sent',
  Won: 'Won',
  Lost: 'Lost',
};
