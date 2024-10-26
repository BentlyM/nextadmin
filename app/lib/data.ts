import { Product, User } from '@prisma/client';
import prisma from './prisma';

export const fetchUsers = async (q: string, page: string): Promise<User[]> => {
  try {
    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 2;

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q, mode: 'insensitive' } },
          // { username: { matches: regex } } might use this
        ],
      },
      skip: ITEM_PER_PAGE * (parseInt(page) - 1),
      take: ITEM_PER_PAGE,
    });

    return users;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw new Error('Failed to fetch users!');
    }
    throw e;
  }
};

export const fetchProducts = async (q: string, page: string): Promise<Product[]> => {
  try {
    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 2;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          // { username: { matches: regex } } might use this
        ],
      },
      skip: ITEM_PER_PAGE * (parseInt(page) - 1),
      take: ITEM_PER_PAGE,
    });

    return products;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw new Error('Failed to fetch users!');
    }
    throw e;
  }
};
