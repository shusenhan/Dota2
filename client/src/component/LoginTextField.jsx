import React from 'react';  
import TextField from '@mui/material/TextField';   

function LoginTextField({ label, value, onChange, onBlur, error, helperText, ...props }) {
    return (  
        <div style={{
            display: 'grid',  
            alignItems: 'center',
            gridTemplateRows:'repeat(3, minmax(0, 1fr))'
        }}>  
            <TextField  
                size="small"
                label={label}  
                value={value}  
                onChange={onChange}  
                onBlur={onBlur}  
                helperText={null} 
                FormHelperTextProps={{ sx: { display: 'none' } }}
                InputProps={{
                    sx: {
                        width: '350px',
                        height: '40px',
                        margin: '0px',
                        padding: '0px',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
                        },
                    }
                }}
                InputLabelProps={{
                    style: {
                        color: 'white',
                        margin: '0px',
                        padding: '0px',
                    }
                }}
                {...props} 
                style={{
                    gridRow: "span 2",
            }}/>
    
            {helperText && (  
                <div style={{   
                    color: 'red', 
                    margin: '0px 12px',
                    fontSize: '12px',
                    gridRow: "span 1"
                }}>  
                    {helperText}  
                </div>  
            )}  
        </div>  
      );
}

export default LoginTextField;