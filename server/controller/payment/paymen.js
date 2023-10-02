const Payment = require ('../../model/payment')
const axios = require ('axios')

module.exports = {

    add : async(req,res)=>{
        const url = 'https://developers.flouci.com/api/generate_payment'
        const payload = {
            "app_token": "33bae034-d627-4c9c-a1db-614b4031cbc3", 
            "app_secret": process.env.FLOUCI_SECRET,
            "amount": req.body.cost,
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": `http://localhost:3000/doctorPayment/success/${req.params.id}/`,
            "fail_link": "http://localhost:3000/doctorPayment/fail",
            "developer_tracking_id": "471f5e36-a4f1-4c8e-9877-5e6ae7cd99fb"
        }
        try {
            const result = await axios.post(url, payload)
            const paymentLink = result.data.result
    
            res.json({ success: true, link: paymentLink ,payment_id: result.data.result.id  })

//////////////////////////////
const doctorId = req.params.id;
const  pay_type  = req.body.pay_type;

const expirationDate = new Date();
if (pay_type === 'monthly') {
  expirationDate.setDate(expirationDate.getDate() + 30);
} else if (pay_type === 'quarterly') {
  expirationDate.setDate(expirationDate.getDate() + 90);
} else if (pay_type === 'annual') {
  expirationDate.setDate(expirationDate.getDate() + 365);
}

const newPayment = await Payment.create({
    amount: req.body.cost,
    paymentDate: new Date(),
    expirationDate: expirationDate,
    pay_type: pay_type,
    doctors_iddoctors: doctorId,
})
//////////////////


        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, error: 'Failed to generate payment link.' })
        }
    },

    
    Verify: async (req, res) => {
        const id = req.params.id;

        try {
            const response = await axios.get(`https://developers.flouci.com/api/verify_payment/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'apppublic': '33bae034-d627-4c9c-a1db-614b4031cbc3',
                    'appsecret': process.env.FLOUCI_SECRET
                }
            });
            console.log(response.data);
res.json(response.data,{doctorId: response.data.doctors_iddoctors}); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while verifying payment.' });
        }
    }
}