'use client'
import { log } from 'console';
import './style.css'
import React, { useState } from 'react';
import { useParams } from 'next/navigation'
import '../../../DoctorSignUp/signup.css'


interface SubscriptionOptionProps {
  i: number;
  cost: number;
  grad: string;
  pay_type: string;
  handlePayment: (cost: number, pay_type: string) => void;
}

const SubscriptionOption = ({ i, cost, grad, pay_type,handlePayment }: SubscriptionOptionProps) => (
  <article
  style={{
    '--i': i,
    '--cost': cost,
    '--grad': grad,
  } as React.CSSProperties}
>
    <header>
      <h3 data-name={pay_type}></h3>
    </header>
    <section>
      <button onClick={() => handlePayment(cost, pay_type)}>Sign up</button>
    </section>
  </article>
);


export default function Page(): React.JSX.Element {
  const [paymentStatus, setPaymentStatus] = useState('');

  const searchParams = useParams()

  const handlePayment = async (cost: number, pay_type: string) => {
    try {
      const response = await fetch(`http://localhost:3003/flouci/payment/${searchParams.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cost, pay_type }),
      });


      const data = await response.json();



      if (data.success) {

        const paymentId = data.link.payment_id;
        const link = data.link.link
        localStorage.setItem('payment_id', paymentId);
        window.location.href = link

        // Now use the verify_payment API
        const verifyResponse = await fetch(`http://localhost:3003/flouci/payment/${paymentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          console.log(verifyData);

          setPaymentStatus('success');
        } else {
          setPaymentStatus('fail');

        }
      } else {
        setPaymentStatus('fail');
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred while processing payment:', error);
    }
  };

  const subscriptionData = [
    { pay_type: 'monthly', amount: 9545, grad: '#0fcf7b, #0c9f30' },
    { pay_type: 'quarterly', amount: 191111, grad: '#f7256e, #cc0c48' },
    { pay_type: 'annual', amount: 29000, grad: '#f7ea1f, #f87d2c' },
  ];

  return (


    <body style={{ '--n':subscriptionData.length}as React.CSSProperties}>
    {subscriptionData.map((c, i) => (
      <SubscriptionOption
        key={i}
        i={i}
        cost={c.amount}
        grad={c.grad}
        pay_type={c.pay_type}
        handlePayment={handlePayment}
      />
    ))}

              {paymentStatus === 'success' && (
                <div className="alert alert-success">Payment successful!</div>
                )}
              {paymentStatus === 'fail' && (
                <div className="alert alert-danger">Payment failed.</div>
                )}

                </body>
     
  )
}






