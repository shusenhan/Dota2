import { GetAllItems, InsertItem, UpdateItem, GetItemByName } from "../Database.js";
import Item from "../models/item.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await GetAllItems();

        if (items.code === 200) {
            res.status(200).json(items);
        }
        else {
            res.status(items.code).json({ message: items.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const insertItem = async (req, res) => {
    try{
        const itemInfo = req.body;
        const item = new Item(itemInfo);
        const isExist = await GetItemByName(item.ItemName);
        console.log(itemInfo)

        if(isExist.code == 200){
            const result = await UpdateItem(item);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: item});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
        else{
            const result = await InsertItem(item);

            if(result.code === 200){
                res.status(200).json({message:result.message, data: item});
            }
            else{
                res.status(result.code).json({message: result.message});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getItemByName = async (req, res) => {
    try {
        const { ItemName } = req.params;
        const item = await GetItemByName(ItemName);

        if (item.code === 200) {
            res.status(200).json(item);
        }
        else {
            res.status(item.code).json({ message: item.message });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}