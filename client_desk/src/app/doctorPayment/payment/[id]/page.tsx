'use client'
import { log } from 'console';
import './style.css'
import React, { useState } from 'react';
import { useParams } from 'next/navigation'
import '../../../DoctorSignUp/signup.css'



export default function Page() {
  const [paymentStatus, setPaymentStatus] = useState('');

  const searchParams = useParams()

  const handlePayment = async (amount: number, pay_type: string) => {
    try {
      const response = await fetch(`http://localhost:3003/flouci/payment/${searchParams.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, pay_type }),
      });


      const data = await response.json();



      if (data.success) {

        const paymentId = data.link.payment_id;
        const link = data.link.link
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
          console.log(verifyData.success);

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

  return (

    <div className="center-container">
      <div className="float-container">
        <div className="float-child float-child1">
          <div className="centered">
            <div className="frame">
              <figure>
                <div className="image-1"></div>
                {/* Loop for image-2 */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="image-2"></div>
                ))}
              </figure>
            </div>
          </div>
        </div>

        <div className="float-child float-child2">
          <div className="centered">
            <div className="container">
              <a className='card1' onClick={() => handlePayment(500, 'monthly')}>
                <h3>This is option 1</h3>
                <p className="small">
                  payment monthly
                </p>
                <h3>500 $</h3>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </a>

              <a className='card2' onClick={() => handlePayment(1500, 'quarterly')}>
                <h3>This is option 2</h3>
                <p className="small">
                  payment quarterly
                </p>
                <h3>1500 $</h3>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </a>

              <a className='card4' onClick={() => handlePayment(4000, 'annual')}>
                <h3>This is option 3</h3>
                <p className="small">
                  payment annual
                </p>
                <h3>4000 $</h3>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </a>

              {paymentStatus === 'success' && (
                <div className="alert alert-success">Payment successful!</div>
              )}
              {paymentStatus === 'fail' && (
                <div className="alert alert-danger">Payment failed.</div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
