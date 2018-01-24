DELETE FROM create_reply WHERE id = $1
RETURNING *;