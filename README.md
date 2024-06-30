#### Nombre: Modesto Arreola

#### Institucion: Coderhouse

#### Curso: BackEnd

#### Comision: 50040

#### Profesor: Rabindranath Ferreira Villamizar

#### Tutor: Allan Reynoso Naranjo

#### Desafio Complementario de Testing

#### Crear testing basico par enteder en genral el uso de testing. Se creo el testing basico de Cart, Products y Users; esto con Jest y SuperTest.

---
## Iniciar proyecto
Iniciar el servidor primero:
´´´
npm run start:dev
´´´

Iniciar el testing:
´´´
npm run test
´´´

## Links de vistas

[Vista de todos los productos con paginacion](http://localhost:8080/products)
[Vista de Carrito predeterminado](http://localhost:8080/carts/65df75400b81101bd1f5099d)
[Vista Productos en Tiempo Real](http://localhost:8080/realtimeproducts)
[Chat en tiempo real](http://localhost:8080/chat)
[Login](http://localhost:8080/login)
[Registro](http://localhost:8080/register)

Admin user:
adminCoder@coder.com
123

## Producto ejemplo para subir
```JSON
  {
    "title": "Tomate",
    "description": "El tomate es rico en minerales esenciales, que nos ayudan a sentirnos fuertes y con energía.",
    "price": 587,
    "thumbnail": [
      "https://firebasestorage.googleapis.com/v0/b/tienda-mastergym.appspot.com/o/Prouctmanager%2Ftomate.jpeg?alt=media&token=80320653-1e2b-41df-b737-02cb2996ac9e"
    ],
    "stock": 98,
    "code": "578921",
    "status": true,
    "category": "Verdura",
  }
```
## Cosas a realizadas



---
## Cosas ya hechas 

### Obtener productos con formato de paginacion
#### Para obtener el siguiente formato de paginacion:
 
```JSON
{
    "status":"success/error",
    "payload": "Resultado de los productos solicitados",
    "totalPages": "Total de páginas",
    "prevPage": "Página anterior",
    "nextPage": "Página siguiente",
    "page": "Página actual",
    "hasPrevPage": "Indicador para saber si la página previa existe",
    "hasNextPage": "Indicador para saber si la página siguiente existe",
    "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
    "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)"
}
```
#### se realizo la instalacion de mongoose-paginate-v2 para realizar la paginacion, para poder obtener esta respuesta se modifco la funcion del manager getProducts(), ahora esta recibira getProducts(page, limit, sort, query, url), esto para poder realizar todo el manejo de la respuesta por medio de productsModel.paginate. Primero se arma el arreglo options para el .paginate() este incluye el page(la pagina actual), limit(el limite de productos por pagina), customLabels ( para transformar el datoq ue entrega pagina docs y que lo mande como payload), lean: true(mandar el arreglo como JSON), se checa si se recibe un sort en el endpoint y se agrega a option para hacer un sort por precio. Se manda productsModel.paginate(query, options) para hacer el paginate el query viene del endpoint e indica si es que proviene alguna query de buscqueda desde el los querys del endpoint. Asi como se  recibe un url este un obejto usando la libreria URL el cual permite recibir el url y modificar tanto sus params como su todas sus partes. Es asi que en el then() del paginate se realiza el modeladop de la respuesta, se checa si se tiene PrevPage o NextPage y se modifican los searchParams del URL para luego poder agregarlos a las respuestas si es que no se tiene se regresa un null

### Carrito nuevas features
#### 


### Conectar Mongoose con MongoDB Atlas
#### Se uso en app.js mongoose.connect para por medio de un url proporcionado por el servicio web de MongoDB Atlas conetarnos a las colecciones de los servicios que vamos usar, por medio dbName se especifica la base de datos en este caso "ecommerce" 

### Creacion de modelo de datos Mongoose
#### En la carpeta dao se agrego la carpeta "models" en ella se agregaron los modelos de la 3 colecciones que se van a usar para el proyecto (products, messages y carts), ahi mismo se indica la coleccion a la que va dirigida en la base de datos.

## Products DB Manager
### getProducts()
#### Para esta funcion se uso la funcion .find({}) sobre el products model para recibir todos los documentos de la coleccion, y luego .lean() para recibir un objeto JSON directamente.

### AddProduct()
#### En esta funcion para agregar un producto a la base de datos se dejaron las validaciones ya hechas, solo se modifico la parte de codeDuplicated para encontarar mediante .findOne sobre la DB para encontar algun otro producto con ese codigo. Ya validado los datos se crea el objeto y se manda mediante un .create({producto})

### getProductById(id)
#### Se realizo un simple .find({_id: id}) sobre el modelo para encontrarlo mediante el id.

### updateProduct(id, field, edit)
#### Se realizaron las mismas validacionas ahora con un switch, luego se hizo un .findByIdAndUpdate() el cual busca un id unico y luego lo actualiza mediante pasar el objeto de propiedades a editar en este caso el "field" el campo a editar y el "edit" el edit de la propiedad.

### deleteProduct(id)
#### Para este funcion se realizo un .findByIdAndDelete() para encontrar el id proporcionado y borrarlo de la base de dato.

## Carts DB Manager

### getCarts()
#### Se realizo un .find({}) sobre el modelo de cartModel para obtener todos los articulos, tambien se realizo un .lean() para obtener un objeto JSON

### addCart()
#### Se realizo un .create({products[]}) para agregar un nuevo cart a la coleccion

### getCartProducts(id)
#### Se ralizo un .findById(id) para enocntrar el carrito deseado y luego regresar sus productos, se uso .lean para regresar un JSON limpio.

### addProductToCart(idCart, idProduct)
#### Se realizo un findById(idCart) en cart esto para poder verificar que el carrito si existe. Se tambien se guardo en "productExist" .find() donde se busque el idCart y un $elemMatch para checar si el id del producto es igual a alguno dentro de products. Se checa si productExist no existe para hacer un findByIdAndUpdate() y dentro se hace un $push de objeto del producto con uno de quantity y si este no existe se hace findOneAndUpdate() donde buscamos un idCart que tenga dentro de Products el idProduct y usamos $inc sobre el produicto seleccionado.

## Messages DB Manager

### getAllMessages()
#### Se realizo un .find({}) para obtener todos los documentos de la coleccion y luego se ralizo .lean() para recibirlos como JSON

### addMessage(message, user)
#### Se realizo un .create() para crear un documento con el mesaje y el usuario en la coleccion de messages

## Messages Routes

### router.get("/")
#### Se realizo un getAllMessages() y se regreso el json de los mensajes

### router.post("/")
####

### Agrego Handlebars
#### Se agrego Handlebars meidante el handlebars.engine() con la libreria express-handlebars, tambien se agregaron las viwews y el layout Index y realtimeproducts. Se hizo una route para podre mandar hacer render de las dos vistas y asi mismo pedir ProductManager para poder obtener los productos y que estos endpoints los retornen

### Ver todos los productos con Handlebars
#### Para esto sobre las dos views se hizo un template para mostrar una lista con los articulos recibidos para mostrarlos se hizo {{#each products}} para poder hacer un tipo map de todos los productos que vienen en array de objetos dado.

### Agrego Socket.io
#### Se agrego la libreria de Socket Io asi como el link en la view dde realtimeproducts.handlebars, para incializar el server de expres se hizo la declracion de io = require('socket.io')(server) esto sobre el server en donde tenemos declarado nuestro listen del server de express.

### Agregar emmit en un POST y DELETE express
#### Para agregar un emmit en un post se uso app.set("io",  io) para poder obtener io, luego sobre el mismo endpoint se obtuvo io mediante una peticion "io = req.app.get('io');" esto permite poder usarlo dentro del mismo POST solo haciendo io.emit('product created', result), result siendo lo retornado en este caso el producto que fue subido. En el caso del DELETE se hizo el emmit solo se le retorno el id que ya habia sido dado io.emit('product deleted', id)

### Agregar .on para agregar y borrar en el Front
#### para poder recibir la respuesta para borrar en el front se realizo primero la obtencion de io() declarandolo sobre socket para tener socket.on y poder cachar la respuesta, para hacer esto se tiene una lista de articulos articleList que es donde estan todo los articulos mostrados cada uno con su respectivo id = id del producto, para poder agregar un producto primero se hacer un string template articleAdd donde muestre los datos del producto y se usa getElementById("articleList") para obtener donde esta la lista de articulos e .insertAdjacentHTML('beforeend', articleAdd) para agregar al final nuestro template convertido en HTML. Para delete se uso getElementById para obtener el elemento pero mediante el id del producto que se retorna luego solo se uso .remove() para removerlo. 

### EXTRA: Se agrego Tailwind
#### Tailwind es una de las mejor es librerias para hace un front simple en css sin necesidad de hacer muchos  estilos y obteniendo resultados muy buenos con poco desarollo y en lo personal ya me acostumbre mucho a usarlo no importa donde.

## Products
### getProducts()
#### Esta funcion permite obtener todos los productos por medio de una promise del archivo products.json mediante la libreria fs/promises con la funcion fs.readFile.

### addProduct()
#### Esta funcion permite agregar un producto al al archivo JSON mediante una serie de parametros(title, description, price, thumbnail, code, stock, status, category), se tiene que validar que cada uno se ingrese correctamente. Para esto se realizo una condicional por paramentro para verificar que esta no este vacia y sea su tipo de dato. Así también se agrego un incrementador de id para poder guardarlos con un id para su identifiacion. En una de las verificaciones del code se uso FIND para poder verficiar que no se este repitiendo en ningun producto el code. Así también se uso fs.writeFile para escribir sobre el archivo JSON todo esto asincronamente

### getProductById(id)
#### Esta funcion permite encontrar un producto por su id, para esto se uso un simple FIND para encontrar el producto que tiene el id buscado y luego un FINDINDEX para el contar la posicion de ese producto en el un array de objetos traido desde el archivo JSON usando 

### updateProduct(id, field, edit)
#### Esta funcion modifica un producto del archivo json, esto mediante traer todos los productos del arhivo luego usar FIND para encontrar el archivo que se quiere modificar para luego tener su INDEXOF para luego validar y usar su index para modificar el array de productos traidos para luego usar fs.writeFile para escribirlo de manera asicrona. Se uso un switch para checar cual es el dato que se quiere modificar y validar que sea correcto de lo contrario tira un error.

### deleteProduct(id)
#### Esta funcion permite borrar un producto con id, esto se logro primero trayendo todos los productos con getProducts() luego usando find para encontrar el id y validar que exista, luego obtenemos el INDEXOF de este producto dentro del array traido para luego usar splice para retirarlo para luego usar fs.writeFileSync para ingresar el array a la base de datos.

### router.get("/")
#### Este endpoint permite obtener por medio del cosntructor y getProducts() todo el json que esta en la base de datos. Tambien este acepta la query ?limit="n" la cual permite por medio de un slice(indexinicio, indexFinal) solo mostrar el array de objeto de "n" numero de cantidad.

### router.get("/:pid")
#### Este endpoint permite retornar el objeto de id(:pid) que se quiera obtener. Esto se logro mediante find() para encontrar el objeto con :pid , para luego localizar el index con el indexOF() para poder retornar el producto con su indice.

### router.post("/")
#### Este endpoint permite agregar un nuevo producto usando la funcion addProduct() para esto se ubtubo el cuerpo de req para poder obtener los parametros, lugo se paso cada uno ellos como corresponde

### router.put("/:pid")
#### Este endpoint permite modificar un campo de algun producto esto usando la funcion updateProduct() obteniendo el parametro de :pid para luego obtener el cuerpo de la respuesta para pasarlo por la función 

### router.delete("/:pid")
#### Este endpoint permite borrar un producto con el :pid que es el id del producto esto se hace obteniendo el param del id y pasandolo en la funcion deleteProduct()

## Cart
### getCarts()
#### Esta funcion permite obtener todos los carts por medio de una promise del archivo cart.json mediante la libreria fs/promises con la funcion fs.readFile. Esta solo es interna ya que no se requiere ahcer endpoint para esta funcion.

### addCart()
#### Esta funcion permite crear y guardar un cart en el archivo esto obteniendo primero todo los Carts luego creando un newCart dandole un id y posteriormente haciendo push a este a los Carts obtenidos para luego escribir los el nuevo arreglo de Carts al archivo mediante fs.writeFile todo esto asicronamente

### getCartProducts(id)
#### Esta funcion permite obtener un Cart especifico mediante un id proporcionado, esto se logra mediante un find en un arreglo que tenga todo los carts, para luego solo retornar todo cart.products y muestre solo el arreglo de productos agregados.

### addProductToCart(idCart, idProduct)
#### Esta funcion permite agregar productos con su id(idProduct) a un cart especifico con su id(idCart), esto se logra haciendo un find() con el idCart para luego obtener su indice con indexOf() posteriormente con el indice podemos encontrar dentro de ese cart el producto con un find del idProduct, esto nos permite saber si este ya existe. Validamos que el producto exista, si no  es asi agregamos el productos con su idProduct y la cantidad 1, para luego hacer push de los productos en el cart que ya teniamos con su index y ahora solo subimos el nuevo arreglo con fs.writeFile. Si es que ya estaba el producto solo hacemos un indexOf() del producto que ya habiamos buscado y encontrado para obtener su indece dentro del arreglo de productos que tiene el carrito y usamos esto para solo hacer aumentar que quantity++, luego solo subimos el nuevo cart con fs.writeFile

### router.post("/")
#### Este endpoint permite crear un nuevo cart usando la funcion addCart()

### router.get("/:cid")
#### Este endpoint permite obtener los productos de un cart mediante su parametro id(:cid) esto usando la funcion del CartManager getCartProducts(id)

### router.post("/:cid/product/:pid")
#### Este endpoint permite agregar un producto con su id(:pid) a un Cart especifico con su id(:cid) esto usando la funcion del CartManager addProductToCart(idCart, idProduct)