import { Router } from 'express'
import { CategoryRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategorySerivce'

const categoriesRoutes = Router()

const categoriesRepository = new CategoryRepository()

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body

    const createCategoryService = new CreateCategoryService(categoriesRepository)
    createCategoryService.execute({ name, description })
    return response.status(201).send()
})

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list()

    return response.json(all)
})

export { categoriesRoutes }