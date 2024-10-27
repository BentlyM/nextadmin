import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './products.module.css';
import Search from '../_components/search/Search';
import Pagination from '../_components/pagination/Pagination';
import prisma from '@/app/lib/prisma';
import { fetchProducts } from '@/app/lib/data';
import { QueryOptions } from '../users/page';
import { deleteProduct } from './add/_actions/product';

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<QueryOptions>;
}) => {
  const resolvedSearchParams = await searchParams;

  const q = resolvedSearchParams.q || '';
  const page = resolvedSearchParams.page || '1';
  const products = await fetchProducts(q, page);

  const count = await prisma.product.count({
    where: {
      OR: [{ title: { contains: q, mode: 'insensitive' } }],
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={'Search for a Product...'} />
        <Link href={'/dashboard/products/add'}>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img || '/noproduct.png'} // Replace with actual image URL
                    alt={product.title}
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
