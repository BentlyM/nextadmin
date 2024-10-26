import React from 'react';
import styles from './users.module.css';
import Search from '../_components/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../_components/pagination/Pagination';
import { fetchUsers } from '@/app/lib/data';
import prisma from '@/app/lib/prisma';

export interface QueryOptions {
  q?: string;
  page?: string;
}

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<QueryOptions>;
}) => {
  const resolvedSearchParams = await searchParams;

  const q = resolvedSearchParams.q || '';
  const page = resolvedSearchParams.page || '1';
  const users = await fetchUsers(q, page);

  const count = await prisma.user.count({
    where: {
      OR: [{ username: { contains: q, mode: 'insensitive' } }],
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={'Search for a user...'} />
        <Link href={'/dashboard/users/add'}>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img as string}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              <td>{user.isActive ? 'active' : 'passive'}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  );
};

export default UsersPage;
