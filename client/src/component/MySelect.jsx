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
                size='small'
                labelId={label}
                label={label}
                onBlur={onBlur}
                onChange={onChange}
                value={value}

                inputProps={{
                    sx:{
                        display:'flex', 
                        alignItems:'center',
                        color: 'white',
                        height: '30px',
                        paddingTop: '0',
                        paddingBottom: '0',
                        border: '1px solid white',
                }}}
                itemProp={{
                    style:{
                        height: '30px',
                        border: '1px solid red',
                }}}
                SelectDisplayProps={{
                    style:{
                        height: '30px',
                        border: '1px solid white',
                }}}
                {...props} 
                style={{
                    gridColumn: "span 3",
                    height: '30px',
            }}>
                {children}
            </Select>
    
            {helperText && (  
                <div style={{   
                    color: 'red', 
                    margin: '0px 12px',
                    fontSize: '12px',
                    gridColumn: "span 2"
                }}>  
                    {helperText}  
                </div>  
            )}  
        </div>  
    ); 
}

export default CustomSelect;