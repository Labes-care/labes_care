const router = require("express").Router();

const paymentcontroller = require ('../controller/payment/paymen')

router.post('/payment/:id',paymentcontroller.add)
router.post('/payment/:id',paymentcontroller.Verify)


module.exports = router