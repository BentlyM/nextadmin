import Image from 'next/image';
import styles from './singleUser.module.css';

import React from 'react';
import { fetchUser } from '@/app/lib/data';
import { updateUser } from '../add/_actions/user';

const SingleUserPage = async ({ params }: { params: {id: string} }) => {
  const {id} = params; 
  const user = await fetchUser(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user?.img || "/noavatar.png"} alt="" fill />
        </div>
        {user?.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type='hidden' name='id' value={user?.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user?.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user?.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user?.phone as string} />
          <label>Address</label>
          <input type="text" name="address" placeholder={user?.address as string}/>
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value="">Is Admin?</option>
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value="">Is Active?</option>
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
