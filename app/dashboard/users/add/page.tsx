import React from 'react';
import styles from './addUser.module.css';

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={''} className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="phone" placeholder="phone" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={''}>Is Admin?</option>
          <option value={''}>Yes</option>
          <option value={''}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={''}>Is Active?</option>
          <option value={''}>Yes</option>
          <option value={''}>No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows={16}
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
