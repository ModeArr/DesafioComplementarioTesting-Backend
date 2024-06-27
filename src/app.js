import express from "express"
import { engine } from "express-handlebars"
import path from "path"
import { fileURLToPath } from 'url';
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import viewRoutes from "./routes/views.routes.js"
import messagesRoutes from "./routes/messages.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import * as config from "./config/config.js"
import { Server } from 'socket.io'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = config.PORT
const API_PREFIX = config.API_PREFIX
const cookieSecret = config.COOKIE_SECRET 

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { swaggerOpts } from "./config/swagger.config.js";

app.use(express.urlencoded({ extends: true }));
app.use(express.json()); 
app.use(express.static(__dirname + '/public'))
app.use(cookieParser(cookieSecret));

const server = app.listen(PORT, () => {
    console.log("SERVER FUNCIONANDO")
})

const io = new Server(server);
const specs = swaggerJSDoc(swaggerOpts);

initializePassport()
app.use(passport.initialize())

app.engine("handlebars", engine())
app.set("views", path.join(`${__dirname}/views`))
app.set("view engine", "handlebars")
app.set("io",  io)

app.use(`/${API_PREFIX}/products`, productsRoutes)
app.use(`/${API_PREFIX}/carts`, cartsRoutes)
app.use(`/${API_PREFIX}/messages`, messagesRoutes)
app.use(`/${API_PREFIX}/user`, userRoutes)
app.use(`/${API_PREFIX}/docs/`, swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', viewRoutes)

export default app