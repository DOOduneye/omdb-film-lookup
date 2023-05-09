import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

const SearchComponent = () => {

    const [search, setSearch] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                buttonRef.current?.click();
            }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const pathname = router.pathname === "/search/[sid]" ? router.pathname.replace("[sid]", search) : '/search/[sid]'

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>{
        event.preventDefault();
        setSearch(event.target.value)
        console.log(search);
    }

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <input type="text" value={search} onChange={handleSearch} placeholder="Search for a movie/tv" className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 text-white focus:outline-none" />
            <Link href={pathname} as={`/search/${search}`} className="p-2 rounded-md bg-slate-50 text-black text-md hover:bg-slate-700 hover:text-white transition">
                <button ref={buttonRef}>Search</button>
            </Link>
        </div>
    )
}

export default SearchComponent;