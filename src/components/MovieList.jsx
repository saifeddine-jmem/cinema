import React from 'react'

const MovieList = ({movies,search,error}) => {
  return (
    <div className='container w-screen mx-auto px-10 py-10'>
        {search && <h2>Search results for "{search}"</h2> || <h2>All movies</h2>}
        {error && <p className='text-red-500/50'>{error}</p>}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
            {movies.map((movie) => (
                <div key={movie.id} className='bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10'>
                    <img src={movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`:"/no-movie.png"} alt={movie.title} className='rounded-lg h-auto w-full;' />
                    <div className='px-5 py-4'>
                        <h3 className='text-white font-bold text-base line-clamp-1'>{movie.title}</h3>
                        <div className='mt-2 flex flex-row items-center flex-wrap gap-2'>
                            <div className='flex flex-row items-center gap-1'>
                                <img className='size-4 object-contain' src="star.svg" alt="star" />
                                <p className='font-bold text-base text-white'>{movie.vote_average ? movie.vote_average.toFixed(1):"N/A"}</p>
                            </div>
                            <span className='text-sm text-gray-100'>•</span>
                            <p className='capitalize text-gray-100 font-medium text-base'>
                                {movie.original_language}
                                </p>
                                <span className='text-sm text-gray-100'>•</span>
                            <p className='text-gray-100 font-medium text-base'>
                               {movie.release_date ? movie.release_date.slice(0,4):"N/A"}  
                            </p>
                            
                        </div>
                    </div>
                </div>
            ))}
            {movies.length==0 && <p className='text-white'>No movies found</p>}
        </div>
    </div>
  )
}

export default MovieList