import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let filme = res.find((key) => {
                    return key.id == id;
                });
                setMovie(filme);
            });
    }, [id, KEY]);

    return (
        <div className="bg-gray-800 text-white py-6 sm:py-10 lg:py-12">
            <div className="container mx-auto px-4">
                <div className="bg-gray-700 rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between">
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                        <img
                            className="w-full rounded-lg"
                            src={`${imagePath}${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="w-full sm:w-2/3 pl-0 sm:pl-8">
                        <nav className="text-center mb-4 sm:mb-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-300">Detalhes do filme</h1>
                        </nav>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-300 mb-2">{movie.title}</h1>
                        <p className="text-lg text-gray-400">Data: {movie.release_date}</p>
                        <h4 className="text-2xl sm:text-3xl font-semibold text-indigo-300 mt-4">Detalhes</h4>
                        <p className="text-lg text-gray-400 text-justify">{movie.overview}</p>
                    </div>
                </div>
                <div className="text-center mt-6 lg:mt-8">
                    <Link to="/">
                        <button className="py-2 px-4 sm:py-3 sm:px-6 rounded-lg border border-gray-300 font-semibold text-white-300 bg-indigo-300 hover:scale-105 transform duration-250 hover:bg-gray-200 cursor-pointer">
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Movie;
