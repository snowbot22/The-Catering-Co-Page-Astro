import { useState } from 'react';
import { helpHttp } from './helpHTTP';

export const useForm = (initialForm, validateForm) =>{
    const[form, setForm] = useState(initialForm);
    const[errors,setErrors]=useState({});
    const[loading,setLoading]=useState(false);
    const[response,setResponse]=useState(null);
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(errors);
        console.log(form);
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleBlur = (e) =>{
        handleChange(e);
        setErrors(validateForm(form));
        console.log(errors);
        console.log(form);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(validateForm(form));
        if(Object.keys(errors).length === 0){
            setLoading(true);
            helpHttp().post("https://formsubmit.co/ajax/eventplanners@thecateringcompanyeventos.com",
            {
                body: form,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }).then((res) =>{
                setLoading(false);
                setResponse(true);
                setForm(initialForm);
                setTimeout(() => setResponse(false),5000);
            })
            
        }else{
           return
        }
    }

    return {
        form, errors, loading, response,
        handleChange, handleBlur, handleSubmit
    }
}