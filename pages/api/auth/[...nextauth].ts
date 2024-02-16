import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import server from '@/server';
import { staticGoogleData } from '@/utils/constants';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 DAYS
    updateAge: 8 * 24 * 60 * 60, // 8 DAYS - deshabilitar la generación de token
  },
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const response = await server.post('auth', { user: email, password });
        if (!response.data) throw new Error('Invalid credentials');
        return response.data;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    // signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (account?.provider === 'google') {
        const response = await server.post('auth/google', { email: token.email, f_name: token.name, ...staticGoogleData });
        token = { ...response.data };
      }
      if (account?.provider === 'credentials') {
        token = { ...user };
      }
      if (trigger === 'update') {
        token = { ...session.info };
      }
      return token;
    },
    session({ session, token }) {
      const newObject = { ...token };
      delete newObject.exp;
      delete newObject.iat;
      delete newObject.jti;
      session.user = newObject;
      return session;
    },
  },
});
