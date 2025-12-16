export const TMDB_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string}) => {
    const endpoint = query? `/search/movie?query=${encodeURIComponent(query)}`
     :'/discover/movie?sort_by=popularity.desc' 
     console.log('the fetch started')
    const response = await fetch(TMDB_CONFIG.BASE_URL+endpoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if(!response.ok){
        //@ts-ignore
        throw new Error('Failed to fetch movies', response.statusText)
    }

    const data = await response.json();
    return data.results;
}