const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const router = express.Router()

router.post('/addCategory',addCategory)
router.get('/getallCategories', getAllCategories)
router.get("/getCategoryDetails/:id", getCategoryDetails)
router.put('/updateCategory/:id', updateCategory)
router.delete('/deleteCategory/:id', deleteCategory)

module.exports = router