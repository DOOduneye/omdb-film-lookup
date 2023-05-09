import { type NextPage } from "next";
import Head from "next/head";
import SearchComponent from "~/components/SearchComponent";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>TMDB Lookup</title>
        <meta name="description" content="Find a movie to watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-5">
        <h1 className="text-white font-regular text-2xl">TMDB Lookup</h1>
        <SearchComponent />
      </main>

      <footer className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-5">
        <p className="text-slate-100">Powered by <a href="https://www.themoviedb.org/" className="text-blue-300 hover:underline">The Movie Database</a></p>
      </footer>
    </>
  );
};

export default Home;
