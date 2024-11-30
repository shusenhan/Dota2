import React from 'react';  
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
  
// 自定义TextField组件，用于在右侧显示错误信息  
function CustomTextArea({ label, value, onChange, onBlur, error, helperText, isRight=true, width='220px', ...props }) {  
  
  return (  
    <div style={{
        gridColumn: "span 2",  
        display: isRight ? 'grid' : 'block',  
        width: '100%',
        alignItems: 'center',
        gridTemplateColumns:'repeat(5, minmax(0, 1fr))'
    }}>  
        <TextareaAutosize 
            minRows={4} 
            label={label}  
            value={value}  
            onChange={onChange}  
            onBlur={onBlur}
            {...props} 
            style={{
                gridColumn: "span 3",
                width: width,
                resize: 'none'
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

export default CustomTextArea;