const routes = [
  {
    path: '/charleys/:cardId?',
    component: () => import('layouts/MainLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    redirect: { path: '/charleys' },
  },
];

export default routes;
