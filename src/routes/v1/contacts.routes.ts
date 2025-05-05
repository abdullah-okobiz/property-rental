import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import ContactsControllers from "../../modules/contacts/contacts.controllers";

const {
  handleCreateContactMessage,
  handleDeleteContactMessage,
  handleFindAllContactsMessages,
} = ContactsControllers;
const { checkAccessToken, isAdmin } = UserMiddlewares;

const router = Router();

router.route("/create-contact").post(handleCreateContactMessage);

router
  .route("/admin/contacts")
  .get( handleFindAllContactsMessages);

router
  .route("/admin/contacts/:id")
  .delete(checkAccessToken, isAdmin, handleDeleteContactMessage);

export default router;
