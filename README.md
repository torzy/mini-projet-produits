# crud Produits
- Install Django module: `pip install django`
- Run backend server: `python .\manage.py runserver`
- install Django rest framework `pip install djangorestframework`
- install Django CORS headers module `pip install django-cors-headers`


# Fichiers:
>> Le fichier ____init__.py__ est simplement un fichier vide qui indique que le dossier donné est un projet Python ou un module Python.

>> __asgi.py__ est le point d'entrée pour les serveurs web compatibles asgi.

>> __wsgi.py__ est le point d'entrée pour les serveurs web compatibles wsgi.

>> Le fichier __urls.py__ contient toutes les déclarations d'URL nécessaires pour ce projet.

>> Le fichier __settings.py__ contient tous les paramètres ou configurations nécessaires pour le projet.

>> __manage.py__ est une utilité en ligne de commande qui aide à interagir avec le projet Django.
 

## Base de donnèes: (SqLite)

![img.png](img/imgdb.png)

## APIs:

- GET :

![GET](img/img-get.png)

- SEARCH :

![img.png](img/img-search.png)

- GET ONE PRODUCT:

![img.png](img/img-get-1.png)

- ADD :

![img.png](img/img-add.png)

- PUT :

![img2.png](img/img-update.png)

- DELETE

![img.png](img/img-delete.png)

# Front End (React.Js)
# Fichiers:
>> Le fichier __Variables.js__ contient les uri comme l'url de l'api backend.

>> __App.js__ utilise le framework `react-router-dom` pour gérer les routes de l'application. L'application affiche un titre, une barre de navigation et un composant `Product` qui est rendu lorsque l'utilisateur accède à la route `/home`.
Le composant `App` est défini comme une fonction qui renvoie le JSX de l'application. Il utilise le composant `BrowserRouter` pour envelopper toute l'application et le composant `Routes` pour définir les routes de l'application.
La barre de navigation est créée avec le composant `NavLink` de `react-router-dom`. Il permet de créer des liens vers différentes routes de l'application.
Le composant `Product` est importé depuis le fichier `Product.js` et est défini comme une fonction qui renvoie le JSX du composant. Le composant `Product` affiche une liste de produits et permet à l'utilisateur de les ajouter, de les modifier et de les supprimer.
Le CSS est importé depuis le fichier `App.css` et est utilisé pour styliser l'application..

>> Le dossier __Pages__ contient les page __Home__ et __Produit__


- Create react app: `npx create-react-app my-app`
- Installer les modules: `npm i`
- Run server : `npm start`

### Interface:

![front-table.png](img/front-table.png)

### Modèle Ajout/Modifier Produit:

![front-search.png](img/front-search.png)
