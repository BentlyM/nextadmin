import React from 'react';
import Card from './_components/card/Card';
import styles from './dashboard.module.css';
import RightBar from './_components/rightbar/RightBar';
import Transactions from './_components/transactions/Transactions';
import Chart from './_components/chart/Chart';

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
};

export default Dashboard;
