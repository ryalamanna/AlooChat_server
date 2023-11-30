import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";
import {createAGroupChat, createOrGetAOneOnOneChat, deleteOneOnOneChat, getAllChats , searchAvailableUsers} from '../../../controllers/apps/chat/chat.controllers.js';
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";
import { validate } from "../../../validators/validate.js";
import { createAGroupChatValidator } from "../../../validators/apps/chat/chat.validators.js";

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
router.post("/group" ,(req, res , next)=>{console.log(req.body );next();}, createAGroupChatValidator(), validate, createAGroupChat);
router.delete("/remove/:chatId" , mongoIdPathVariableValidator("chatId"), validate, deleteOneOnOneChat);

export default router;