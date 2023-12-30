import dynamic from 'next/dynamic';
import Head from 'next/head';

import Layout from '@components/Layout';
import { Accordion, AccordionItem, Card } from '@nextui-org/react';

const DEFAULT_CENTER = [38.907132, -77.036546]

const MapComponent = dynamic(() => {
  return import('@components/Map')
}, {
  ssr: false,
});

const DataComponent = dynamic(() => {
  return import('@components/DataPane')
});

export default function Stream2() {
  return (
    <Layout className='layout'>
      <Head>
        <title>DataMap</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <MapComponent className="map" center={DEFAULT_CENTER} zoom={12} >
        </MapComponent>
        <Card>
          <DataComponent>
          </DataComponent>
        </Card>
    </Layout>
  )
}