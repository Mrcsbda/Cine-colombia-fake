import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import PurchaseData from '../purchaseData/PurchaseData'
import "./movieCheckout.scss"
import DownloadTickets from '../downloadTickets/DownloadTickets'
import { getCinemaAndCinemaShows } from '../../services/cinemasServices'
import { AppContext } from '../../routes/Router'

const MovieCheckout = () => {
  const location = useLocation()
  const { idMovie } = useParams()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const [step, setStep] = useState(1)
  const [cinema, setCinema] = useState("")
  const [schedule, setSchedule] = useState(false)
  const { valueToFilterMovies, date, setCheckoutBuilderState, checkoutBuilderState } = useContext(AppContext)
  const propsMovieSchedule = {
    movie,
    cinema,
    schedule,
    trailer,
    setStep,
    step
  }

  useEffect(() => {
    getMovie()

  }, [location, valueToFilterMovies, date])

  const getMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    const videosInfo = await getTrailer(idMovie)
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows()
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
      ?? videosInfo.find(video => video.type === 'Teaser');
    const cinemaInfo = cinemaAndCinemaShows.find(item => item.cinema_shows.find(movie => movie.movie == idMovie))
    const infoCinemaShow = cinemaInfo.cinema_shows.find(item => item.movie == idMovie)
    cinemaInfo.name === valueToFilterMovies
      ? setCinema(cinemaInfo.name)
      : (!valueToFilterMovies
        ? setCinema("Selecciona un cinema")
        : setCinema(false))
    setCheckoutBuilderState(checkoutBuilderState.setCinemaShowId(infoCinemaShow.id).setHall(infoCinemaShow.hall));
    getMovieSchedulesByDate(infoCinemaShow.schedules)
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  const getMovieSchedulesByDate = (schedules) => {
    if (typeof date === 'string') {
      const [year, month, day] = date.split("-")
      const dateInMiliseconds = new Date(year, (month - 1), day).setHours(0, 0, 0, 0)
      const limitDateInMiliseconds = new Date(dateInMiliseconds).setHours(23, 59, 59, 999999)
      const cinemaShowSchedule = schedules.filter(item => item >= dateInMiliseconds && item <= limitDateInMiliseconds)
      setSchedule(cinemaShowSchedule)
    }
  }

  const showComponets = () => {
    switch (true) {
      case step === 1:
        return (<MovieSchedule props={propsMovieSchedule} />);
      case step < 6:
        return (<PurchaseData movie={movie} step={step} setStep={setStep} />);
      case step === 6:
        return (<DownloadTickets movie={movie} />);
      default: return ""
    }
  }

  return (
    <>
      {
        movie?.title && trailer?.key && (
          <section className='movie-checkout-container'>
            {
              showComponets()
            }
          </section>
        )
      }
    </>
  )
}

export default MovieCheckout