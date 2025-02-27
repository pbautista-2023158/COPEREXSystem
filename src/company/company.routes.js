import { Router } from 'express'
import { 
    createCompany, 
    deleteCompany, 
    getCompanies, 
    getCompaniesByAZ, 
    getCompaniesByCategory, 
    getCompaniesByTrajectory, 
    updateCompany } 
from './company.controller.js'

const api = Router()

api.post('/', createCompany)
api.put('/:id', updateCompany)
api.delete('/:id', deleteCompany)

api.get('/', getCompanies)
api.get('/category/:category', getCompaniesByCategory)
api.get('/trajectory/:trajectory', getCompaniesByTrajectory)
api.get('/AZ', getCompaniesByAZ)

export default api