import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '请填写邮箱和密码' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码至少6个字符' }, { status: 400 });
    }

    const token = 'token_' + Math.random().toString(36).substring(2, 15);

    return NextResponse.json({
      token,
      user: {
        email,
        plan: 'free',
        credits: 5,
      },
    });
  } catch {
    return NextResponse.json({ error: '注册失败' }, { status: 500 });
  }
}
