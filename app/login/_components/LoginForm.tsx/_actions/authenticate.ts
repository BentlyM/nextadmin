'use server'
import { signIn } from '@/auth';

export const authenticate = async (_prevState: unknown , formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (err) {
    if (err instanceof Error) {
      return "Wrong Credentials!"
    }
  }
};
