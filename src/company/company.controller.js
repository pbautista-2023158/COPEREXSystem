//Controlador de la empresa
'use strict'

import Company from './company.model.js'

//Crear una empresa
export const createCompany = async(req, res) => {
    try{
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send(
            {
                sucess: true,
                message: `${company.name} saved successfully`
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding company',
                err
            }
        )
    }
}
 
//Actualizar una empresa
export const updateCompany = async(req, res) => {
    try{
        let { id } = req.params
        let data = req.body
        let updateCompany = await Company.findByIdAndUpdate(
            id,
            data, 
            { new: true }
        ) 

        if(!updateCompany){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Company not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Company updated',
                updateCompany
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when update company',
                err
            }
        )
    }
}

export const deleteCompany = async(req, res) => {
    try{
        let { id } = req.params
        let deleteCompany = await Company.findByIdAndDelete(id)

        if(!deleteCompany){
            return res.status(404)(
                {
                    success: false,
                    message: 'Company not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Company deleted',
                deleteCompany
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete company',
                err
            }
        )
    }
}

//FILTROS   

//Obtener empresas
export const getCompanies = async(req, res) => {
    try{
        let { limit = 10, skip = 0} = req.query
        let companies = await Company.find()
            .skip(skip)
            .limit(limit)

        if(!companies){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found',
                companies
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete company',
                err
            }
        )
    }
}

export const getCompaniesByTrajectory = async(req, res) => {
    try{
        const { trajectory, limit = 10, skip = 0} = req.params
        const companies = await Company.find({trajectory})
            .skip(skip)
            .limit(limit)
        
        if(companies.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found',
                companies
            }
        )        
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const getCompaniesByCategory = async(req, res) => {
    try{
        const { category, limit = 10, skip = 0} = req.params
        const companies = await Company.find({category: {$regex: category, $options: 'i'}})
            .skip(skip)
            .limit(limit)

        if(companies.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found',
                companies
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const getCompaniesByAZ = async(req, res) => {
    try{
        let companies = await Company.find()
            .sort({name: 1})

            if(companies.length === 0){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Companies not found'
                    }
                )
            }
            return res.send(
                {
                    success: true,
                    message: 'Companies found',
                    companies
                }
            )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}