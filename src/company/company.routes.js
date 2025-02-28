//Rutas de empresa
import { Router } from 'express'
import { 
    createCompany, 
    getCompanies, 
    getCompaniesByAZ, 
    getCompaniesByCategory, 
    getCompaniesByTrajectory, 
    getCompaniesByZA, 
    updateCompany } 
from './company.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { CompanyValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/', [validateJwt, CompanyValidator], createCompany)
api.put('/:id', [validateJwt, CompanyValidator], updateCompany)
api.get('/', validateJwt, getCompanies)
api.get('/category/:category', validateJwt, getCompaniesByCategory)
api.get('/trajectory/:trajectory', validateJwt, getCompaniesByTrajectory)
api.get('/AZ', validateJwt, getCompaniesByAZ)
api.get('/ZA', validateJwt, getCompaniesByZA)

export default api