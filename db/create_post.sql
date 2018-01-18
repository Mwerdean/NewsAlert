INSERT INTO create_post (auth0_id, title, content) VALUES ($1,$2,$3)
RETURNING *;