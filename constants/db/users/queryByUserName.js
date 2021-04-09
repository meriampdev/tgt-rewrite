const queryByUserName = 
`SELECT u.*,
(  SELECT array_to_json( array_agg(r."role") )
               FROM "AppUserRole" r
              WHERE r."appUserId" = u."appUserId"
			    AND r."isActive" = true 
) AS roles,
(  SELECT array_to_json( array_agg(a."appMenuPath") )
               FROM "AppUserMenuAccess" a
              WHERE a."appUserId" = u."appUserId"
			    AND a."isActive" = true 
) AS "menuAccess",
( SELECT array_to_json(array_agg(r.*)) AS array_to_json
       FROM ( SELECT r."appAPIRoutePath", r."appAPIMethod"
               FROM "AppUserAPIRouteAccess" r
              WHERE (r."appUserId" = u."appUserId") 
			    AND r."isActive" = true ) r 
) AS "apiRouteAccess"
FROM "AppUser" u
WHERE u."appUserName" = $1`
export default queryByUserName