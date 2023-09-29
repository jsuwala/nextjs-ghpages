// source: https://blog.logrocket.com/getting-started-nextui-next-js/

import { ProductItem } from '@/types';

const fetchProductData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=8");
      const { products } = await res.json();
      const productsArray: ProductItem[] = products.map((product: any) => {
        return {
          id: product.id,
          title: product.title,
          description: product.description, 
          price: product.price
        }
      });
      return  productsArray;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export default async function ProductList() {
    const products = await fetchProductData();
    return (
      <>
        <h1>Products</h1>
        <div>
          
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

