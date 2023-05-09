import type { NextPage } from "next";
import type { Movie, Credits, Providers, MovieDB } from "~/types/MovieDB";

import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import SearchComponent from "~/components/SearchComponent";
import CardComponent from "~/components/CardComponent";


const MovieComponent: NextPage = () => {

    const router = useRouter();
    const { mid } = router.query;

    const { data: results, refetch, isLoading, isError } = useQuery(['movie', mid], async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY_TMDB_V3 ?? 'default_api_key';
        const [mediaRes, creditsRes, similarRes, providersRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${(mid) as string}?api_key=${apiKey}&language=en-US`),
            fetch(`https://api.themoviedb.org/3/movie/${(mid) as string}/credits?api_key=${apiKey}&language=en-US`),
            fetch(`https://api.themoviedb.org/3/movie/${(mid) as string}/recommendations?api_key=${apiKey}&language=en-US`),
            fetch(`https://api.themoviedb.org/3/movie/${(mid) as string}/watch/providers?api_key=${apiKey}`)
        ]);
        const [media, credits, similar, providers] = await Promise.all([
            mediaRes.json() as Promise<Movie>,
            creditsRes.json() as Promise<Credits>,
            similarRes.json() as Promise<MovieDB>,
            providersRes.json() as Promise<Providers>
        ]);
        return { media, credits, similar, providers };
    });

    useEffect(() => {
        refetch().then(() => console.log('refetched')).catch(() => console.log('error'));
    }, [refetch, mid]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    if (results.media.title === undefined) {
        return (
            <main className="flex flex-col h-screen gap-5">
                <div className="flex flex-col items-center justify-center gap-5 pt-10">
                    <SearchComponent />
                    <p className="text-slate-200">No results found</p>
                </div>
            </main>
        );
    }

    const allProviders = results.providers.results.US.flatrate.concat(results.providers.results.US.rent).concat(results.providers.results.US.buy);
    const uniqueProviders = allProviders.filter((thing, index, self) => index === self.findIndex((t) => t.provider_id === thing.provider_id && t.provider_name === thing.provider_name))


    return (
        <main className="grid grid-flow-row auto-rows-max gap-5">
            <div className="flex flex-col items-center justify-center gap-5 pt-8">
                <SearchComponent />
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="pl-5">
                    <CardComponent result={results.media} hover={false} clickable={false} width={'80%'} />
                </div>
                <div>
                    <div className="flex flex-col gap-5">
                        <div>    
                            <h3 className="text-xl font-medium leading-7 text-slate-100">Overview</h3>
                            <p className="mt-2 text-sm leading-5 text-slate-300 overflow-hidden">
                                {results.media.overview.length > 300 ? results.media.overview.slice(0, 300) + '...' : results.media.overview}
                            </p>
                        </div>

                        <div>
                            <h3 className="mt-4 text-xl font-medium leading-7 text-slate-100">Cast</h3>
                            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {results.credits.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 4).map((cast) => (
                                    <div className="flex flex-col p-4 transition duration-150 ease-in-out rounded-md bg-slate-700" key={cast.id}>
                                        <Image src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} className="rounded-lg w-fit h-fit" width={200} height={300} />
                                        <p className="mt-2 text-sm leading-5 text-slate-100">{cast.name}</p>
                                        <p className="mt-2 text-sm leading-5 text-slate-300">{cast.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mt-4 text-xl font-medium leading-7 truncate text-slate-100">Similar</h3>
                            <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {results.similar.results.slice(0, 4).map((result) => (
                                    <CardComponent result={result} key={result.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-medium leading-7 text-slate-100">Watch Now</h3>
                    <div className="flex flex-row flex-wrap gap-4 pr-5">
                        {uniqueProviders.map((provider) => (
                            <div className="flex flex-col rounded-md" key={provider.provider_id}>
                                <Image src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name} className="rounded-lg w-fit h-fit" width={50} height={50} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row items-center justify-center mt-5">
                        <p className="text-slate-200">Powered by <a href="https://www.justwatch.com/" className="text-blue-500 hover:underline">JustWatch</a></p>
                    </div>
                </div>

            </div>
        </main>


    )
}

export default MovieComponent;