const request = require('request');
const Album = require('../model/album.js');

let endpoint = 'http://localhost:3006/albums';

describe('albums', function () {
    it('should return 200 response code and more than 1 object', function (done) {
        request.get(endpoint, async function (error, response) {
            let albums = JSON.parse(response.body);
            expect(response.statusCode).toEqual(200);
            expect(albums.length).toBeGreaterThan (0);
            done();
        });
    });
});
describe('albums', function () {
    it('should return 200 response code and Album with id', function (done) {
        endpoint = endpoint + '/1'
        request.get(endpoint, async function (error, response) {
            let albumJson = JSON.parse(response.body);
            let album = new  Album ( albumJson['releaseDate'], albumJson['title'], albumJson['rating'],  albumJson['year'],  albumJson['id'], albumJson['artists']);
            expect(response.statusCode).toEqual(200);
            expect(album.title).toBe ('new album');
            done();
        });
    });
});