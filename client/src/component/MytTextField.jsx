import React from 'react';  
import TextField from '@mui/material/TextField';   
  
// 自定义TextField组件，用于在右侧显示错误信息  
function CustomTextField({ label, value, onChange, onBlur, error, helperText, ...props }) {  
  
  return (  
    <div style={{
        gridColumn: "span 2",  
        display: 'grid',  
        alignItems: 'center',
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
                    '&:hover': {
                        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
                    },
                }
            }}
            
            InputLabelProps={{
                style: {
                    color: 'white',
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