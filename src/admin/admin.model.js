//Modelo de admin
import { Schema, model } from 'mongoose'

const adminSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, `Name can't be overcome 30 letters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [20, `Surname can't be overcome 20 letters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'],            
            lowercase: true,
            minLength: [5, 'Username must be 5 characters'],
            maxLength: [20, `Username can't be overcome 20 characters`]
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already taken']           
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Password can't be overcome 100 characters`]
        },   
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, `Number phone must be 8 numbers`],
            maxLength: [20, `Number phone can't be overcome 20 numbers`]
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

//Excluir datos en la respuesta
adminSchema.methods.toJSON = function(){
    const { __v, password, ...admin } = this.toObject() 
    return admin
}

//Crear y exportar el modelo
export default model('Admin', adminSchema)