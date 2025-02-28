//Controlador de la empresa
'use strict'

import ExcelJs from 'exceljs'
import Company from './company.model.js'

//Crear una empresa
export const createCompany = async(req, res) => {
    try{
        let data = req.body
        let company = new Company(data)
        await company.save()
        await generateExcel()
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

//Filtros

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

//Obtener empresas por trayectoria
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

//Obtener empresas por categoria
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

//Obtener empresas de la A a la Z
export const getCompaniesByAZ = async(req, res) => {
    try{
        let { limit = 10, skip = 0} = req.query
        let companies = await Company.find()
            .skip(skip)
            .limit(limit)
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

//Obtener empresas de la Z a la A
export const getCompaniesByZA = async(req, res) => {
    try{
        let { limit = 10, skip = 0} = req.query
        let companies = await Company.find()
            .skip(skip)
            .limit(limit)
            .sort({name: -1})

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

//Generación de Reportes

//Generar libro de excel 
export const generateExcel = async() => {
    try{
        //Llamar
        let companies = await Company.find()

        //Crear libro
        const workbook = new ExcelJs.Workbook()
        workbook.creator = 'Company'
        workbook.created = new Date()
        
        //Crear hoja
        const worksheet = workbook.addWorksheet('Companies')

        //Columnas
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Prestige', key: 'prestige', width: 50 },
            { header: 'Trajectory', key: 'trajectory', width: 25 },
            { header: 'Category', key: 'category', width: 50 }
        ]

        //Filas
        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                prestige: company.prestige,
                trajectory: company.trajectory,
                category: company.category
            })
        })

        //Crear archivo
        await workbook.xlsx.writeFile('./libro/excel.xlsx')
        console.log('Book updated')
    }catch(err){
        console.error(err)
    }
}