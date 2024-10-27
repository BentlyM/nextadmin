import React from 'react';
import styles from './addUser.module.css';
import { addUser } from '@/app/lib/actions';

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input type="tel" placeholder="Phone" name="phone" />

        <select name="isAdmin" id="isAdmin" required>
          <option value="">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select name="isActive" id="isActive" required>
          <option value="">Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <textarea
          name="address"
          id="address"
          rows={4}
          placeholder="Address"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
