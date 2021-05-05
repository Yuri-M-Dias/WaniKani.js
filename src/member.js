const endpoints = require('./endpoints');

module.exports = class Member {
  constructor (token) {
    const endpoint = new endpoints(token);

    this.token = token;
    this.timestamp = new Date();
    this.user = endpoint.user();
    this.lessons = endpoint.progressions();
    this.resets = endpoint.resets();
    this.reviews = endpoint.reviews();
    this.review_statistics = endpoint.review_stats();
    this.study_materials = endpoint.study_materials();
    this.summary = endpoint.summary();
  }
  
  async update_user(data) {
    return await endpoint.update_user(data);
  }

  async start_assignment() {
    return await endpoint.start_assignment(data);
  }

  async create_review(data) {
    return await endpoint.create_review(data);
  }

  async create_study_material(data) {
    return await endpoint.create_study_material(data);
  }

  async update_study_material() {
    return await endpoint.update_study_material(data);
  }
}
