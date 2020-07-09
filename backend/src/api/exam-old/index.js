import { Router } from "express";

import { index, show, create } from "./controller";
import { middleware as body } from "bodymen";
import { schema } from "./model";

const { name, questionsById } = schema.tree;

const router = Router();

router.post("/create", body({ name, questionsById }), create);
router.get("/get/:id", show);
router.get("/get", show);
router.get("/", index);

export default router;
