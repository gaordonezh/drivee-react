import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import server from '@/server';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
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
    // error: '/auth/error',
    // signOut: '/auth/signout',
  },
  callbacks: {
    jwt({ token, user }) {
      // @ts-ignore
      if (user?._id) token = { ...user };
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
