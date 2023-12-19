import dynamic from 'next/dynamic';
import Head from 'next/head';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546]

const MapComponent = dynamic(() => {
  return import('../components/Map')
}, {
  ssr: false,
});

const DataComponent = dynamic(() => {
  return import('../components/DataPane')
});

export default function Home() {
  return (
    <Layout className={''}>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '80%', width: '100%' }}>
        <div>
          {/* <Container className={''}> */}
            <MapComponent className={styles.homeMap} width={800} height={400} center={DEFAULT_CENTER} zoom={12} children={undefined} defaultX={0} defaultY={0} defaultZoom={0}>
            </MapComponent>
          {/* </Container> */}
        </div>
        <div>
          {/* <Container className={''}> */}
            <DataComponent></DataComponent>
          {/* </Container> */}
        </div>
      </div>
    </Layout>
  )
}