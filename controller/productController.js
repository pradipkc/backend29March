const Product = require('../model/ProductModel')

// add product
exports.addproduct = async(req, res) => {
    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        product_image: req.file.path,
        category: req.body.category

    })
    productToAdd = await productToAdd.save()
    if(!productToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToAdd)
}

// to get all products
exports.getAllProduct = async(req, res) => {
    let products = await Product.find().populate('category', 'category_name')
    if(!products){
        return res.status(400).json({error:"something went wrong"})

    }
    res.send(products)
}

// to get products of a category
exports.getProductsByCategory = async(req, res) => {
    let products = await Product.find({category: req.params.id}).populate('category', 'category_name')
    if(!products){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(products)
}

// to update product
exports.updateProduct = async (req, res) => {
    let productToUpdate = await Product.findByIdAndUpdate(
        req.params.id,
        req.file ?
        {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            count_in_stock: req.body.count_in_stock,
            product_image: req.file.path, 
            category: req.body.category,
            rating: req.body.rating
        }:{
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            count_in_stock: req.body.count_in_stock, 
            category: req.body.category,
            rating: req.body.rating
        },
        {new:true}
    )
    if(!productToUpdate){
        return res.status(400).json({error:"Something went wrong"})

    }
    res.send(productToUpdate)
}

// to delete product

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(productToDelete=>{
        if(!productToDelete){
            return res.status(400).json({error:"product not found"})
        }
        res.send({message:"Product delete successfully"})
    })
    .catch(err=>res.status(400).json({error:err.message}))
}