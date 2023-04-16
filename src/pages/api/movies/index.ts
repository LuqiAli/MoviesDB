import pool from "../../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // console.log(req.query);

      let query = `SELECT movies.movie_id, movie_name, movie_rating, ARRAY_AGG(tags.tag_id) as tag_ids, ARRAY_AGG(tag_titles) as tag_titles, ARRAY_AGG(tag_color) as tag_colors FROM movies JOIN movie_tags ON movie_tags.movie_id = movies.movie_id JOIN tags ON tags.tag_id = movie_tags.tag_id`;

      if (req.query.genres) {
        const genres = req.query.genres;
        let addedQuery = ` WHERE movies.movie_id = ANY(SELECT movie_tags.movie_id FROM movie_tags WHERE tag_id = ${genres[0]}`;

        if (genres.length > 1) {
          for (let i = 1; i < genres.length; i++) {
            addedQuery += ` OR tag_id = ${genres[i]}`;
          }
        }
        addedQuery += ")";

        if (req.query.search) {
          addedQuery += ` AND movie_name ILIKE '%${req.query.search}%'`;
        }

        query += addedQuery;
      } else if (req.query.search) {
        query += ` WHERE movie_name ILIKE '%${req.query.search}%'`;
      }

      query += ` GROUP BY movies.movie_id ORDER BY ${req.query.sort};`;

      const result = await pool.query(query);
      res.status(200).send({ data: result.rows });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      let query = `WITH ins1 AS (INSERT INTO movies(movie_name, movie_rating) VALUES('${body.title}', ${body.rating}) ON CONFLICT DO NOTHING RETURNING movie_id as new_movie_id)`;

      if (body.genres.length > 1) {
        for (let i = 1; i < body.genres.length; i++) {
          query += `, add${i} AS (INSERT INTO movie_tags(movie_id, tag_id) SELECT new_movie_id, ${body.genres[i]} from ins1)`;
        }
      }

      query += ` INSERT INTO movie_tags(movie_id, tag_id) SELECT new_movie_id, ${body.genres[0]} FROM ins1;`;

      // console.log(query)

      await pool.query(query);

      res.status(201).send({ success: true });
    } catch (err) {
      console.log(err);
    }
  }
};
