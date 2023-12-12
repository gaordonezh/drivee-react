import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  console.log(1);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log({ session });

  // if (!session) {
  //   const resquestedPage = req.nextUrl.pathname;
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/auth/signin';
  //   url.search = `p=${resquestedPage}`;
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
