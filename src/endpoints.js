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

  /**
   * Gets information about a user's review statistics.
   */
   async review_stats(data) {
    var url = endpoints.review_statistics.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.review_statistics.method, url, data);
  }

  /**
   * Gets information about a user's study materials.
   */
   async study_materials(data) {
    var url = endpoints.study_materials.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.study_materials.method, url, data);
  }

  /**
   * Gets information about WaniKani's subjects.
   */
  async subjects(data) {
    var url = endpoints.subjects.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.subjects.method, url, data);
  }

  /**
   * Gets a summary of a user's upcoming lessons for a user.
   */
   async summary(data) {
    var url = endpoints.summary.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.summary.method, url, data);
  }

  /**
   * Gets information about general spaced repetition systems.
   */
   async srs(data) {
    var url = endpoints.srs.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.srs.method, url, data);
  }

  /**
   * Gets general information pertaining to a specific user.
   */
  async user(data) {
    var response = await http(this.token, endpoints.user.method, endpoints.user.url, data);

    if (response.data) response = response.data;

    return response;
  }

  /**
   * Gets information about WaniKani's voice actors.
   */
   async voice_actors(data) {
    var url = endpoints.voice_actors.url;
    if (data && data.id) url = url + '/' + data.id;

    return await http(this.token, endpoints.voice_actors.method, url, data);
  }
  
  /**
   * Create a review for a user.
  */
  async create_review(data) {
    if (!data || !data.assignment_id || !data.subject_id || !data.incorrect_meaning_answers || !data.incorrect_reading_answers) return false;

    return await http(this.token, endpoints.create_review.method, endpoints.create_review.url, data, endpoints.create_review.body);
  }
  
  /**
   * Create a study material for a user.
  */
  async create_study_material(data) {
    if (!data || !data.subject_id) return false;

    return await http(this.token, endpoints.create_study_material.method, endpoints.create_study_material.url, data, endpoints.create_study_material.body);
  }
  
  async update_user(data) {
    return await http(this.token, endpoints.update_user.method, endpoints.update_user.url, data, endpoints.update_user.body);
  }

  async start_assignment(data) {
    var url = endpoints.review_statistics.url;
    if (data && data.id) url = url + '/' + data.id + '/start';
    
    return await http(this.token, endpoints.start_assignment.method, url, data, endpoints.start_assignment.body);
  }

  async update_study_material(data) {
    return await http(this.token, endpoints.update_study_material.method, endpoints.update_study_material.url, data, endpoints.update_study_material.body);
  }
}
