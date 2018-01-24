INSERT INTO create_reply (auth0_id, postid, content) VALUES ($1,$2,$3)
RETURNING *;