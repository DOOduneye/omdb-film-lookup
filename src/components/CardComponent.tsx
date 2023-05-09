import type { Movie, TVShow } from '~/types/MovieDB';

import Link from 'next/link';
import Image from 'next/image';

interface CardComponentProps {
    result: Movie | TVShow;
    hover?: boolean;
    width?: string;
    clickable?: boolean;
}

const CardComponent = ({ result, hover = true, width = '100%' }: CardComponentProps) => {
    return (
        <Link href={`/${result.media_type}/${result.id}`} key={result.id} className="disabled">
            <div className={`flex flex-col relative rounded-md overflow-hidden cursor-pointer ${hover ? 'ease-in-out duration-300 transform hover:scale-105' : ''}`}>
                <Image src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={(result as Movie).title || (result as TVShow).name} width={500} height={750} className="rounded-md"   style={{ maxWidth: `${width}`, height: 'auto' }} />
                <div className="w-full h-full flex flex-col rounded-md text-left p-2 mb-5 gap-1">
                    <div className="flex flex-row justify-between">
                        <p className="text-white font-semibold text-lg">{(result as Movie).title || (result as TVShow).name}</p>
                    </div>
                    <p className="text-white font-regular text-sm">
                        {new Date((result as Movie).release_date)
                            .toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }) || 
                        new Date((result as TVShow).first_air_date)
                            .toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <div className="flex flex-row items-center gap-1">
                        <svg className="flex-shrink-0 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 00-.894.553l-2 4A1 1 0 006 8h12a1 1 0 00.789-1.614l-8-4a1 1 0 00-.895-.001l-2 1zm-2.447 9.105a1 1 0 00-.553.894v2a1 1 0 001.553.832l4-2a1 1 0 00.447-.832v-2a1 1 0 00-1.553-.832l-4 2z" clipRule="evenodd" />
                        </svg>
                        <p className="text-white font-regular text-sm">{(result as Movie).vote_average || (result as TVShow).vote_average}</p>
                    </div>
                    <p className="text-white font-regular text-left text-sm truncate">{(result as Movie).overview || (result as TVShow).overview}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardComponent;