const mapping: Record<string, string> = {
  applications: 'application',
  faqs: 'faq',
  organizations: 'organization',
  'pan-cards': 'pan_card',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
