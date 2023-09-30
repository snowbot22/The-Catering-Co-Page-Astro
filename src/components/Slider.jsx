import { useState } from "react"
import "../css/slider.css"

export const Slider = () =>{

    let images= [
        "/slider-1.jpg",
        "/slider-2.jpg"
    ]

    const [imagenActual, setImagenActual] = useState(0);
    const cantidad = images.length;

    //ERRORS
    if (!Array.isArray(images) || cantidad === 0) return;

	const siguienteImagen = () => {
		setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
	};

	const anteriorImagen = () => {
		setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
	};

    return(
        <article className="slider">
            <button className="slider__button button--prev" onClick={anteriorImagen}>
                <figure>
                    <img className="img--large" src="/arrow-prev.svg" alt="arrrow-previous" />
                </figure>
            </button>
            {images.map((imagen, index) => {
				return (
                    <section className={imagenActual === index ? `slider__container active` : "slider__container"}>
                       {imagenActual === index && (
							<img className="img--large img--cover" key={index + imagen} src={imagen} alt="imagen" />
						)}
                    </section>
				);
			})}
            <button className="slider__button button--next" onClick={siguienteImagen}>
                <figure>
                    <img className="img--large" src="/arrow-next.svg" alt="arrow-next" />
                </figure>
            </button>
        </article>
    )
}