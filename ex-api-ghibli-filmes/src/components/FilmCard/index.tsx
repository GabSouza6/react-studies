import { Link } from 'react-router-dom'
import type {Film} from '../../types/Film'


type FilmCardProp = {
    film: Film
}

export const FilmCard = ({ film }: FilmCardProp) => {
  return (
    <Link to={`/films/${film.id}`} className="flex flex-col items-center">
      <img
        src={film.image}
        alt={film.title}
        className="w-48 h-72 object-cover rounded-lg"
      />
      <h3 className="mt-2 text-center font-semibold">{film.title}</h3>
    </Link>
  );
};