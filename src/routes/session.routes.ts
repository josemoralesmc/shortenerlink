import { Router } from 'express'
import { UserController } from '../controllers/session.controller'

const router = Router()
const controllerUser = new UserController()

router.post('/register', controllerUser.register)

router.post('/login', controllerUser.login)


export default router
