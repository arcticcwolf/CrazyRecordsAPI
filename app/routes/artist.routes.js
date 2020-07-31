module.exports = (app) =>{
    const artists = require('../controllers/artist.controller.js');

    // Create a new Album
    app.post('/artists', artists.create);

    // Retrieve all Albums
    app.get('/artists', artists.findAll);

    // Retrieve a single Album by id
    app.get('/artists/:artistId', artists.find);

    // Update an Album by id
    app.post('/artistUpdate/', artists.update);

    // Delete an Album with AlbumId
    app.get('/artistDelete/:artistId', artists.delete);
}