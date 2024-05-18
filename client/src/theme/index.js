import { createTheme } from "@mui/material";

export const Theme1 = createTheme({
    palette:{
        primary: {
            main: '#E690B8',
        },
        secondary: {
            main: '#92CF8A',
        },
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
        }
    }
});


export const Theme2 = createTheme({
    palette:{
        primary: {
            main: '#8ACDCF',
        },
        secondary: {
            main: '#B58ACF',
        },
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