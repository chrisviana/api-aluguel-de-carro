import { Router } from 'express'
import { CategoryRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()

const categoriesRepository = new CategoryRepository()

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body

    const categoryAlReadyExists = categoriesRepository.findByName(name)
    if (categoryAlReadyExists) {
        return response.status(400).json({ error: 'Caretory already exists' })
    }

    categoriesRepository.create({ name, description })
    return response.status(201).send()
})

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list()

    return response.json(all)
})

export { categoriesRoutes }