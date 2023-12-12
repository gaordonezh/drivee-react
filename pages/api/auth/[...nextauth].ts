import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    FacebookProvider({
      clientId: String(process.env.FACEBOOK_CLIENT_ID),
      clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const userFromDB = null;
        
      },
    }),
  ],
  callbacks: {
    signIn({ account, profile }: any) {
      if (!account || !profile) return false;

      if (account.provider === 'google') {
        return profile.email_verified && profile.email?.endsWith('@gmail.com');
      }
      return true;
    },
  },
});
