const endpoints = require('./endpoints');

module.exports = class Collection {
  constructor (token) {
    const endpoint = new endpoints(token);

    this.timestamp = new Date();
    this.srs = endpoint.srs();
    this.subject = endpoint.subjects();
    this.voice_actors = endpoint.voice_actors();
  }
}