import express from 'express';
import { getProductById, getProducts,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts } from '../controllers/productControllers.js';
// import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/top').get(getTopProducts);
// same as above
// router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct);
router.route('/:id/reviews').post(protect,createProductReview);


// router.get('/',asyncHandler(async(req,res)=>{

//     const Products = await Product.find({});
//     // if(Products){
//     res.json(Products);
//     // }
//     // else{
//     //     res.status(401);
//     //     throw new Error("Not authorized");
//     // }
// })
// );

// router.get('/:id', asyncHandler(async(req,res)=>{

//     const product = await Product.findById(req.params.id);
//     if(product){
//         res.json(product);
//     }
//     else{
//         res.status(404);
//         throw new Error("product not found");
//     }
//     res.json(product);
// })
// );

export default router;