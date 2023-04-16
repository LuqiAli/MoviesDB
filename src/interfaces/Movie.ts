interface Movie {
    movie_id: number,
    movie_name: string,
    movie_rating: number,
    tag_ids: number[],
    tag_titles: string[],
    tag_colors: string[]
}

export default Movie