import Head from 'next/head';

import Header from '@components/TopNavBar';
import Footer from '@components/BottomBar';

import styles from './Layout.module.scss';

const Layout = ({ children, className, ...rest }: React.PropsWithChildren<{ className: string }>) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;