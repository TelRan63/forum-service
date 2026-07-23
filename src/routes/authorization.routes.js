import {Router} from "express";
import {hasRole, isOwner, isOwnerOrHasRole} from "../middlewares/authorization.middleware.js";
import {ADMIN} from "../configuration/constants.js";

const router = Router();

router.all('/account/user/:login/role/:role', hasRole(ADMIN));
router.patch('/account/user/:user', isOwner('user'));
router.delete('/account/user/:login', isOwnerOrHasRole('login', ADMIN));
router.post('/forum/post/:author', isOwner('author'));
router.patch('/forum/post/:id/comment/:user', isOwner('user'));

export default router;