let Order = require('../model/OrderModel')
let OrderItems = require('../model/OrderItems')

// place order
exports.placeOrder = async (req, res) => {
    let orderItemsIds =  await Promise.all(req.body.OrderItems.map(async orderItem=>{
        let orderItemToSave = new OrderItems({
            product: orderItem.product,
            quantity: orderItem.quantity
        })
        orderItemToSave = await orderItemToSave.save()
        if(!orderItemToSave){
            return res.status(400).json({error:"Failed to place order."})
        }
        return orderItemToSave._Id
    }))
    let individualTotal = await Promise.all(orderItemsIds.map( async items=>{
        let orderItem = await OrderItems.findById(item).populate('product','product_price')
        return OrderItem.quantity * OrderItem.product.product_price
    }))
    let total = individualTotal.reduce((accumulator, current)=> accumulator + current)

    let orderToPlace = new Order({
        orderItems: orderItemsIds,
        user: req.body.user,
        total: total,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        phone: req.body.phone
    })
    orderToPlace = await orderToPlace.save()
    if(!orderToPlace){
        return res.status(400).json({error:"Failed to place order"})
    }
    res.send(orderToPlace)
}

// to view all order
exports.getAllOrders = async (req, res)=> {
    let order =  await Order.find().populate('user', 'username').populate({path: 'orderItems', populate:{path:'product', populate:'category'}})
    if(!order){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(order)
}

// to get order details
exports.getOrderDetails = async (req, res) => {
    let order = await  Order.findById(req.params.orderId).populate('user', 'username').populate({path: 'orderItems', populate:{path:'product', populate: 'category'}})
    if(!order){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(order)
}

// to get orders of a user
exports.getOrdersOfUser = async (req, res) => {
    let order = await Order.find({user: req.params.userId}).populate('user', 'username')
    .populate({path: 'orderItems', populate:{path:'product', populate: 'category'}})
    if(!order){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(order)
}
// to update order status
exports.updateOrder = async (req, res)=> {
    let orderToUpdate = await Order.findByIdAndUpdate(req.params.order,{status:req.body.status},{new: true})
    if(!orderToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(orderToUpdate)
}

// to delete order
exports.deleteOrder = (req,res)=> {
    order.findByIdAndDelete(req.params.orderId)
    .then(order=>{
        if(!order){
            return res.status(400).json({error:"order not found"})
        }
        order.orderItems.map(orderItem=>{
            OrderItems.findByIdAndRemove(orderItem)
            .then(item=>{
                if(!item){
                    return res.status(400).json({error:"Something went wrong"})
                }
            })
        })
       re.send({message:"order delete successfully."})
    })
    .catch((error)=>{
        return res.status(400).json({error:err.message})
    })
}
/*
orderItem: [{product, quantity},{product, quantity}, {product, quantity}, {product, quantity}]
[]
*/