# Find a Friend API

The find a friend API is the third challenge of the Ignite Backend course from Rocketseat. Here I created an API to register ORG and pets for adoption. This API has the following routes and features:

* Create an organization and then login with it
* Authorization with JWT applied in pet register
* Create a pet
* Filter pets by the registered state and his characteristics

The routes are the following:
* `[GET] /pet/:petId` : Specific pet search by ID
* `[GET] /pets/:state?filters` : Search all pets by state and optional filters
* `[POST] /pet` : Create a pet
* `[POST] /org` : Create an organization
* `[POST] /org/login` : Login with an organization