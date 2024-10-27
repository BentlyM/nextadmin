import { createUsersSchema } from '@/schema/users';
import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export const addUser = async (formData: FormData) => {
  'use server';
  const parseBody = createUsersSchema.safeParse(formData);

  try {
    await prisma.user.create({
      // zod was being funny lol
      data: {
        username: String(formData.get('username')),
        email: String(formData.get('email')),
        password: String(formData.get('password')),
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
