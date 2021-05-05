const endpoints = require('./endpoints');

module.exports = class Member {
  constructor (token) {
    this.token = token;
    this.timestamp = new Date();
    this.endpoint = new endpoints(token);
    this.user = this.endpoint.user();
    this.lessons = this.endpoint.progressions();
    this.resets = this.endpoint.resets();
    this.reviews = this.endpoint.reviews();
    this.review_statistics = this.endpoint.review_stats();
    this.study_materials = this.endpoint.study_materials();
    this.summary = this.endpoint.summary();
  }
  
  async update_user(data) {
    return await this.endpoint.update_user(data);
  }

  async start_assignment() {
    return await this.endpoint.start_assignment(data);
  }

  async create_review(data) {
    return await this.endpoint.create_review(data);
  }

  async create_study_material(data) {
    return await this.endpoint.create_study_material(data);
  }

  async update_study_material() {
    return await this.endpoint.update_study_material(data);
  }
}
