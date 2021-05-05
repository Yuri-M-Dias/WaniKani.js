const axios = require('axios');
const config = require('../config.json');

module.exports = async function req(token, method, endpoint, data=null, body=null) {
  var url = config.baseURL + endpoint;
  
  var response;
  var headers = {
    Authorization: 'Bearer ' + token
  };
  var body = {};

  if (data) {
    if (data.revision) headers['Wanikani-Revision'] = data.revision;
    if (data.modified) headers['If-Modified-Since'] = data.modified;
    if (data.nonematch) headers['If-None-Match'] = data.nonematch;

    if (data.filter) {
      url = url + '?';
      for (const key in data.filter) {
        url = url + key + '=' + data.filter[key] + '&';
      }
    }
    if (data.body) {
      body[body] = data.body;
    }
  }

  if (typeof(Http[method]) === 'function') return Http[method](token, url, headers, body);
  else return false;
}

class Http {
  static async get(token, url, headers) {
    try {
      response = await axios.get(url, { headers: headers });
    } catch(err) {
      if(!err.response) return err;

      return err.response.data;
    }

    if(!response) return false;

    return response.data;
  }

  static async post(token, url, headers, body) {
    try {
      response = await axios.post(
        url,
        {
          headers: headers,
          body: body
        }
      );
    } catch(err) {
      if(!err.response) return err;

      return err.response.data;
    }

    if(!response) return false;

    return response.data;
  }
  
  static async put(token, url, data, body) {
    try {
      response = await axios.put(
        url,
        {
          headers: headers,
          body: body
        }
      );
    } catch(err) {
      if(!err.response) return err;

      return err.response.data;
    }

    if(!response) return false;

    return response.data;
  }
}
