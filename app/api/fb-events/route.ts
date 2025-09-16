import { NextRequest, NextResponse } from 'next/server';
import { sendFacebookConversionEvent } from '@/lib/facebook-conversions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, userData } = body;

    // Проверка обязательных полей
    if (!event || !event.event_name) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Отправка события в Facebook
    const result = await sendFacebookConversionEvent(event, userData);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Facebook Conversion API error:', error);
    return NextResponse.json(
      { error: 'Failed to send conversion event' },
      { status: 500 }
    );
  }
}

// Опциональный GET метод для проверки работоспособности
export async function GET() {
  return NextResponse.json({ 
    status: 'Facebook Conversions API endpoint is ready',
    timestamp: new Date().toISOString()
  });
}