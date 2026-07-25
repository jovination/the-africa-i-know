import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get('tag');
    const secret = request.nextUrl.searchParams.get('secret');

    // In a production app, you should check the secret against process.env.REVALIDATE_SECRET
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    // }

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    revalidateTag(tag as string, 'default');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Error revalidating', error: err?.message || String(err) }, { status: 500 });
  }
}
