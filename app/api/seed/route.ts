import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 这里可以触发数据库初始化
    // 为了安全，应该添加认证中间件

    return NextResponse.json({
      message: '数据库初始化端点',
      instructions: '请使用 npm run db:seed 在本地初始化数据库',
      warning: '生产环境应该通过 Supabase Dashboard 执行 SQL 脚本',
    });
  } catch (error) {
    return NextResponse.json(
      { error: '初始化失败' },
      { status: 500 }
    );
  }
}
