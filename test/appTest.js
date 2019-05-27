const expect = require('chai').expect;
const fetch = require('node-fetch');
const client_secret = "98fd6d72947f87cb9f1d6d96cfa0cde74aa612aa"
const api = 'https://api.github.com/users';

describe('API call', function () {
  it('It must return a JSON object', async () => {
    
    var response = await fetch(api);
    expect(response.status).to.be.equal(200);
    expect(client_secret)
          .to.be.a('string')
          .that.matches(/^[a-fA-F0-9]{8}/)
          .and.equal('98fd6d72947f87cb9f1d6d96cfa0cde74aa612aa');
    
    var user = await response.json();
    expect(user).to.be.an('Array');
    user.map(data => {
        expect(data.login).to.be.a('String');
        expect(data.id).to.be.a('Number');
    })
  });
});
