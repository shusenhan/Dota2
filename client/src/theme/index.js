import { createTheme } from "@mui/material";

export const Theme1 = createTheme({
    palette:{
    },
    picture:{
        background:'../theme/background/1.jpg'
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {  
                root: {
                    backgroundColor: 'white',  
                    '&:hover': {  
                        backgroundColor: 'lightblue',
                    },  
                },
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                }
            }
        }
    }
});


export const Theme2 = createTheme({
    palette:{
    },
    picture:{
        background:'../theme/background/2.jpg'
    },
    components: {
        MuiSelect: {
            root: {
                backgroundColor: 'white',
                '& .MuiSelect-select': {
                    backgroundColor: 'white'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {  
                root: {
                    backgroundColor: 'white',  
                    '&:hover': {  
                        backgroundColor: 'lightblue',
                    },  
                },
            }
        }
    }
});

export const themeSetting = (mode) => {
    return (mode === "1" ? Theme1 : Theme2)
};