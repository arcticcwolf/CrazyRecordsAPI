module.exports = (app) =>{
    const albums = require('../controllers/album.controller.js');

    // Create a new Album
    app.post('/albums', albums.create);

    // Retrieve all Album
    app.get('/albums', albums.findAll);

    // Retrieve a single Album wAlbumith AlbumId
    app.get('/albums/:albumId', albums.find);

    // Update a Note with AlbumId
    app.post('/albumUpdate', albums.update);

    // Delete a Note with AlbumId
    app.get('/albumDelete/:albumId', albums.delete);

    //Attach to an Artist
    app.post('/albumAttach/:albumId/:artistId', albums.attach);

    //Deattach to an Artist
    app.post('/albumDettach/:albumId/:artistId', albums.deattach);
}