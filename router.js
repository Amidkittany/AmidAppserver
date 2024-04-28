const { Router } = require("express");
const { createProduct, getProductCategories, deleteProducte } = require("../controllers/product.controller");

const productRouter = Router() ; 

productRouter.post('/createProduct' , createProduct )
productRouter.get('/getProductCategories' , getProductCategories )
productRouter.delete('/deleteProducte' , deleteProducte )

module.exports = productRouter