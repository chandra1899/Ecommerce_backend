const Product=require('../models/product')
const fs=require('fs')

module.exports.create=async (req,res)=>{
    try {
        // const {name,description,price,quantity,categery}=req.feilds;
        const {photo}=req.files
        console.log('in products');
        console.log(req.fields,req.files);
        let product=await Product.create(req.fields);
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.contentType=photo.type;
        product.save();
    } catch (error) {
        
    }
}

module.exports.photo=async (req,res)=>{
    try {
        console.log('i photo');
        let product=await Product.findById(req.params.id);
        res.set('Content-type',product.photo.contentType)
        return res.status(200).send(product.photo.data)
    } catch (error) {
        
    }
}