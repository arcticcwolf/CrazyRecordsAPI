const Artist = require('../../model/artist.js');
const sqlConnection  = require('../../database/database.js');
const express = require('express');
const Album = require('../../model/album.js');

// Create a new Album
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(404).send({
            message: "Album content can not be empty"
        });
    }
    const releaseDate = req.body['releaseDate'];
    const title = req.body['title'];
    const rating = req.body['rating'];
    const year = req.body['year'];

    const request = new sqlConnection.Request();
    request.input('releaseDate', sqlConnection.Date , releaseDate);
    request.input('title', sqlConnection.NVarChar , title);
    request.input('rating', sqlConnection.Int , rating);
    request.input('year', sqlConnection.Int , year);

    request.query('INSERT INTO ALBUM (releaseDate, title, rating, year) VALUES (@releaseDate, @title,@rating , @year)', (err, result) => { 
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

// Returns all Albums.
exports.findAll = (req, res) => { 
  sqlConnection.query('SELECT * from Album', (err, rows, fields) => {
    if(err) {
      console.log(err);
    } 
    else {
      res.json(rows.recordset);
    }
  });  
};

// Get an album by id
exports.find = async(req, res) => {
  const artistId = req.params['albumId']; 
  const request1 = new sqlConnection.Request();
  const request2 = new sqlConnection.Request();
  const res2 = await request2.input('id', sqlConnection.Int, artistId).query('SELECT a.* FROM artist a JOIN AlbumArtist aa on a.id = aa.artist_id JOIN album al on al.id = aa.album_id  Where al.id = @id');
  const res1 = await request1.input('id', sqlConnection.Int, artistId).query('SELECT * FROM ALBUM WHERE id = @id');

  if(typeof res1['recordset'] !== 'undefined' && res1['recordset'].length == 0)
    res.json('Artist with id: '+artistId+' not found');
  res.json( GetAlbum ( res1['recordset'] [0], res2['recordset'] ));
};

// Update an album by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(404).send({
            message: "Album content can not be empty"
        });
    }
    const releaseDate = req.body['releaseDate'];
    const title = req.body['title'];
    const rating = req.body['rating'];
    const year = req.body['year'];
    const id = req.body['id'];

    const request = new sqlConnection.Request();
    request.input('releaseDate', sqlConnection.Date , releaseDate);
    request.input('title', sqlConnection.NVarChar , title);
    request.input('rating', sqlConnection.Int , rating);
    request.input('year', sqlConnection.Int , year);
    request.input('id', sqlConnection.Int , id);

    request.query('UPDATE ALBUM SET releaseDate = @releaseDate, rating = @rating, title = @title, year = @year WHERE id = @id', (err, result) => { 
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

// Delete an album
exports.delete = (req, res) => {
  const artistId = req.params['albumId'];
  const request = new sqlConnection.Request();
  request.input('id', sqlConnection.Int, artistId).query('DELETE FROM ALBUMARTIST WHERE album_id = @id; DELETE FROM ALBUM WHERE id = @id;', (err, result) => { 
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

// Attach an album to an artist
exports.attach = (req, res) =>{
  const albumId = req.params['albumId'];
  const artistId = req.params['artistId']; 
  const request = new sqlConnection.Request();
  request.input('albumId', sqlConnection.Int , albumId);
  request.input('artistId', sqlConnection.Int , artistId);
  request.query('INSERT INTO ALBUMARTIST (album_id, artist_id) values (@albumId, @artistId)', (err, result) => { 
    if(err) {
      console.log(err);
      return res.status(404).send({
        message: 'Album '+albumId+' cannot be attached to Artist '+artistId
    });
    }
    else{
      res.json(
        CheckResult ( result )
      );
    }
 
  });
}

exports.deattach = (req, res) =>{
  const albumId = req.params['albumId'];
  const artistId = req.params['artistId']; 
  const request = new sqlConnection.Request();
  request.input('albumId', sqlConnection.Int , albumId);
  request.input('artistId', sqlConnection.Int , artistId);
  
  request.query('DELETE FROM ALBUMARTIST WHERE album_id = @albumId and artist_id =  @artistId', (err, result) => { 

    if(err) {
      console.log(err);
      return res.status(404).send({
        message: 'Album '+albumId+' cannot be deattached from Artist '+artistId
    });
    }
    else{
      res.json(
        CheckResult ( result )
      );
    }
  });
}

function GetAlbum ( params, albums )
{ 
  if (typeof params !== 'undefined' )
    return new Album( params['releaseDate'], params['title'], params['rating'], params['year'], params['id'], albums);
}

function CheckResult ( params )
{
  let result = false;
  if( params['rowsAffected'] !== 'undefined' && params['rowsAffected'].length > 0){
    return params['rowsAffected'][0] > 0 || params['rowsAffected'][1] > 0 ;
  }
  return result; 
}
