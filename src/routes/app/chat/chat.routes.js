import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";
import {getAllChats} from '../../../controllers/apps/chat/chat.controllers.js'
const router = Router();

router.use(verifyJWT);

router.get('/' , getAllChats)

export default router;