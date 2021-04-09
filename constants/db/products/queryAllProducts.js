const queryAllProducts = 
`SELECT p.*,
( SELECT array_to_json(array_agg(row_to_json(i.*))) AS array_to_json
       FROM ( SELECT i."imageUrl"
               FROM "ProductImage" i
              WHERE (i."productId" = p."productId")) i) AS images
FROM "Product" p`
export default queryAllProducts