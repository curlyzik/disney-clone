import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React, { useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/solid";

const Movie = ({ movie }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const session = useSession();

  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <div>
      <Head>
        <title>{movie.title || movie.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
                `${BASE_URL}${movie.poster_path}`
              }
              layout="fill"
              objectFit="cover"
              className="opacity-70"
            />
          </div>
          <div
            className="absolute inset-y-28 
            inset-x-4 md:inset-y-auto
            md:bottom-10 md:inset-x-12
            space-y-6 z-50"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {movie.title || movie.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                className="text-sm md:text-base 
              bg-[#f9f9f9] text-black flex
                items-center justify-center py-2.5
                px-6 rounded hover:bg-[#c6c6c6]"
              >
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base
                bg-black/30 text-[#f9f9f9] border flex
                border-[#f9f9f9] items-center justify-center py-2.5
                px-6 rounded hover:bg-[#c6c6c6] hover:text-black
                transition-all duration-300"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div
                className="rounded-full border-2 border-white
                flex items-center justify-center w-11 h-11 cursor-pointer
                bg-black/60"
              >
                <PlusIcon className="h-6" />
              </div>

              <div
                className="rounded-full border-2 border-white
                flex items-center justify-center w-11 h-11 cursor-pointer
                bg-black/60"
              >
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>

            <p className="text-ms md:text-sm">
              {movie.release_date || movie.first_air_date} +{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m + {""}
              {movie.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{movie.overview}</h4>
          </div>

          {/* BACKGROUND OVERLAY */}
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-10 h-full w-full z-50" />
          )}
        </section>
      )}
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { movieId } = context.params;

  const req = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&
    language=en-US&append_to_response=videos,images`
  );

  const data = await req.json();

  return {
    props: {
      movie: data,
      session,
    },
  };
}
