import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

type PaymentHistoryProps = {
  userId: string;
};

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ userId }) => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const db = getFirestore();
      // Ищем платежи, привязанные к этому пользователю (если вы записывали userId при создании заказа)
      const q = query(collection(db, "payments"), where("userId", "==", userId));
      
      const querySnapshot = await getDocs(q);
      const paymentsList = querySnapshot.docs.map(doc => doc.data());
      setPayments(paymentsList);
    };

    fetchPayments();
  }, [userId]);

  return (
    <div>
      <h3>История ваших оплат:</h3>
      <ul>
        {payments.map((p: any) => (
          <li key={p.orderId}>
            Заказ #{p.orderId} — {p.amount} {p.currency} ({p.status === 'success' ? 'Оплачено' : 'Ошибка'})
          </li>
        ))}
      </ul>
    </div>
  );
};