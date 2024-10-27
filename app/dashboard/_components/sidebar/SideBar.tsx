import React from 'react';
import styles from './sidebar.module.css';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from 'react-icons/md';
import MenuLink from './menuLink/MenuLink';
import Image from 'next/image';
import { auth, CustomSession } from '@/auth';
import { redirect } from 'next/navigation';

export type SideBarSelection = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

interface SideBarContent {
  title: string;
  list: SideBarSelection[];
}

const menuItems: SideBarContent[] = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Products',
        path: '/dashboard/products',
        icon: <MdShoppingBag />,
      },
      {
        title: 'Transactions',
        path: '/dashboard/transactions',
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        title: 'Revenue',
        path: '/dashboard/revenue',
        icon: <MdWork />,
      },
      {
        title: 'Reports',
        path: '/dashboard/reports',
        icon: <MdAnalytics />,
      },
      {
        title: 'Teams',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const SideBar = async () => {
  const session = (await auth()) as CustomSession;

  if (!session!.user) {
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={session?.user.img || '/noavatar.png'}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>
            {session?.user?.username || 'anonymous'}
          </span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink
                key={item.title}
                title={item.title}
                path={item.path}
                icon={item.icon}
              />
            ))}
          </li>
        ))}
      </ul>
      <form action={''}>
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default SideBar;
