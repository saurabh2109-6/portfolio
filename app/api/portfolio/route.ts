import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    savePortfolioData(newData);
    revalidatePath('/');
    return NextResponse.json({ message: 'Portfolio data updated successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}
