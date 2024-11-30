import React from 'react';  
import TextField from '@mui/material/TextField';   
  
// 自定义TextField组件，用于在右侧显示错误信息  
function CustomTextField({ label, value, onChange, onBlur, error, helperText, isRight=true, ...props }) {  
  
  return (  
    <div style={{
        gridColumn: "span 2",  
        display: isRight ? 'grid' : 'block',  
        alignItems: 'center',
        width:"100%",
        gridTemplateColumns:'repeat(5, minmax(0, 1fr))'
    }}>  
        <TextField  
            label={label}  
            value={value}  
            onChange={onChange}  
            onBlur={onBlur}  
            helperText={null} 
            FormHelperTextProps={{ sx: { display: 'none' } }}
            InputProps={{
                sx: {
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    height: '4.25vh',
                    fontSize: '2.0vh',
                    '&:hover': {
                        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
                    },
                }
            }}
            
            InputLabelProps={{
                style: {
                    color: 'white',
                    fontSize: '1.75vh',
                }
            }}
            {...props} 
            style={{
                gridColumn: "span 4",
        }}/>

        {helperText && (  
            <div style={{   
                color: 'red', 
                margin: '0px 12px',
                fontSize: '12px',
                gridColumn: "span 1"
            }}>  
                {helperText}  
            </div>  
        )}  
    </div>  
  );  
}  

export default CustomTextField;