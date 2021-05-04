const axios = require('axios');
const config = require('../config.json');

module.exports = async function req(token, method, endpoint, data=null) {
  var url = config.baseURL + endpoint;

  if (typeof(Http[method]) === 'function') return Http[method](token, url, data);
  else return false;
}

class Http {
  static async get(token, url, data) {
    var response;
    var headers = {
      Authorization: 'Bearer ' + token
    };

    if (data) {
      if (data.revision) headers['Wanikani-Revision'] = data.revision;
      if (data.modified) headers['If-Modified-Since'] = data.modified;
      if (data.modified) headers['If-None-Match'] = data.nonematch;
      
      if (data.filter) {
        url = url + '?';
        for (const key in data.filter) {
          url = url + key + '=' + data.filter[key] + '&';
        }
      }
    }

    console.log(url);

    try {
      response = await axios.get(url, { headers: headers });
    } catch(err) {
      if(!err.response) return err;

      return err.response.data;
    }

    if(!response) return false;

    return response.data;
  }

  static async post(token, url, data) {
    var response;
    var headers = {
      Authorization: 'Bearer ' + token
    };
    var body = {};

    if (data) {
      if (data.revision) headers['Wanikani-Revision'] = data.revision;
      if (data.modified) headers['If-Modified-Since'] = data.modified;

      if (data.filter) {
        url = url + '?';
        for (const key in data.filter) {
          url = url + key + '=' + data.filter[key] + '&';
        }
      }
      if (data.body) {
        body[config.endpoints.create_review.body] = data.body;
      }
    }

    try {
      response = await axios.get(url, { headers: headers });
    } catch(err) {
      if(!err.response) return err;

      return err.response.data;
    }

    if(!response) return false;

    return response.data;
  }
}