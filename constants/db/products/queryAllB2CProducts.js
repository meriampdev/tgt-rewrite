const queryAllB2CProducts = 
`SELECT p.*,
( SELECT array_to_json(array_agg(row_to_json(i.*))) AS array_to_json
       FROM ( SELECT "imageUrl", "isPrimary", "productImageId" from "ProductImage" i
               WHERE (i."productId" = p."productId")
                and i."isActive" = true
               order by 
               CASE 
                WHEN i."isPrimary" = true THEN 0
                ELSE 1
               END ASC, "productImageId" ) i
) AS images,
( SELECT row_to_json(r.*) AS array_to_json
       FROM ( SELECT count(*) as "reviewCount", SUM(rating)/count(*) as "averageRating" 
               FROM "ProductReview" r
	          WHERE r."productId" = p."productId" ) r
) as reviews
FROM "Product" p
WHERE p."isActive" = true
  AND p."isSellable" = true
ORDER BY p.name`
export default queryAllB2CProducts