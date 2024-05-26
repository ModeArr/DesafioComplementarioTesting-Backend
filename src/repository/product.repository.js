import ProductDTO from "../dto/product.dto.js"

export default class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async (page, limit, sort, query, url) => {
        return this.dao.getProducts(page, limit, sort, query, url)
    }

    addProduct = async (product) => {
        let newProduct = new ProductDTO(product)
        return this.dao.addProduct(newProduct)
    }

    getProductById = async (id) => {
        return this.dao.getProductById(id)
    }

    updateProduct = async (id, field, edit) => {
        return this.dao.updateProduct(id, field, edit)
    }

    deleteProduct = async (id) => {
        return this.dao.deleteProduct(id)
    }
}