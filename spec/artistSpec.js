const request = require('request');
const Artist = require('../model/artist.js');

let endpoint = 'http://localhost:3006/artists';

describe('artists', function () {
    it('should return 200 response code and more than 1 object', function (done) {
        request.get(endpoint,  async function (error, response) {
            let artists = JSON.parse(response.body);
            expect(response.statusCode).toEqual(200);
            expect(artists.length).toBeGreaterThan (0);
            done();
        });
    });
});
describe('artists', function () {
    it('should return 200 response code and Artist with id', function (done) {
        endpoint = endpoint + '/1'
        request.get(endpoint, async function (error, response) {
            let artistJson = JSON.parse(response.body);
            let artist = new  Artist ( artistJson['firstName'], artistJson['lastName'], artistJson['birthDate'],  artistJson['id'], artistJson['albums']);
            expect(response.statusCode).toEqual(200);
            expect(artist.firstName).toBe ('pepe');
            done();
        });
    });
});
