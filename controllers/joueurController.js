const Joueur = require('../models/joueur');

let connection = require('../db');
let joueurList = [];

// Route qui va générer la page d'acceuil
exports.joueurList = function (req, res) {

    var sql = "SELECT * FROM joueur left join club on joueur.club = club.idClub";

    connection.query(sql, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            joueurList = resultSQL;
            console.log(joueurList);
            res.render('joueurView.ejs', { joueurs: joueurList });
        }
    });
}


// Quand on soumet le formulaire avec le bouton "valider", cette methode est appelé 
// si le joueur existe déjà un update est appelé sinon un nouveau joueur est créé
exports.joueurNew = function (req, res) {
    let idjoueur = req.body.idjoueur;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let age = req.body.age;
    let taille = req.body.taille;
    let poids = req.body.poids;
    let force = req.body.force;
    let endurance = req.body.endurance;
    let vision = req.body.vision;
    let club = req.body.club;
    console.log(club); // --> récuperer les informations
    if (idjoueur == -1) // --> utilise les informations 
    {
        let joueurNew = new Joueur(nom, prenom, age, taille, poids, force, endurance, vision, club);

        var sql = "INSERT INTO Joueur set ?";
        connection.query(sql, joueurNew, function (error, resultSQL) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(201).redirect('/joueur');
            }
        });
    }

    else if (idjoueur >= 0) {

        let joueurUpdate = new Joueur(nom, prenom, age, taille, poids, force, endurance, vision, club);
        var sql = "UPDATE Joueur set ? WHERE idjoueur = ?"
        connection.query(sql, [joueurUpdate, idjoueur], function (error, resultSQL) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/joueur');
            }
        });
    }
}


// route qui va generer le formulaire pour créer un nouveau joueur
exports.joueurFormAdd = function (req, res) {
    let clubList;
    var sql = "SELECT * FROM club";
    connection.query(sql, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            clubList = resultSQL;
            res.render('joueurNew.ejs', { idjoueur: '-1', nom: '', prenom: '', age: '', poids: '', taille: '', force: '', endurance: '', vision: '', clubsList: clubList });
        }
    });
}

// route qui va generer le formulaire pour modifier un nouveau joueur
exports.joueurFormUpdate = function (request, response) {

    let idjoueur = request.params.idjoueur;

    let clubList;
    var sql = "SELECT * FROM club";
    connection.query(sql, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            clubList = resultSQL;
            connection.query("SELECT * FROM joueur WHERE idjoueur =?", idjoueur, function (error, resultSQL) {
                if (error) {
                    response.status(400).send(error);
                } else {
                    let joueur = resultSQL[0];
                    response.render("joueurNew.ejs", {
                        idjoueur: idjoueur, nom: joueur.nom, prenom: joueur.prenom, age: joueur.age, poids: joueur.poids,
                        taille: joueur.taille, force: joueur.force, endurance: joueur.endurance, vision: joueur.vision, clubsList: clubList
                    });
                }
            }
            );
        }
    });
}

// route pour supprimer un joueur
exports.joueurRemove = function (req, res) {
    let idJoueur = req.params.idjoueur;
    let sql = "DELETE FROM joueur WHERE idjoueur = ?";

    connection.query(sql, [idJoueur], function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(202).redirect('/joueur');
        }
    });

}


