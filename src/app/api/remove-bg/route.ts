export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: { message: "Remove.bg API Key 未配置，请联系管理员" } },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: { message: "请上传图片文件" } },
        { status: 400 }
      );
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: { message: "文件大小不能超过 10MB" } },
        { status: 400 }
      );
    }

    const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!acceptedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: { message: "仅支持 JPG、PNG、WebP 格式" } },
        { status: 400 }
      );
    }

    // Proxy to Remove.bg API
    const apiFormData = new FormData();
    apiFormData.append("image_file", imageFile);
    apiFormData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 402) {
        return NextResponse.json(
          { error: { message: "API 额度不足，请联系管理员" } },
          { status: 402 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: { message: "请求过于频繁，请稍后再试" } },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: {
            message: `处理失败 (${response.status}): ${errorText || "未知错误"}`,
          },
        },
        { status: response.status }
      );
    }

    const imageBlob = await response.blob();

    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="removed-bg-${Date.now()}.png"`,
      },
    });
  } catch (error) {
    console.error("Remove.bg API Error:", error);
    return NextResponse.json(
      {
        error: {
          message: "服务异常，请稍后重试",
        },
      },
      { status: 500 }
    );
  }
}
