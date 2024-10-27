import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from './app/lib/prisma';
import bcrypt from 'bcryptjs';

import { DefaultSession, User as NextAuthUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { User } from '@prisma/client';

export interface CustomToken extends DefaultJWT {
  username?: string;
  img?: string;
}

export interface CustomSession extends DefaultSession {
  user: {
    username?: string;
    img?: string;
  } & DefaultSession['user'];
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          const user = await login(credentials);

          return user ?? null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: CustomToken;
      user?: NextAuthUser | null;
    }) {
      if (user) {
        token.username = (user as unknown as User).username;
        token.img = (user as unknown as User).img as string;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },
});

const login = async (
  credentials: Partial<Record<'username' | 'password', unknown>>
): Promise<any | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: credentials.username as string,
      },
    });

    if (!user) throw new Error('Failed to login: User not found');
    if (!user.isAdmin) throw new Error('Forbidden: User is not an admin');

    const passwordMatch = await bcrypt.compare(
      credentials.password as string,
      user.password
    );
    if (!passwordMatch) throw new Error('Wrong credentials: Password mismatch');

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
