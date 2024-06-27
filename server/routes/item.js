import express from "express";
import { insertItem, getItemByName, getAllItems } from "../controller/item.js";

const itemRouter = express.Router();

itemRouter.get("/getitem/:itemName", getItemByName);
itemRouter.post("/insert", insertItem);
itemRouter.get("/allitems", getAllItems);

export default itemRouter;