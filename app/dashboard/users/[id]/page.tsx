import Image from 'next/image';
import styles from './singleUser.module.css';

import React from 'react';

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        John Doe
      </div>
      <div className={styles.formContainer}>
      <form action={''} className={styles.form}>
        <label>Username</label>
        <input type="text" name="username" placeholder="John Doe" />
        <label>Email</label>
        <input type="email" name="username" placeholder="JohnDoe@gmail.com" />
        <label>Password</label>
        <input type="password" name="password" placeholder="John Doe" />
        <label>Username</label>
        <input type="text" name="Phone" placeholder="+1234567" />
        <label>Address</label>
        <input type="text" name="address" placeholder="New York" />
        <label>Is Admin?</label>
        <select name="isAdmin" id="isAdmin">
          <option value={''}>Yes</option>
          <option value={''}>No</option>
        </select>
        <label>Is Active?</label>
        <select name="isActive" id="isActive">
          <option value={''}>
            Yes
          </option>
          <option value={''}>
            No
          </option>
        </select>
        <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
