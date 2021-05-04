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

  async create_review() {
    // Under construction

    /*
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'POST',
        headers: requestHeaders,
        body: {
          "review": {
            "assignment_id": 1422,
            "incorrect_meaning_answers": 1,
            "incorrect_reading_answers": 2,
            "created_at": "2017-09-30T01:42:13.453291Z"
          }
        }
      });

      ---

      Name	                    Data Type	    Required?	Description
      assignment_id	            Integer	      true	    Unique identifier of the assignment. This or subject_id must be set.
      subject_id	              Integer     	true	    Unique identifier of the subject. This or assignment_id must be set.
      incorrect_meaning_answers	Integer	      true	    Must be zero or a positive number. This is the number of times the meaning was answered incorrectly.
      incorrect_reading_answers	Integer     	true	    Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that subjects with a type or radical do not quiz on readings. Thus, set this value to 0.
      created_at	              Date	        false 	  Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body. Must be in the past, but after assignment.available_at.
    */
  }

  async create_study_material() {
    // Under construction

    /*
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'POST',
        headers: requestHeaders,
        body: {
          "study_material": {
            "subject_id": 2,
            "meaning_note": "The two grounds is too much",
            "reading_note": "This is tsu much",
            "meaning_synonyms": [
              "double"
            ]
          }
        }
      });

      ---

      Name	            Data Type	        Required?	Description
      subject_id	      Integer	          true	    Unique identifier of the subject.
      meaning_note	    String	          false	    Meaning notes specific for the subject.
      reading_note	    String	          false	    Reading notes specific for the subject.
      meaning_synonyms	Array of Strings	false	    Meaning synonyms for the subject.
      */
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