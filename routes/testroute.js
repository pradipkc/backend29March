const express = require('express')
const { testFunction } = require('../controller/textController')
const router = express.Router()

router.get('/hello', testFunction )
module.exports = router