import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { createUser, getUser } from './data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUser(credentials.email);
        if (user && user.password === credentials.password) {
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser)
          await createUser({
            email: user.email,
            firstName: profile?.given_name || '',
            lastName: profile?.family_name || '',
            password: user.password,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getUser(session.user.email);
      session.user.id = guest.id;
      session.user.name = guest.firstName + ' ' + guest.lastame;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
