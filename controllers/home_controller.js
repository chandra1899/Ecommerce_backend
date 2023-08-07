
module.exports.home=async (req,res)=>{
    try {
    return res.status(200).json('api')
        
    } catch (err) {
        return res.status(401).json({msg:"error in sending post",error:err})        
    }

}