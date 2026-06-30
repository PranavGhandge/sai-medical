import Category from "../models/category.model";

class CategoryService {
    async createCategory(category: any) {
        try {
            const checkexist = await Category.findOne({ where: { name: category.name } })

            if (checkexist) {
                throw new Error("Category Already Exist")
            }

            const categories = await Category.create({ ...category })

            return {
                message: "Category Created Successfully",
                id: categories.id
            }
        } catch (error) {
            throw error
        }
    }
}

export default new CategoryService();