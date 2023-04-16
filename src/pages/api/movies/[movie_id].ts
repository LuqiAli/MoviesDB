import pool from "../../../../db";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const query = `SELECT movies.movie_id, movie_name, movie_rating, ARRAY_AGG(tags.tag_id) as tag_ids, ARRAY_AGG(tag_titles) as tag_titles, ARRAY_AGG(tag_color) as tag_colors FROM movies JOIN movie_tags ON movie_tags.movie_id = movies.movie_id JOIN tags ON tags.tag_id = movie_tags.tag_id GROUP BY movies.movie_id HAVING movies.movie_id = ${req.query.movie_id};`;

      const result = await pool.query(query);

      res.status(200).send({ data: result.rows });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    // const body = JSON.parse(req.body)

    try {
      const body = JSON.parse(req.body);
      let genres = body.genres;
      let extraQuery = "";

      for (let i = 0; i < genres.length; i++) {
        extraQuery += ` (${req.query.movie_id}, ${genres[i]}),`;
      }

      let final = extraQuery.slice(0, extraQuery.lastIndexOf(","));

      const query = `DELETE FROM movie_tags WHERE movie_id = ${req.query.movie_id}; INSERT INTO movie_tags(movie_id, tag_id) VALUES${final}; UPDATE movies SET movie_name = '${body.title}', movie_rating = ${body.rating} WHERE movie_id = ${req.query.movie_id};`;

      await pool.query(query);
      res.status(201).send({ status: "success" });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "DELETE") {
    try {
      const query = `DELETE FROM movies WHERE movie_id = ${req.query.movie_id};`;

      await pool.query(query);
      res.status(204).end();
    } catch (err) {
      console.log(err);
    }
  }
};
