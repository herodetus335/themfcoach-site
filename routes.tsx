import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
// Public paths: keep in sync with seo/sitemapRoutes.ts (/, /form, /pricing, /calculator, /privacy)
import Layout from './Layout';
import Home from './pages/Home';
import FormPage from './components/FormPage';
import PricingPage from './pages/PricingPage';
import CalculatorPage from './pages/CalculatorPage';
import PrivacyPage from './pages/PrivacyPage';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <FormPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
    ],
  },
];

export default routes;
