const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const endpoints = {
  nowPlaying: `${baseUrl}/movie/now_playing`,
  upcoming: `${baseUrl}/movie/upcoming`,
  topRated: `${baseUrl}/movie/top_rated`,
  popular: `${baseUrl}/movie/popular`,
  similarMovies: (movieId?: string) =>
    `${baseUrl}/movie/${movieId}/similar?language=en-US&page=1`,
  discoverMovies: `${baseUrl}/discover/movie`,
  searchMovie: `${baseUrl}/search/movie`,
  movieDetailsById: (movieId: string) =>
    `${baseUrl}/movie/${movieId}?append_to_response=videos,credits`,
  movieWatchProvidersById: (movieId: string) =>
    `${baseUrl}/movie/${movieId}/watch/providers`,
  movieVideosById: (movieId: string) => `${baseUrl}/movie/${movieId}/videos`,
  movieProviders: `${baseUrl}/watch/providers/movie?language=en-US`,
  getPersonById: (personId: string) =>
    `${baseUrl}/person/${personId}?language=en-US&append_to_response=movie_credits,images`,
  getMovieGenres: () => `${baseUrl}/genre/movie/list?language=en`,
} as const;
