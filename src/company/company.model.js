//Modelo de la empresa
import { Schema, model } from 'mongoose'

const companySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [35, `Can't be overcome 35 characters`],
            required: [true, 'Company name is required']
        },
        prestige: {
            type: String, 
            maxLength: [150, `Can't be overcome 150 characters`],
            required: [true, 'Prestige is required']
        },
        trajectory: {
            type: Number,
            required: [true, 'Trajectory years is required']
        },
        category: {
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: [true, 'Category is required']            
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model ('Company', companySchema)