import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Убедитесь, что здесь используются ПРАВИЛЬНЫЕ ключи (как на вашем скриншоте админки)
const PUBLIC_KEY = 'sandbox_i74283172367';
const PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY || 'sandbox_ukpgGifC4PwSbZx0qAzjA1oB9NzcuYei5dzpN0kp';

export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса от фронтенда корзины
    const { amount, userId, orderId } = await request.json();

    if (!amount || !userId || !orderId) {
      return new NextResponse('Missing amount, userId or orderId', { status: 400 });
    }

    // Формируем объект параметров платежа для LiqPay
const jsonObject = {
      public_key: PUBLIC_KEY,
      version: 3,
      action: 'pay',
      amount: amount,
      currency: 'UAH', // LiqPay в песочнице стабильнее всего работает с UAH
      description: `Оплата заказа №${orderId} для пользователя ${userId}`,
      
      // 2. ПОДСТАВЛЯЕМ ID документа из Firestore. 
      // Именно его LiqPay вернет в вебхуке как paymentInfo.order_id
      order_id: orderId, 
      
      sandbox: 1, // Обязательно 1 для тестовых ключей sandbox_
      
      // Передаем кастомные данные, если понадобятся в вебхуке
      dae: JSON.stringify({ userId: userId }), 
      
      // URL твоего вебхука (куда LiqPay пришлет результат)
      result_url: `http://localhost:3000/order-success?orderId=${orderId}`
    };

    // 1. Кодируем параметры в Base64
    const jsonString = JSON.stringify(jsonObject);
    const data = Buffer.from(jsonString).toString('base64');


   

    // 2. Создаем подпись по правилам LiqPay: base64(sha1(private_key + data + private_key))
    const signString = PRIVATE_KEY + data + PRIVATE_KEY;
    const signature = crypto.createHash('sha1').update(signString).digest('base64');

    // Возвращаем данные фронтенду, чтобы он засабмитил форму
   const response = NextResponse.json({ data, signature });
response.headers.set('Access-Control-Allow-Origin', '*');
response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

return response;
  } catch (error) {
    console.error('Checkout session creation error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}