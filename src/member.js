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
  
  /**
   * Accepts an object of user preferences and updates the Member's user accordingly.
   * See https://docs.api.wanikani.com/20170710/#update-user-information
   */
  async update_user(data) {
    if (!data) return false;

    return await this.endpoint.update_user(data);
  }

  /**
   * Starts an assignment (selected by given ID) for the Member's user.
   * See https://docs.api.wanikani.com/20170710/#start-an-assignment
   */
  async start_assignment(id, data) {
    if (!id) return false;

    return await this.endpoint.start_assignment(id, data);
  }

  /**
   * Create a review for the Member's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-review
   */
  async create_review(data) {
    if (!data) return false;

    return await this.endpoint.create_review(data);
  }

  /**
   * Create a study material for the Member's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-study-material
   */
  async create_study_material(data) {
    if (!data) return false;

    return await this.endpoint.create_study_material(data);
  }

  /**
   * Update a study material (selected by ID) for the Member's user.
   * See https://docs.api.wanikani.com/20170710/#create-a-study-material
   */
  async update_study_material(id, data) {
    if (!id || !data) return false;

    return await this.endpoint.update_study_material(id,data);
  }
}
