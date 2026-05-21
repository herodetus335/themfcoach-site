import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
// Public paths: keep in sync with seo/sitemapRoutes.ts (/, /form, /pricing)
import Layout from './Layout';
import Home from './pages/Home';
import FormPage from './components/FormPage';
import PricingPage from './pages/PricingPage';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <FormPage /> },
      { path: 'pricing', element: <PricingPage /> },
    ],
  },
];

export default routes;
