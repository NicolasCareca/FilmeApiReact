import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);

    // Determine a classe CSS da imagem com base no tamanho da tela
    const getCarouselImageClass = () => {
        if (window.innerWidth >= 1024) {
            return "carousel-image max-h-96 w-2/3 object-cover";
        } else {
            return "carousel-image max-h-96 w-full object-cover";
        }
    };

    return (
        <div className="bg-gray-800 pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center my-4 sm:my-6">Filmes em Destaque</h1>
            <Carousel
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
                infiniteLoop={true}
                emulateTouch={true}
                className="carousel-container"
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="carousel-slide flex flex-col">
                        <div className="carousel-image-container">
                            <img
                                src={`${imagePath}${movie.backdrop_path}`}
                                alt={movie.title}
                                className={getCarouselImageClass()}
                            />
                        </div>
                        <div className="carousel-info flex flex-col justify-between h-full overflow-hidden">
                            {false && (
                                <div>
                                    <h2 className="text-lg font-semibold text-indigo-800 mb-2">{movie.title}</h2>
                                    <Link to={`/${movie.id}`}>
                                        <button className="w-full py-2 px-4 rounded-lg border border-indigo-600 font-semibold text-indigo-600 bg-black hover:scale-105 transform duration-250 hover:bg-indigo-100 cursor-pointer">
                                            Detalhes
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>


            <div className="container mx-auto px-4 mt-4 sm:mt-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center my-4 sm:my-6">Catálogo</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 flex flex-col h-full">
                                <h2 className="text-lg font-semibold text-white mb-2">{movie.title}</h2>
                                <Link to={`/${movie.id}`}>
                                    <button className="w-full py-2 px-4 rounded-lg  border border-gray-900 font-semibold text-white-300 bg-blue-700 hover:scale-105 transform duration-250 hover:bg-blue-900 cursor-pointer">
                                        Detalhes
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
