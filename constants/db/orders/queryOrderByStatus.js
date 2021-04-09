`SELECT o.*,
        to_char(o."orderDate", 'Month DD, YYYY') as "orderDateText",
       (SELECT sum( (d."quantityOrdered" - d."quantityCancelled") * d."unitPrice") as "totalAmount"
		  FROM "OrderDetail" d
		 WHERE d."orderId" = o."orderId"
	   ) As "totalAmount",
	   (SELECT Coalesce(sum(p."amountPaid"),0) as "amountPaid"
		  FROM "OrderPayment" p
		 WHERE p."orderId" = o."orderId"
	   ) As "amountPaid",
    ( SELECT array_to_json(array_agg(row_to_json(i.*) ) ) AS array_to_json
           FROM ( SELECT d.*,
				         p."name",
				         p."imageUrl"
                   FROM "OrderDetail" d,
				        "Product" p
                  WHERE d."orderId" = o."orderId" AND d."productId" = p."productId") i
	) AS "lines"
   FROM "Order" o
  WHERE o."isActive" = true
    AND o."orderStatus" = $1`
export default queryOrderByStatus