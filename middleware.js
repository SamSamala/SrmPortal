// middleware.js — proxy all /api/* requests to BACKEND_URL (Railway)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const backend = (process.env.BACKEND_URL || '').replace(/\/+$/, '');
  if (!backend) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const destination = `${backend}${pathname}${search}`;
  return NextResponse.rewrite(destination);
}

export const config = {
  // Exclude /api/cron/* and /api/billing/* so they run on Vercel, not proxied to Railway
  matcher: '/api/((?!cron/|billing/).*)' ,
};
