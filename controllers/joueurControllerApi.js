const Joueur = require('../models/joueur');

let connection = require('../db');
let joueurList = [];

exports.joueurList = function (req, res) {

    var sql = "SELECT * FROM joueur";

    connection.query(sql, function (error, resultSQL) //--> connection.query permet de faire un appel vers une BDD {
        if (error) {
            res.status(400).json({'message': error});
        }
        else {
            joueurList = resultSQL;
            res.status(200).json(joueurList); // --> status 200 permet de notifier que c'est accepté ET .json(joueurlist) = resultSQL 
        }
    });
}


exports.joueurNew = function (req, res) { 
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let age = req.body.age;
    let taille = req.body.taille;
    let poids = req.body.poids;
    let force = req.body.force;
    let endurance = req.body.endurance;
    let vision = req.body.vision;
    let club = req.body.club;

    let joueurNew = new Joueur(nom, prenom, age, taille, poids, force, endurance, vision, club);

    var sql = "INSERT INTO Joueur set ?";
    connection.query(sql, joueurNew, function (error, resultSQL) {
        if(error){
            res.status(400).json({'message': error});
        } else{
            res.status(201).json({'message': 'Joueur créé avec succès'});
        }
    });
}

exports.joueurUpdate = function (req, res) //--> permet d'extraire les informations, params --> recuperer dans l'url et le reste dans le {
    let idjoueur = req.params.idjoueur;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let age = req.body.age;
    let taille = req.body.taille;
    let poids = req.body.poids;
    let force = req.body.force;
    let endurance = req.body.endurance;
    let vision = req.body.vision;
    let club = req.body.club;

    let joueurUpdate = new Joueur(nom, prenom, age, taille, poids, force, endurance, vision, club);
    var sql = "UPDATE Joueur set ? WHERE idjoueur = ?"
    connection.query(sql, [joueurUpdate, idjoueur], function (error, resultSQL) {
        if(error){
            res.status(400).json({'message': error});
        } else{
            res.status(201).json({'message': 'Joueur modifié avec succès'});
        }
    });
}


exports.joueurDelete = function (req, res) {
    let idJoueur = req.params.idjoueur;
    let sql = "DELETE FROM joueur WHERE idjoueur = ?";

    connection.query(sql, [idJoueur], function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message': error});  
        
        } else{
            res.status(202).json({'message':'Delete réussi'});
        }
    });
}


