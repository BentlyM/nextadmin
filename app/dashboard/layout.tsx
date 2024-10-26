import React from 'react'
import SideBar from './_components/sidebar/SideBar'
import Navbar from './_components/navbar/Navbar'
import styles from './dashboard.module.css'
import Footer from './_components/footer/Footer'

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout