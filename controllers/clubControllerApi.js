let connection = require('../db');
let clubList = [];

exports.clubList = function (req, res) {
    var sql = "SELECT * FROM club";
    connection.query(sql, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ error: error });
        }
        else {
            clubList = resultSQL;
            res.status(200).json(clubList);
        }
    });
}


exports.clubNew = function (req, res) {

    var sql = "INSERT INTO club (nomClub) VALUES (?)";
    connection.query(sql, [req.body.nomClub], function (error, resultSQL) {
        if (error) {
            res.status(400).json({ 'message': error });
            
        } else {
            res.status(200).json({ 'message': 'Nouveau club ajouté avec succes' });
        }
    })
}


exports.clubUpdate = function (req, res) {

    let idclub = req.params.idclub;
    let club = req.body.nom;
    {
        var sql = "UPDATE Club set nomClub=? WHERE idclub = ?"
        connection.query(sql, [club, idclub], function (error, resultSQL) {
            if (error) {
                res.status(400).json({ 'message': error });
            } else {
                res.status(202).json({ 'message': 'Club modifié avec succes' });
            }
        });
    }
}


exports.clubDelete = function (req, response) {
    let idClub = req.params.idclub;
    let sqlClub = "DELETE FROM club WHERE idClub = ?";

    connection.query(sqlClub, [idClub], function (error, resultSQL) {
        if (error) {
            response.status(400).json({ error: error });
        } else {
            response.status(201).json({ message: "Club supprimé avec succes" });
        }
    });
}
