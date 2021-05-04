const http = require('./http');
const endpoints = require('../config.json').endpoints;

module.exports = class Endpoints {
  constructor(token) {
    this.token = token;
  }

  /**
   * Gets a single assignment, specified by ID, or a list of all assignments if ID is not included.
   */
  async assignments(data) {
    var url = endpoints.assignments.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.assignments.method, url, data);
  }

  /**
   * Gets a single progression pertaining to a user, specified by ID, or a list of all progressions pertaining to a user if ID is not included.
   */
  async progressions(data) {
    var url = endpoints.level_progressions.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.level_progressions.method, url, data);
  }

  /**
   * Gets information about a user's resets.
   */
   async resets(data) {
    var url = endpoints.resets.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.resets.method, url, data);
  }

  /**
   * Gets information about a user's resets.
   */
   async reviews(data) {
    var url = endpoints.reviews.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.reviews.method, url, data);
  }

  async create_review(data) {
    if (data && data.assignment_id && data.subject_id && data.incorrect_meaning_answers	&& data.incorrect_reading_answers);

    return await http(this.token, endpoints.create_review, endpoints.create_review.url, data);
  }
}