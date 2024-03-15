import { useForm } from "./hooks/useForm";
import "../css/form.css";

const initialForm = {
  name: "",
  email: "",
  tel: "",
  event: "",
  date: "",
  guests: "",
  comment: " ",
};

const validationsForm = (form) => {
  let errors = {};
  let namePattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let phonePattern = /^[0-9]+$/;
  let commendPattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ0-9 ]+$/;

  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (!namePattern.test(form.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }
 
  if (!form.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "El email no es válido";
  }

  if (!form.tel.trim()) {
    errors.tel = "El teléfono es obligatorio";
  } else if (!phonePattern.test(form.tel)) {
    errors.tel = "El teléfono solo puede contener números";
  }

  if (!form.event.trim()) {
    errors.event = "El tipo evento es obligatorio";
  } else if (!namePattern.test(form.event)) {
    errors.event = "El tipo evento solo puede contener letras y espacios";
  }
  
  if (!form.guests) {
    errors.guests = "El número de invitados es obligatorio";
  } else if (form.guests < 0) {
    errors.guests = "El número de invitados no puede ser negativo";
  }

  if (!form.date.trim()) {
    errors.date = "La fecha es obligatoria";
  }

  if(!commendPattern.test(form.comment)){
    errors.comment = "El comentario solo puede contener letras, números y espacios";
  }

  return errors;
};

export const Form = () => {
  const {
    form, 
    errors, 
    loading, 
    response,
    handleChange, 
    handleBlur, 
    handleSubmit} = useForm(initialForm,validationsForm) 
 

  return (
    <form  onSubmit={handleSubmit} className="form">
      <div className="container">
        <label className="container__label" htmlFor="name">
          Nombre <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="text"
          name="name"
          placeholder="Escribe tu nombre aqui"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          Dirección de Correo Electrónico <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="email"
          name="email"
          placeholder="Escribe tu email aqui"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          Número de Telefono <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="tel"
          name="tel"
          placeholder="Escribe tu número de telefono aqui"
          value={form.tel}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.tel && <span className="error">{errors.tel}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          ¿Qué evento deseas realizar? <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="event"
          name="event"
          placeholder="Escribe el tipo de evento que deseas realizar"
          value={form.event}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.event && <span className="error">{errors.event}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          Número de Invitados <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="number"
          name="guests"
          min={10}
          max={250}
          value={form.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.guests && <span className="error">{errors.guests}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          Fecha aproximada de tu evento <span className="color--red">*</span>
        </label>
        <input
          className="container__input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <div className="container">
        <label className="container__label" htmlFor="name">
          Cuéntanos que buscas, que deseas, que sueñas, nosotros lo hacemos realidad!
        </label>
        <textarea
          className="container__textarea"
          name="comment"
          placeholder="Escribe un comentario"
          value={form.comment}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.comment && <span className="error">{errors.comment}</span>}
      </div>
      { loading && 
        <div className="loading">
          <p>Enviando datos...</p>
        </div>
      }
      { response &&
        <div className="success">
          <p>Los datos han sido enviados</p>
        </div>
      }
      <button type="Submit" className="form__button">
        Enviar
      </button>
    </form>
  );
};

export default Form;