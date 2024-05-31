import React from 'react';  
import {Select} from '@mui/material';

function CustomSelect({ label, value, onChange, onBlur, error, helperText, children, ...props }){
    return (  
        <div style={{
            gridColumn: "span 2",  
            display: 'grid',  
            alignItems: 'center',
            gridTemplateColumns:'repeat(5, minmax(0, 1fr))'
        }}> 
            <Select
                labelId={label}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
                value={value}

                inputProps={{
                    sx:{
                        display:'flex', 
                        alignItems:'center',
                        height: '40px',
                        color: 'white',
                        paddingTop: '0',
                        paddingBottom: '0',
                        border: '1px solid white',
                }}}
                itemProp={{
                    style:{
                        border: '1px solid red',
                        height: '40px',
                }}}
                SelectDisplayProps={{
                    style:{
                        border: '1px solid white',
                        height: '40px',
                }}}
                {...props} 
                style={{
                    gridColumn: "span 4",
                    height: '40px',
            }}>
                {children}
            </Select>
    
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

export default CustomSelect;