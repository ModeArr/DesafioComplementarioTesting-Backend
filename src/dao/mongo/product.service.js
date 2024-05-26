import productsModel from '../../models/products.model.js';

class ProductService {

    async getProducts(page, limit, sort, query, url) {
        try {
            const options = {
                page,
                limit,
                customLabels: {
                    docs: 'payload'
                },
                lean: true
            }
            if (sort){
                options.sort = { price: sort }
            }

           return await productsModel.paginate(query, options)
           .then((res) => { 
            let prevPageLink, nextPageLink
            if (res.hasPrevPage){
                url.searchParams.set('page', res.prevPage)
                prevPageLink = url.href
            }
            
            if (res.hasNextPage){
                url.searchParams.set('page', res.nextPage)
                nextPageLink = url.href
            }

            return {
                payload: res.payload,
                totalPages: res.totalPages,
                prevPage: res.prevPage,
                nextPage: res.nextPage,
                page: res.page,
                hasPrevPage: res.hasPrevPage,
                hasNextPage: res.hasNextPage,
                prevLink: prevPageLink ??  null,
                nextLink: nextPageLink ??  null
                } 
           })
           .catch((err) => {
            throw new Error(err)
             })
        } catch (error) {
            throw Error(error)
        }  
    }

    async addProduct(product) {
        try {   
            if (!product.title.trim()){
                throw new Error('Ingresa un titulo de producto correcto')
            }
    
            if (!product.description.trim()){
                throw new Error('Ingresa una descripcion de producto correcto')
            }
    
            if (product.price <= 0  || typeof product.price != 'number'){
                throw new Error('Ingresa un numero de precio correcto')
            }

            if (!product.thumbnail.length){
                throw new Error('Ingresa un thumbnail de producto correcto')
            }
    
            if (!product.code.trim()){
                throw new Error('Ingresa un codigo de producto correcto')
            }
    
           const codeDuplicated = await productsModel.findOne({
            code: product.code
           })
            if (codeDuplicated && Object.keys(codeDuplicated).length !== 0){
                throw new Error('El codigo esta duplicado')
            }
            
            if (product.stock <= 0 || typeof product.stock != 'number') {
                throw new Error('Ingresa un numero mayor a cero para el stock')
            }

            if (!product.category.trim()) {
                throw new Error('Ingresa una categoria correctamente')
            }
            
            if (!typeof product.status == "boolean") {
                throw new Error('Ingresa un valor booleano correcto si esta disponible o no a status')
            }

            if (!product.owner.trim()){
                throw new Error('Ingresa un owner valido')
            }

            let result = await productsModel.create(product).then((res) => {
                return res
            }).catch((err) => {
                throw new Error(err)
            })
            return result
        } catch (error) {
            throw Error(error)
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.find({_id: id}).lean()
            .then((product) => {
                if (!product) {
                    throw new Error('Producto no encontrado')
                }
                return product
            }).catch((err) => {
                throw new Error(err)
            })

            return product
        } catch (error) {
            throw Error(error)
        }
    }
    async updateProduct(id, field, edit){
        try {
            switch (field){
                case "title":
                    if (!edit.trim()){
                        throw new Error('Ingresa un titulo de producto correcto')
                    } else {
                        break
                    }
                case "description":
                    if (!edit.trim()){
                        throw new Error('Ingresa una descripcion de producto correcto')
                    } else {
                        break
                    }
                case "price":
                    if (edit <= 0  || typeof edit != 'number'){
                        throw new Error('Ingresa un numero de precio correcto')
                    } else {
                        break
                    }
                case "thumbnail":
                    if (!edit.length){
                        throw new Error('Ingresa un thumbnail de producto correcto')
                    } else {
                        break
                    }
                case "code":
                    let codeDuplicated = await productsModel.findOne({
                        code: edit
                       })
                    if (!edit.trim()){
                        throw new Error('Ingresa un codigo de producto correcto')
                    } else if (codeDuplicated){
                        throw new Error('El codigo esta duplicado, intenta otro')
                    } else {
                        break
                    }
                case "stock":
                    if (edit <= 0 || typeof edit != 'number') {
                        throw new Error('Ingresa un numero mayor a cero para el stock')
                    } else {
                        break
                    }
                default:
                    throw new Error('Ingresa un campo a editar correcto')
            }
            const editProduct = await productsModel.findByIdAndUpdate(id,
            { [field]: edit },
            {new: true} )
            .then((res) => {
                return res
            })
            .catch((error) =>{
                throw Error(error)
            })
            return editProduct
        } catch (error) {
            throw Error(error)
        }
    }

    async updateProductStock(pId, quantity){
        try {
            const updatedProduct =  productsModel.findOneAndUpdate({_id: pId}, {$set : {
                'stock': quantity
            }})
            .then((res) => {
                return res
            })
            .catch((error) => {
                throw Error(error)
            })
            
            return updatedProduct
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteProduct(id){
        try {
            const deletedProduct = productsModel.findByIdAndDelete(id)
            .then( (res) => {
                if (!res){
                    throw new Error(`No se pudo borrar el id: ${id}`)
                }
                return res 
            })
            .catch( (error) => {
                throw Error(error)
            })
            return deletedProduct
        } catch (error) {
            throw Error(error)
        }
        
    }

}

export default ProductService