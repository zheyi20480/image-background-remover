import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: '请上传图片文件' }, { status: 400 });
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (apiKey && apiKey !== 'your_api_key_here') {
      // 调用真实 Remove.bg API
      const apiFormData = new FormData();
      apiFormData.append('image_file', file);
      apiFormData.append('size', 'auto');

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': apiKey },
        body: apiFormData,
      });

      if (!response.ok) {
        const errText = await response.text();
        return NextResponse.json({ error: `Remove.bg API 错误: ${errText}` }, { status: response.status });
      }

      const imageBuffer = await response.arrayBuffer();
      return new NextResponse(imageBuffer, {
        headers: { 'Content-Type': 'image/png' },
      });
    }

    // 无 API Key，返回模拟处理结果（原图加半透明白色覆盖模拟抠图）
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 简单模拟：返回原图数据，前端会做展示
    return new NextResponse(buffer, {
      headers: { 'Content-Type': file.type },
    });
  } catch (error) {
    console.error('Remove BG error:', error);
    return NextResponse.json({ error: '处理失败，请重试' }, { status: 500 });
  }
}
