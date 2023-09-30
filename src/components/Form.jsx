import { useForm } from "react-hook-form";
import { useState } from "react";
import "../css/form.css"

export const Form = () => {

    const [success, setSuccess ] = useState(false);
    let phonePattern= /^[0-9]+$/;
    let emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const setResponse = async (data) => {
        try{
            let hi = await(fetch("https://formsubmit.co/ajax/9404cd1513dbf53e321c8b480d907631", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            }));    
            let res = await hi.json();
            console.log(res);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 4000);
        }
        catch(error){
            console.log(error)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const Submit = data => {setResponse(data)};

    return(
        <form onSubmit={handleSubmit(Submit)} className="form">
            <div className="container">
                <label className="container__label" htmlFor="name">Nombre</label>
                <input className="container__input" type="text" id="name" name="name" placeholder="Escribe tu nombre aqui" 
                {...register("name", {required:"Este campo es requerido",
                    pattern: {
                        value: /^[A-Za-z ]+$/i,
                        message: "Nombre invalido"
                    }
                })} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="email">Email</label>
                <input className="container__input" type="email" id="email" name="email" placeholder="Escribe tu email aqui" 
                {...register("email", {required:"Este campo es requerido", 
                    pattern: {
                        value: emailPattern,
                        message: "Email invalido"
                    }
                })}/>
                {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="telefono">Número de Telefono</label>
                <input className="container__input" type="tel" name="telefono" id="telefono" placeholder="Escribe tu número de teléfono aqui" 
                {...register("telefono", {required:"Este campo es requerido" ,
                 pattern: {
                    value: phonePattern,
                    message: "Número de teléfono invalido"
                 }
                })} />
                {errors.telefono && <span className="error">{errors.telefono.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="invitados">Número de Invitados</label>
                <input className="container__input" type="number" id="invitados" name="invitados" placeholder="Especifica el número de invitados aqui" 
                {...register("invitados", {required:"Este campo es requerido",
                 min: {
                    value: 10,
                    message: "El mínimo de invitados es 10"
                 } , 
                 max: {
                    value: 700,
                    message: "El máximo de invitados es 700"
                 }})}/>
                {errors.invitados && <span className="error">{errors.invitados.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="tipoEvento">Tipo de Evento</label>
                <select className="container__input" name="tipoEvento" id="tipoEvento" {...register("tipoEvento",{required:"Este campo es requerido"})}>
                    <option value="">Elige el tipo de evento</option>
                    <option value="boda">Boda</option>
                    <option value="bautizo">Bautizo</option>
                    <option value="eventoSocial">Evento Social</option>
                    <option value="eventoCorporativo">Evento Corporativo</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <div className="container">
                <label className="container__label" htmlFor="locacion">Locación</label>
                <select className="container__input" name="locacion" id="locacion"{...register("locacion", {required:"Este campo es requerido"})}>
                    <option value="meraki">Meraki Brunch & Events</option>
                    <option value="propia">Locación Propia</option>
                </select>
                {errors.locacion && <span className="error">{errors.locacion.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="fecha">Fecha del Evento</label>
                <input className="container__input" type="date" id="fecha" name="fecha" {...register("fecha", {required:"Este campo es requerido"})}/>
                {errors.fecha && <span className="error">{errors.fecha.message}</span>}
            </div>
            <div className="container">
                <label className="container__label" htmlFor="mensaje">Cuentanos más detalles sobre tu evento (Opcional)</label>
                <textarea className="container__textarea"  name="mensaje" id="mensaje" cols="30" rows="10" {...register("mensaje", {pattern:{
                    value : /^[A-Za-z0-9 ]+$/,
                    message: "Mensaje invalido"
                }})}></textarea>
                {errors.mensaje && <span className="error">{errors.mensaje.message}</span>}
            </div>
            <button className="form__button" type="submit">
                Enviar 
            </button>
            {success && <span className="success">¡Formulario enviado exitosamente!</span>}
        </form>
    )
};