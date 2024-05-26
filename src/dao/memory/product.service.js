import { readFile, writeFile } from "fs/promises"

class ProductManager {
    constructor(path) {
        this.pathDB = path
    }

    async getProducts() {
        try {
            const allProducts = await readFile(this.pathDB)
            return JSON.parse(allProducts)
        } catch (error) {
            throw Error(error)
        }  
    }

    async addProduct(title="", description="", price=0, thumbnail=[], code="", stock=0, category="", status) {
        try {
            const allProducts = await this.getProducts()
            
            if (!title.trim()){
                throw new Error('Ingresa un titulo de producto correcto')
            }
    
            if (!description.trim()){
                throw new Error('Ingresa una descripcion de producto correcto')
            }
    
            if (price <= 0  || typeof price != 'number'){
                throw new Error('Ingresa un numero de precio correcto')
            }

            if (!thumbnail.length){
                throw new Error('Ingresa un thumbnail de producto correcto')
            }
    
            if (!code.trim()){
                throw new Error('Ingresa un codigo de producto correcto')
            }
    
           let codeDuplicated = allProducts.find(e => e.code === code)
            if (codeDuplicated){
                throw new Error('El codigo esta duplicado')
            }
            
            if (stock <= 0 || typeof stock != 'number') {
                throw new Error('Ingresa un numero mayor a cero para el stock')
            }
            console.log(typeof category)
            if (!category.trim()) {
                throw new Error('Ingresa una categoria correctamente')
            }
            
            if (!typeof variable == "boolean") {
                throw new Error('Ingresa un valor booleano correcto si esta disponible o no a status')
            }
    
            const producto = {
                title,
                description,
                price,
                thumbnail,
                stock,
                code,
                status,
                category
            }
    
            if (allProducts.length === 0) {
                producto.id = 1;
            } else {
                producto.id = allProducts.length + 1;
            }
    
           allProducts.push(producto)
           await writeFile(this.pathDB, JSON.stringify(allProducts));
           return producto
        } catch (error) {
            throw Error(error)
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const productId = products.find(e => e.id === id)
            if (!productId) {
                throw new Error('Producto no encontrado')
            } else {
                let index = products.indexOf(productId);
                return products[index]
            }
        } catch (error) {
            throw Error(error)
        }
    }
    async updateProduct(id, field, edit){
        try {
            const products = await this.getProducts()
            const product = products.find(e => e.id === id)
            const index = products.indexOf(product);
    
            switch (field){
                case "title":
                    if (!edit.trim()){
                        throw new Error('Ingresa un titulo de producto correcto')
                    } else {
                        products[index].title = edit
                        break
                    }
                case "description":
                    if (!edit.trim()){
                        throw new Error('Ingresa una descripcion de producto correcto')
                    } else {
                        products[index].description = edit
                        break
                    }
                case "price":
                    if (edit <= 0  || typeof edit != 'number'){
                        throw new Error('Ingresa un numero de precio correcto')
                    } else {
                        products[index].price = edit
                        break
                    }
                case "thumbnail":
                    if (!edit.length){
                        throw new Error('Ingresa un thumbnail de producto correcto')
                    } else {
                        products[index].thumbnail = edit
                        break
                    }
                case "code":
                    let codeDuplicated = products.find(e => e.code === edit)
                    if (!edit.trim()){
                        throw new Error('Ingresa un codigo de producto correcto')
                    } else if (codeDuplicated){
                        throw new Error('El codigo esta duplicado, intenta otro')
                    } else {
                        products[index].code = edit
                        break
                    }
                case "stock":
                    if (edit <= 0 || typeof edit != 'number') {
                        throw new Error('Ingresa un numero mayor a cero para el stock')
                    } else {
                        products[index].stock = edit
                        break
                    }
                default:
                    throw new Error('Ingresa un campo a editar correcto')
            }
            await writeFile(this.pathDB, JSON.stringify(products));
            return `Se edito el ${field} del producto con id ${id}` 
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const productId = products.find(e => e.id === id)
            if (!productId) {
                throw new Error('Producto no encontrado')
            } else {
                let index = products.indexOf(productId);
                products.splice(index, 1)
                await writeFile(this.pathDB, JSON.stringify(products));
                console.log("Se borro correctamente el producto")
                return `Se borro correctamente el producto con id: ${id}` 
            }
        } catch (error) {
            throw Error(error)
        }
        
    }

}

export default ProductManager