import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { localBusinessJsonLd } from './seo/localBusinessSchema';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  // Calculator is a focused landing page — omit the site footer so it doesn't add scroll height
  const hideFooter = pathname === '/calculator';

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="GSaPP2RxqgJKEQRC5XjXSL4QQfeJ21SnnTIeZXeIHg8" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
      </Head>
      <div className="flex flex-col min-h-screen bg-brand-black text-white font-sans selection:bg-brand-neon selection:text-black">
        <Navbar />
        <main className={hideFooter ? 'flex-grow flex flex-col' : 'flex-grow'}>
          <Outlet />
        </main>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

export default Layout;
