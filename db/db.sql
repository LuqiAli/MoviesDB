CREATE TABLE movies (
    movie_id BIGSERIAL NOT NULL PRIMARY KEY,
    movie_name VARCHAR(50) NOT NULL,
    movie_rating INT CHECK (movie_rating >= 0 AND movie_rating <= 10) NOT NULL
);

CREATE TABLE movie_tags (
    movie_id BIGINT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id BIGSERIAL NOT NULL PRIMARY KEY,
    tag_titles VARCHAR(50) NOT NULL,
    tag_color VARCHAR(7) NOT NULL
);


SELECT 
    movies.movie_id,
    movie_name,
    movie_rating,
    ARRAY_AGG(tags.tag_id) as tag_ids ,
    ARRAY_AGG(tag_titles) as tag_titles,
    ARRAY_AGG(tag_color) as tag_colors
FROM 
    movies
JOIN 
    movie_tags
ON
    movie_tags.movie_id = movies.movie_id
JOIN
    tags
ON 
    tags.tag_id = movie_tags.tag_id
GROUP BY movies.movie_id;

SELECT 
    movies.movie_id,
    movie_name,
    movie_rating,
    ARRAY_AGG(tags.tag_id) as tag_ids ,
    ARRAY_AGG(tag_titles) as tag_titles,
    ARRAY_AGG(tag_color) as tag_colors
FROM 
    movies
JOIN 
    movie_tags
ON
    movie_tags.movie_id = movies.movie_id
JOIN
    tags
ON 
    tags.tag_id = movie_tags.tag_id
WHERE movies.movie_id = ANY(
    SELECT movie_tags.movie_id FROM movie_tags WHERE tag_id = 7 OR tag_id = 9
    
)
AND movie_name ILIKE '%i%'
GROUP BY movies.movie_id;

INSERT INTO movies(movie_name, movie_rating) VALUES("Star Trek", 1);


INSERT INTO movie_tags(movie_id, tag_id) VALUES (7, 1), (7,6), (7, 8), (7, 9);


WITH ins1 AS (
    INSERT INTO movies(movie_name, movie_rating)
    VALUES('Iron Man', 3)
    ON CONFLICT DO NOTHING
    RETURNING movie_id as new_movie_id
    )
INSERT INTO movie_tags(movie_id, tag_id) 
SELECT new_movie_id, 1 FROM ins1;


WITH ins1 AS (
    INSERT INTO movies(movie_name, movie_rating)
    VALUES('i Man', 3)
    ON CONFLICT DO NOTHING
    RETURNING movie_id as new_movie_id
    )
, add1 AS(
    INSERT INTO movie_tags(movie_id, tag_id)
    SELECT new_movie_id, 10 from ins1
)
INSERT INTO movie_tags(movie_id, tag_id) 
SELECT new_movie_id, 1 FROM ins1;