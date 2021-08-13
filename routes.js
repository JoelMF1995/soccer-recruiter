let express = require('express');
let router = express.Router();

// Importation des controllers afin de les liers aux routes
var joueurController = require('./controllers/joueurController');
var clubController = require('./Controllers/clubController');
var joueurControllerApi = require('./Controllers/joueurControllerApi');
var clubControllerApi = require('./Controllers/clubControllerApi');

// url de base (acceuil)
router.get('/', (request, response) => response.redirect('/joueur'));


// Les routes API - JOUEUR

// Renvoie la liste des joueurs 
router.get('/api/joueur', joueurControllerApi.joueurList);
// Route POST pour créer un nouveau joueur - Renvoie une reponse en json en cas de succès
router.post('/api/joueur/add', joueurControllerApi.joueurNew);
// Route pour modifié un joueur sur base du PARAM "idjoueur"
router.put('/api/joueur/update/:idjoueur', joueurControllerApi.joueurUpdate);
// Route pour supprimer un joueur sur base du PARAM "idjoueur"
router.delete('/api/joueur/delete/:idjoueur', joueurControllerApi.joueurDelete);

// Les routes API - Club

// Renvoie la liste des clubs 
router.get('/api/club', clubControllerApi.clubList);
// Route POST pour créer un nouveau club - Renvoie une reponse en json en cas de succès
router.post('/api/club/add', clubControllerApi.clubNew);
// Route pour modifié un club sur base du PARAM "idjoueur"
router.put('/api/club/update/:idclub', clubControllerApi.clubUpdate);
// Route pour supprimer un club sur base du PARAM "idjoueur"
router.delete('/api/club/delete/:idclub', clubControllerApi.clubDelete);


// Les Routes pour le rendu des views

// Affiche la page avec la liste des joueurs
router.get('/joueur', joueurController.joueurList);
// Affiche le formulaire pour créer un joueur
router.get('/joueur/add', joueurController.joueurFormAdd);
// quand on clique le bouton "Ajouter" de la vue "joueurFormAdd" cette route ci est appelée pour valider la création, on es ensuite rediriger vers l'acceuil
router.post('/joueur/new', joueurController.joueurNew);
// pour generer la page avec les champs prérempli pour modifier un joueur
router.get('/joueur/update/:idjoueur', joueurController.joueurFormUpdate);
// Permet de supprimer un joueur sur base de son id
router.get('/joueur/delete/:idjoueur', joueurController.joueurRemove);


// Les routes en lien avec CLUB
// Affiche la page avec la liste des club
router.get('/club', clubController.clubList);
// Affiche le formulaire pour créer un club
router.post('/club/new', clubController.clubNew);
// Permet de modifier le nom d'un club
router.get('/club/update/:idclub', clubController.clubFormUpdate);
// Permet de supprimer un club sur base de son id
router.get('/club/delete/:idclub', clubController.clubRemove);




module.exports = router;
