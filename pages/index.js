import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import ShowCollection from "../components/ShowCollection";

export default function Home({
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}) {
  const [session] = useSession();

  return (
    <div className="">
      <Head>
        <title>Dizny+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {!session ? (
      <Hero />
      ) : (
      <main className="main">
        <Slider />
        <Brands />
        <MoviesCollection results={popularMovies} title="Popular Movies" />

        <ShowCollection results={popularShows} title="Popular Shows" />

        <MoviesCollection results={topRatedMovies} title="Top Rated Movies" />

        <ShowCollection results={topRatedShows} title="Top Rated Shows" />
      </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(`
      https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`),
    fetch(`
      https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`),
    fetch(`
        https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`),
    fetch(`
      https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`),
  ]);

  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
