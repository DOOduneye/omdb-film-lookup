import type { NextPage } from "next";
import type { MovieDB } from "../../types/MovieDB";

import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useEffect } from "react";

import SearchComponent from "../../components/SearchComponent";
import CardComponent from "~/components/CardComponent";

const Search: NextPage = () => {
    const router = useRouter();
    const sid = router.query.sid;

    const { data: results, refetch } = useQuery({ queryKey: ['search'], queryFn: 
        async () => {   
            const apiKey = process.env.NEXT_PUBLIC_API_KEY_TMDB_V3 ?? 'default_api_key';
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${sid}&page=1&include_adult=false`)
            const data = await res.json() as MovieDB;
            return data.results
                .filter(result => ['movie', 'tv'].includes(result.media_type))
                .filter(result => result.poster_path !== null)
                .sort((a, b) => b.popularity - a.popularity);
        }
    });

    useEffect(() => {
        refetch().then(() => console.log('refetched')).catch(() => console.log('error'));
    }, [refetch, sid]);
    

    if (!results || results.length === 0) {
        return (
            <main className="flex flex-col h-screen gap-5">
                <div className="flex flex-col items-center justify-center gap-5 pt-10">
                    <SearchComponent />
                    <p className="text-slate-200">No results found</p>
                </div>
            </main>
        );
    }

    
    return (
        <main className="flex flex-col h-screen gap-5">
            <div className="flex flex-col items-center justify-center gap-5 pt-10">
                <SearchComponent />
                <p className="text-slate-200">{results.length} results found</p>
                <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-5">
                    {results.map((result) => (
                        <CardComponent key={result.id} result={result} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Search;