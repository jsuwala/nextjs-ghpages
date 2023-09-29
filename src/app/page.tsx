import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import ProductList from '@/components/productList'
import HomeHero from '@/components/homeHero'

// import  Map from '@/components/Map'

export default function Home() {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false
  });

  return (
    <main className="pt-16">            
        <HomeHero />
        <Map />      
        <ProductList  />
    </main>
  )
}
