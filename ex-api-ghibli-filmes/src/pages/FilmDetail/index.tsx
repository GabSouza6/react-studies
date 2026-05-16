import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { Link, useParams } from "react-router-dom";

export const FilmDetail = () => {
  const { id } = useParams();

  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(
          `https://ghibliapi.vercel.app/films/${id}`,
        );
        const data: Film = await response.json(); // Film sem o [], pois é um só
        setFilm(data);
      } catch (error) {
        setError("Erro ao carregar o filme.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]); // id entra no array de dependências

  return (
    <>
      {loading && <p className="text-center mt-10">Carregando...</p>}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}
      {film && (
        <div className="max-w-2xl mx-auto p-8">
          <Link to="/" className="text-blue-500 hover:underline mb-6 block">
            ← Voltar
          </Link>
          <h1 className="text-3xl font-bold mb-4">{film.title}</h1>
          <img
            src={film.image}
            alt={film.title}
            className="w-64 rounded-lg mb-6"
          />
          <p className="text-gray-600 mb-6">{film.description}</p>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Diretor:</span> {film.director}
            </p>
            <p>
              <span className="font-semibold">Produtor:</span> {film.producer}
            </p>
            <p>
              <span className="font-semibold">Ano:</span> {film.release_date}
            </p>
            <p>
              <span className="font-semibold">Rotten Tomatoes:</span>{" "}
              {film.rt_score}%
            </p>
          </div>
        </div>
      )}
    </>
  );
};
