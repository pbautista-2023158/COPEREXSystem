import Admin from '../admin/admin.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

const adminPorDefecto = async() => {
    try{
        let adminExistente = await Admin.countDocuments()
        if (!adminExistente){
            let passwordEncrypt = await encrypt("Contraseña123*", 13)
            let agregarAdmin = new Admin(
                {
                    name: "Pedro Sergio Javier",
                    surname: "Bautista Matheu",
                    username: "admindefault",
                    email: "correoinstitucional@kinal.edu.gt",
                    password: passwordEncrypt,
                    phone: "4967-0135"
                }
            ) 
            await agregarAdmin.save()
            console.log("Default admin added")
        }
    }catch(err){
        console.error("General error when adding the default admin", err)
    }
} 

adminPorDefecto()

/* export const register = async(req, res) => {
    try{
        let data = req.body
        let admin = new Admin(data)
        admin.password = await encrypt(admin.password)
        await admin.save()
        return res.send({message: `Registered succesfully, can be logged with username: ${admin.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with admin registration', err})
    }
} */

export const login = async(req, res) => {
    try{
        let { adminLoggin, password } = req.body
        let admin = await Admin.findOne(
            {
                $or: [
                    { email: adminLoggin },
                    { username: adminLoggin }
                ]
            }
        )
        console.log(admin)
        
        if(admin && await checkPassword(admin.password, password)){
            let loggedAdmin = {
                uid: admin._id,
                username: admin.username,
                name: admin.name
            }
            let token = await generateJwt(loggedAdmin)
            return res.send(
                {
                    message: `Welcome ${admin.name}`,
                    loggedAdmin,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}