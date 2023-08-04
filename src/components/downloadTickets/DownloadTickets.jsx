import React, { useContext } from 'react'
import "./downloadTickets.scss"
import { AppContext } from '../../routes/Router'

const DownloadTickets = ({ movie }) => {

    const { checkoutBuilderState } = useContext(AppContext)
    return (
        <div className='download-tickets'>
            <div className='download-tickets__container'>
                <div className='download-tickets__title-container'>
                    <h2 className='download-tickets__title'>Boletos</h2>
                    <div className='download-tickets__date-container'>
                        <p className='download-tickets__date'>14 Ago</p>
                        <p className='download-tickets__hour'>7:30 PM</p>
                    </div>
                </div>
                <div className='download-tickets__info-container'>
                    <img
                        className='download-tickets__poster'
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title} />
                    <div className='download-tickets__content-container'>
                        <p className='download-tickets__text'><strong>Pelicula:</strong> {movie.title}</p>
                        <p className='download-tickets__text'><strong>Complejo:</strong> Los Molinos</p>
                        <p className='download-tickets__text'><strong>Asientos:
                        </strong>{checkoutBuilderState.places.map((item, index) => (<span key={index + 1} > {item} </span>))}</p>
                        <p className='download-tickets__text'><strong>Número de sala:</strong>&nbsp;{checkoutBuilderState.hall}</p>
                        <figure className='download-tickets__qr-container'>
                            <img
                                className='download-tickets__qr'
                                src="https://pngimg.com/uploads/qr_code/qr_code_PNG25.png"
                                alt="código qr" />
                        </figure>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DownloadTickets