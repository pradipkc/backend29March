const express = require('express')
const { addProduct, getAllProduct, getProductsByCategory, updateProduct, deleteProduct } = require('../controller/productController')
const upload = require('../utils/fileUpload')
const router = express.Router()

router.post('/addproduct', upload.single('product_image'), authorize, addProduct)
router.get('/getallproduct', getAllProduct)
router.get('/getproductsbycategory/:id', getProductsByCategory)
router.put('/updateproduct/:id', authorize, updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)


//  product detail
// delete product
module.exports = router