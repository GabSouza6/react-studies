import { useEffect, useState } from "react";
import type { Film } from "../../types/Film";
import { FilmCard } from "../../components/FilmCard";

export const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        const data: Film[] = await response.json();
        const sortedFilms = data.sort((a, b) => a.title.localeCompare(b.title)); //compara os filmes pela ordem alfabética
        const firstTen = sortedFilms.slice(0, 10); // pega os 10 primeiros filmes
        setFilms(firstTen);
      } catch (error) {
        setError("Erro ao carregar os filmes.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-8">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </>
  );
};
