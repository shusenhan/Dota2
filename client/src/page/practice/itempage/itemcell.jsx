import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ItemInfo from "../../../component/Item/ItemInfo";

const ItemCell = ({ name, cnName}) => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    return (
        <Box>
            <div style={{width:'100%', height:'100%'}}>
                <img src={`http://localhost:3001/assets/items/${name}_icon.webp`} style={{width:'90%'}}/>
            </div>
        </Box>
    );
}

export default ItemCell;