import { Router } from "express";
import UrlController from "../controllers/url.controller";
import { validateSession } from "../middlewares/validatesession";

const urlController = new UrlController();

const router = Router();

router.post("/create", validateSession, urlController.postUrl);
router.delete("/:id", validateSession, urlController.deleteUrl);
router.get("/myurls", validateSession, urlController.getByIdUser);
router.get("/:shorturl", validateSession, urlController.redirectUrl);

export default router;
