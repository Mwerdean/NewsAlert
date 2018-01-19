DELETE FROM create_post WHERE id = $1
RETURNING *;