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

  /*
   * 
   */
  async update_user(data) {
    // Under construction

    /*
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'PUT',
        headers: requestHeaders,
        body: {
          "user": {
            "preferences": {
              "lessons_autoplay_audio": true,
              "lessons_batch_size": 3,
              "lessons_presentation_order": "shuffled",
              "reviews_autoplay_audio": true,
              "reviews_display_srs_indicator": false
            }
          }
        }
      });

      ---

      Name	                        Data Type	Required?
      default_voice_actor_id	      Integer	  false
      lessons_autoplay_audio	      Boolean	  false
      lessons_batch_size	          Integer	  false
      lessons_presentation_order	  String  	false
      reviews_autoplay_audio	      Boolean	  false
      reviews_display_srs_indicator	Boolean	  false
    */
  }

  async start_assignment() {
    // Under construction

    /*
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'PUT',
        headers: requestHeaders,
        body: {
          "started_at": "2017-09-05T23:41:28.980679Z"
        }
      });

      ---

      Name	      Data Type	Required?
      started_at	Date	    false
    */
  }

  async create_review(data) {
    if (!data || !data.assignment_id || !data.subject_id || !data.incorrect_meaning_answers || !data.incorrect_reading_answers) return false;
    return await endpoint.create_review(data);
  }

  async create_study_material(data) {
    // Under construction
    if (!data || !data.subject_id) return false;
    return await endpoint.create_study_material(data);
  }

  async update_study_material() {
    // Under construction

    /*
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'PUT',
        headers: requestHeaders,
        body: {
          "study_material": {
            "meaning_note": "The two grounds are on top of each other",
            "reading_note": "This is too tsu much",
            "meaning_synonyms": [
              "double",
              "twice"
            ]
          }
        }
      });

      ---

      Name	            Data Type	        Required?	Description
      meaning_note	    String	          false	    Meaning notes specific for the subject.
      reading_note	    String	          false	    Reading notes specific for the subject.
      meaning_synonyms	Array of Strings	false	    Meaning synonyms for the subject.
    */
  }
}
