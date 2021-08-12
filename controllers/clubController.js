let connection = require('../db');
let clubList = [];

// Route qui va générer la page avec la liste des clubs
exports.clubList = function (req, res)

{    
    var sql = "SELECT * FROM club";
    connection.query(sql,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            clubList = resultSQL;
            console.log(clubList);
            res.render('clubView.ejs', {clubs: clubList, idclub:'-1', nomClub:""});        

        }
    });
}

// Route qui va valider la creation d'un club (lorsque j'appuie sur le bouton "valider" de la vue)

exports.clubNew =  function(req, res) { 
    let idclub = req.body.idclub;
    let nomClub = req.body.nomClub;
    console.log(idclub);
    console.log(nomClub);
    // si le champs "idclub" qui est envoyé dans le body par le biais du champs caché dans la vue est -1 ca veut dire que le club n'existait pas
    if (idclub == -1)
    { 
        var sql = "INSERT INTO club (nomClub) VALUES (?)";
        connection.query(sql,[nomClub],function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                res.status(201).redirect('/club');
            }
        });
    }
    else if( idclub >=0 )
    {
        var sql = "UPDATE Club set nomClub=? WHERE idClub = ?"
        connection.query(sql, [nomClub,idclub], function(error,resultSQL){
            if(error){
                res.status(400).send(error);
            } else{
                res.status(202).redirect('/club');
            }
        });
    }
}

// Route qui va générer la page avec le club à modifier

exports.clubFormUpdate = function (req, res) {
    let idclub = req.params.idclub;
    connection.query("SELECT * FROM club WHERE idclub =?",idclub,function (error, resultSQL) {
        if (error) {
          response.status(400).send(error);
        } else {
            let club = resultSQL[0];
            res.render('clubView.ejs', {clubs: clubList, idclub:club.idclub, nomClub:club.nomClub});        
        }
      }
    );

}    

// Route qui va servir pour supprimé un club

exports.clubRemove = function (req, res) {
    let idClub = req.params.idclub;
    let sqlClub = "DELETE FROM club WHERE idClub = ?";

    connection.query(sqlClub, [idClub], function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(202).redirect('/club');
        }
    });
}


    
