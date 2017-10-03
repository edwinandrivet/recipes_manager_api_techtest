# recipes_manager_api_techtest

Little REST API to manage recipes

# To get started
## Requirements
* PostgreSQL (tested on Debian 8.5 with PostgreSQL 9.4)
On Debian-based distributions such as Ubuntu it would be:
```bash
# apt-get install postgresql postgresql-client
```
* (optional): pgadmin3 for a GUI administration tool

## Configure PostgreSQL
With pgadmin3, it should be simple to create the server and the database.
Both the machine configuration and the Sequelize configuration should match.
The Sequelize one is located in /routes/index.js currently with my personnal configuration:
```javascript
// In order: database, username, password
const sequelize = new Sequelize('tech_test', 'tech_test', 'TEST', {
	dialect: 'postgres',
	host: 'localhost'
});
```

## Install all the dependencies
```bash
$ npm install
```

## Let's start the server
This will start nodemon. This way, no need to manually restart the server in case of server modifications.
```bash
$ npm run start
```

## Examples
I used the python tool HTTPie for these.

Create a recipe:
```bash
$ http --json POST localhost:3000/api/recipes category="Entrée" ingredients:='{"pain: "", "terrine": "200g", "cornichons": ""}' preparation="Placer la terrine sur le pain et bien tartiner. Rajouter quelques cornichons dessus." title="Pain avec terrine de campagne" 
``

Get all available recipes:
```bash
$ http --json GET localhost:3000/api/recipes
```
```bash
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 30 Aug 2016 17:56:56 GMT
Transfer-Encoding: chunked
cache-control: no-cache
content-encoding: gzip
content-type: application/json; charset=utf-8
vary: accept-encoding
[
    {
        "category": "Boisson",
        "createdAt": "2016-08-30T17:06:15.447Z",
        "id": 1,
        "ingredients": {
            "bac à glaçons": "",
            "fruits rouges (mûres / framboises / myrtilles / groseilles / etc.)": ""
        },
        "preparation": "Placer un fruits dans chaque compartiment du bac à glaçon.Couvrir d'eau et placer au\ncongélateur au moins 3h.Ces superbes glaçons rafraîchiront vos boissons en leur donnant un petit goût fruité.",
        "title": "Glaçons aux fruits rouges",
        "updatedAt": "2016-08-30T17:06:15.447Z"
    },
     {
        "category": "Plat principal",
        "createdAt": "2016-08-30T17:21:08.967Z",
        "id": 2,
        "ingredients": {
            "camembert fait mais ferme": "1",
            "càs dhuile dolive": "1",
            "herbes de provence ou des brins de thym": "",
            "papier daluminium": ""
        },
        "preparation": "Verser un filet d'huile d'olive au centre d'un papier d'aluminium. Poser le camembert dessus.Verser le reste de l'huile d'olive sur le camembert et les herbes.Fermer l'aluminium en papillote et mettre dans les braises du barbecue.",
        "title": "Camembert à la braise",
        "updatedAt": "2016-08-30T17:21:08.967Z"
    }
]
```

Get a recipe by it's name:
```bash
$ http --json GET localhost:3000/api/recipes/"bad recipe name"
```
```bash
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 30 Aug 2016 18:06:10 GMT
Transfer-Encoding: chunked
cache-control: no-cache
content-encoding: gzip
content-type: text/html; charset=utf-8
vary: accept-encoding
                                                                                                                                                                                                                 
Unable to find recipe bad recipe name
```