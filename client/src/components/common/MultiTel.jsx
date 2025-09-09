import React, {useState} from 'react'
import Input from '@mui/material/Input';
import { Button } from '@mui/material';


const MultiTel = ({type, children, phone, onChange, onError, telError, pattern, placeholder, sx, name}) => {
    
    const [tel, changeTel] = useState("");

    let onTelChange = (e) => {
        changeTel(e.target.value);
    }

    let addNumber = () => {
        let validate = new RegExp(pattern).test(tel);
        if (validate) {
            onChange([ ...phone, tel]);
            changeTel("");
            onError(!validate);
        }else onError(!validate);
        
    }

    return (
    <div>
        {(phone.length) ? 
        phone.map((num, i) => {
            return (<div key={i}>{num}</div>)
        }) : null}
        
        {telError ? (<span>Please enter a valid number</span>): null}<br/>
        <Input
        sx={sx}
        type={type}
        name={name}
        value={tel}
        error={telError}
        onChange={onTelChange}
        placeholder={placeholder}
        multiline={true}
        >
            {children}
        </Input><br/>
        <Button onClick={addNumber}>Add number</Button>
    </div>
  )
}

export default MultiTel;