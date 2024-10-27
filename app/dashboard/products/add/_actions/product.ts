'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface Product {
  size?: string | undefined;
  color?: string | undefined;
  stock?: number | undefined;
  price?: number | undefined;
  desc?: string | undefined;
  title?: string | undefined;
  img?: string | undefined;
}

export const addProduct = async (formData: FormData) => {
  try {
    await prisma.product.create({
      // zod was being funny lol
      data: {
        title: String(formData.get('title')),
        desc: String(formData.get('desc')),
        price: parseInt(String(formData.get('price'))) || 0,
        stock: parseInt(String(formData.get('stock'))) || 0,
        color: String(formData.get('color')),
        size: String(formData.get('size')),
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const updateProduct = async (formData: FormData) => {
  const updatedData: Product = {
    ...(formData.get('title') && { title: String(formData.get('title')) }),
    ...(formData.get('desc') && { desc: String(formData.get('desc')) }),
    ...(formData.get('price') && {
      price: parseInt(String(formData.get('price'))) || 0,
    }),
    ...(formData.get('stock') && {
      stock: parseInt(String(formData.get('stock'))) || 0,
    }),
    ...(formData.get('color') && { color: String(formData.get('color')) }),
    ...(formData.get('size') && { size: String(formData.get('size')) }),
  };

  const imgInput = String(formData.get('img'));
  const newImg = imgInput && imgInput !== 'null' ? imgInput : undefined;
  if (newImg) {
    updatedData.img = newImg;
  }

  try {
    await prisma.product.update({
      where: { id: parseInt(String(formData.get('id'))) },
      data: updatedData,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const deleteProduct = async (formData: FormData) => {
  const id = String(formData.get('id'));

  if (id === 'null') {
    throw new Error('Unable to fetch product');
  }

  try {
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  revalidatePath('/dashboard/products');
};
