'use client';
import React from 'react';
import styles from './menuLink.module.css';
import Link from 'next/link';
import { SideBarSelection } from '../SideBar';
import { usePathname } from 'next/navigation';

const MenuLink = ({ title, icon, path }: SideBarSelection) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`${styles.container} ${pathname === path && styles.active}`}
    >
      {icon} {title}
    </Link>
  );
};

export default MenuLink;
