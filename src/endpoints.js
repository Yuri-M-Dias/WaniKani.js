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
    return response.data;
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
   * Create a review for the Endpoint's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-review
   */
  async create_review(data) {
    if (!data || !data.assignment_id || !data.subject_id || !data.incorrect_meaning_answers || !data.incorrect_reading_answers) return false;

    var body = {
      review: {}
    };

    try {
      body.review = data;
    } catch(err) {
      return false;
    }

    return await http(this.token, endpoints.create_review.method, endpoints.create_review.url, data, body);
  }

  /**
   * Create a study material for the Endpoint's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-study-material
  */
  async create_study_material(data) {
    if (!data || !data.data || !data.data.subject_id) return false;

    var body = {};

    body = data.data;

    return await http(this.token, endpoints.create_study_material.method, endpoints.create_study_material.url, data, body);
  }

  /**
   * Accepts an object of user preferences and updates the user pertaining to the Endpoint accordingly.
   * See https://docs.api.wanikani.com/20170710/#update-user-information
   */
  async update_user(data) {
    if (!data) return Promise.reject(new Error("Need data fields to update"));

    var body = {
      user: {
        preferences: data
      }
    };
    return await http(this.token, endpoints.update_user.method, endpoints.update_user.url, data, body);
  }

  /**
   * Starts an assignment (selected by given ID) for the Endpoint's user.
   * See https://docs.api.wanikani.com/20170710/#start-an-assignment
   */
  async start_assignment(id, data) {
    var url = endpoints.review_statistics.url;

    if (!id) return false;
    if (id) url = url + '/' + id + '/start';

    var body = {};

    try {
      if (data) {
        body = data;
      }
    } catch(err) {
      return false;
    }

    return await http(this.token, endpoints.start_assignment.method, url, data, body);
  }

  /**
   * Update a study material (selected by ID) for the Endpoint's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-study-material
   */
  async update_study_material(data) {
    var body = {
      study_material: {}
    };

    try {
      if (data) {
        body.study_material = data;
      }
    } catch(err) {
      return false;
    }

    return await http(this.token, endpoints.update_study_material.method, endpoints.update_study_material.url, data, body);
  }
}
