'use server';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export interface User {
   img?: string | undefined;
    isAdmin: boolean;
    isActive: boolean;
    address?: string | undefined;
    phone?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
}

export const addUser = async (formData: FormData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      String(formData.get('password')),
      salt
    );

    await prisma.user.create({
      // zod was being funny lol
      data: {
        username: String(formData.get('username')),
        email: String(formData.get('email')),
        password: hashedPassword,
        phone: String(formData.get('phone')) || '',
        address: String(formData.get('address')),
        isAdmin: String(formData.get('isAdmin')) == 'true',
        isActive: String(formData.get('isActive')) == 'true',
        img:
          String(formData.get('img')) === 'null'
            ? '/noavatar.png'
            : String(formData.get('img')),
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const updateUser = async (formData: FormData) => {
  const newUsername = String(formData.get('username'));
  const newEmail = String(formData.get('email'));
  const newPassword = String(formData.get('password'));
  const newPhone = String(formData.get('phone')) || '';
  const newAddress = String(formData.get('address'));
  const newIsAdmin = String(formData.get('isAdmin')) === 'true';
  const newIsActive = String(formData.get('isActive')) === 'true';

  
  const imgInput = String(formData.get('img'));
  const newImg = imgInput && imgInput !== 'null' ? imgInput : undefined;

  const updatedData : User = {
    ...(newUsername && { username: newUsername }),
    ...(newEmail && { email: newEmail }),
    ...(newPassword && { password: newPassword }),
    ...(newPhone && { phone: newPhone }),
    ...(newAddress && { address: newAddress }),
    isAdmin: newIsAdmin,
    isActive: newIsActive,
    ...(newImg && { img: newImg }),
  };

  try {
    await prisma.user.update({
      where: { id: parseInt(String(formData.get('id'))) },
      data: updatedData,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const deleteUser = async (formData: FormData) => {
  const id = String(formData.get('id'));

  if (id === 'null') {
    throw new Error('Unable to fetch product');
  }

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  revalidatePath('/dashboard/users');
};
