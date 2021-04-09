const queryAllProductCategories =
`
SELECT "lookupValue", "lookupDescription"
  FROM "Lookup" 
 WHERE "lookupGroup" = 'Product'
   AND "isActive" = true
   AND "lookupName" = 'category'
  ORDER BY 1
`
export default queryAllProductCategories