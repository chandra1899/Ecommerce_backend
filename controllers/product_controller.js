const Product=require('../models/product')
const fs=require('fs')
const formidable=require('formidable')

module.exports.create=async (req,res)=>{
    try {
        // const {name,description,price,quantity,categery}=req.feilds;
        
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if(err){
                console.log(err);
                return res.status(500).json(err);
            }
            console.log('in products');
            console.log(fields, files);
            const {photo}=files
            console.log(fields,files);
            let product=await Product.create(fields);
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
            product.save();
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
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

module.exports.getParticularProducts=async (req,res)=>{
    try {
        let belongsTo=req.query.belongsTo;
        let products=await Product.find({belongsTo:belongsTo}).select('-photo').sort('-createdAt')
        return res.status(200).json({products});

    } catch (error) {
        
    }
}