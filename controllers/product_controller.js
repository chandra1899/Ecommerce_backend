const Product=require('../models/product')
const fs=require('fs')
const formidable=require('formidable')

module.exports.create=async (req,res)=>{
    try {
        // const {name,description,price,quantity,categery}=req.feilds;
        
        const form =new formidable.IncomingForm(); 
        form.parse(req, async (err, fields, files) => {
            if(err){
                console.log(err);
                return res.status(500).json(err);
            }
            console.log('in products');
            console.log(fields, files);
            const {photo}=files
            let product=await Product.create({
                name:fields.name[0],
                description:fields.description[0],
                price:fields.price[0],
                categery:fields.categery[0],
                quantity:fields.quantity[0],
                starts:fields.starts[0],
                belongsTo:fields.belongsTo[0],
            });
            product.photo.data=fs.readFileSync(photo[0].filepath);
            product.photo.contentType=photo[0].mimetype;
            product.save();
            return res.status(200).json({product});
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.photo=async (req,res)=>{
    try {
        // console.log('i photo');
        let product=await Product.findById(req.params.id);
        res.set('Content-type',product.photo.contentType)
        return res.status(200).send(product.photo.data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.getParticularProducts=async (req,res)=>{
    try {
        let belongsTo=req.query.belongsTo;
        let products=await Product.find({belongsTo:belongsTo}).select('-photo')
        return res.status(200).json({products});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.getProductDetails=async (req,res)=>{
    try {
       let product=await Product.findById(req.params.id).select('-photo')
       .populate({
        path:'reviews',
        populate:{
            path:'user'
        }})
       return res.status(200).json({product});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports.getallproducts=async (req,res)=>{
    try {
        let allproducts=await Product.find({belongsTo:'product'}).select("-photo");
        return res.status(200).json({allproducts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}