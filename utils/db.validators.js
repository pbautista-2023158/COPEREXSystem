import Admin from '../src/admin/admin.model.js'

export const findAdmin = async(id)=>{
    try{
        const adminExist = await Admin.findById(id)
        if(!adminExist) return false
        return adminExist
    }catch(err){
        console.error(err)
        return false
    }
}