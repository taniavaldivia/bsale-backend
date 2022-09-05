# BSale BackEnd Exam
by Tania Valdivia

### Project Resides in: http://dystopia-nft.io/
### It uses the API here: https://bsale-exam.herokuapp.com/

---

Contains the following endpoints:

## /products
Returns all existing products

## /categories
Returns all existing categories

## /search?search=string
- (query) search(optional): searches string by name

Returns product that match the search string by name.

## /products/:id
- (url param) id(required): product id 

Returns product with the matching id

## /products/categories/:id
- (url param) id(required): category id

Returns product with the matching category id

