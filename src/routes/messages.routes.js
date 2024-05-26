import { Router } from "express"
import { authMdw } from "../middleware/auth.middleware.js"
import { addMessageCtrl, getAllMessagesCtrl } from "../controllers/messages.controller.js"

const router = Router()

router.get("/", authMdw(['PUBLIC']), getAllMessagesCtrl)

router.post("/", authMdw(['USER', 'ADMIN', 'PREMIUM']), addMessageCtrl)

export default router