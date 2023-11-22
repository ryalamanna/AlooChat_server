import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";
import {createOrGetAOneOnOneChat, getAllChats , searchAvailableUsers} from '../../../controllers/apps/chat/chat.controllers.js';
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";
import { validate } from "../../../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.get('/' , getAllChats);
router.get("/users" , searchAvailableUsers);
router
  .post(
    "/c/:receiverId" ,
    mongoIdPathVariableValidator("receiverId"),
    validate,
    createOrGetAOneOnOneChat
  );

export default router;