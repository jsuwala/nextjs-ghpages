import dynamic from 'next/dynamic';
import Head from 'next/head';

import Layout from '@components/Layout';

const DEFAULT_CENTER = [38.907132, -77.036546]

const MapComponent = dynamic(() => {
  return import('@components/Map')
}, {
  ssr: false,
});

const DataComponent = dynamic(() => {
  return import('@components/DataPane')
});

export default function Home() {
  return (
    <Layout className='navbar'>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px', height: '80%', width: '100%' }}> */}
          <MapComponent className="map" width={800} height={400} center={DEFAULT_CENTER} zoom={12} children={undefined} >
          </MapComponent>
          <DataComponent className="datapane">
          </DataComponent>
      {/* </div> */}
    </Layout>
  )
}