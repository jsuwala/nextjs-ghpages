import Head from 'next/head';

import Header from '@components/TopNavBar';
import Footer from '@components/BottomBar';

const Layout = ({ children, className, ...rest }: React.PropsWithChildren<{ className: string }>) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;