const Artist = require('../../model/artist.js');
const sqlConnection  = require('../../database/database.js');
const express = require('express');

// Create an Artist
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(404).send({
            message: "Artist content can not be empty"
        });
    }
    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const birthDate = req.body['birthDate'];

    const request = new sqlConnection.Request();
    request.input('firstName', sqlConnection.NVarChar , firstName);
    request.input('lastName', sqlConnection.NVarChar , lastName);
    request.input('birthdate', sqlConnection.Date , birthDate);

    request.query('INSERT INTO ARTIST (firstName, lastName, birthdate) VALUES (@firstName, @lastName, @birthDate)', (err, result) => { 
      if(err) {
        console.log(err);
      }
      else{
        res.json(
          CheckResult ( result )
        );
      }
    });

};

// returns all artist.
exports.findAll = (req, res) => { 
  sqlConnection.query('SELECT * FROM ARTIST', (err, rows, fields) => {
    if(err) {
      console.log(err);
    } 
    else {
      res.json(rows.recordset);
    }
});  
};

// Find a single artist by id
exports.find = async(req, res) => {
  const artistId = req.params['artistId']; 
  const request1 = new sqlConnection.Request();
  const request2 = new sqlConnection.Request();
  const res2 = await request2.input('id', sqlConnection.Int, artistId).query('SELECT al.* FROM artist a JOIN AlbumArtist aa on a.id = aa.artist_id JOIN album al on al.id = aa.album_id  Where a.id = @id');
  const res1 = await request1.input('id', sqlConnection.Int, artistId).query('SELECT * FROM ARTIST WHERE id = @id');

  if(typeof res1['recordset'] !== 'undefined' && res1['recordset'].length == 0)
    res.json('Artist with id: '+artistId+' not found');
  res.json( GetArtist ( res1['recordset'] [0], res2['recordset'] ));
};

// Update an artist
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(404).send({
            message: "Artist content can not be empty"
        });
    }
    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const birthDate = req.body['birthDate'];
    const id = req.body['id'];

    const request = new sqlConnection.Request();
    request.input('firstName', sqlConnection.NVarChar , firstName);
    request.input('lastName', sqlConnection.NVarChar , lastName);
    request.input('birthDate', sqlConnection.Date , birthDate);
    request.input('id', sqlConnection.Int , id);

    request.query('UPDATE ARTIST SET firstName = @firstName, lastName = @lastName, birthDate = @birthDate WHERE id = @id', (err, result) => { 
      if(err) {
        console.log(err);
      }
      else{
        res.json(
          CheckResult ( result )
        );
      }
    });
};

// Delete an artist by id
exports.delete = (req, res) => {
  const artistId = req.params['artistId'];
  const request = new sqlConnection.Request();
  request.input('id', sqlConnection.Int, artistId).query('DELETE FROM ALBUMARTIST WHERE artist_id = @id; DELETE FROM ARTIST WHERE id = @id;', (err, result) => { 
    if(err) {
      console.log(err);
    }
    else{
      res.json(
        CheckResult ( result )
      );
    }

  });
};

function GetArtist ( params, albums )
{ 
  if (typeof params !== 'undefined' )
    return new Artist( params['firstName'], params['lastName'], params['birthDate'], params['id'], albums);
}
function CheckResult ( params )
{
  let result = false;
  if( params['rowsAffected'] !== 'undefined' && params['rowsAffected'].length > 0){
    return params['rowsAffected'][0] > 0 || params['rowsAffected'][1] > 0 ;
  }
  return result; 
}