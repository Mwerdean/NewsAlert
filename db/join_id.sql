SELECT
     * 
FROM 
    create_post 
INNER JOIN 
    users_fullstack_auth ON (create_post.auth0_id = users_fullstack_auth.auth0_id)
    