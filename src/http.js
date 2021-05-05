const axios = require('axios');
const config = require('../config.json');

module.exports = async function req(token, method, endpoint, data=null, body_value=null) {
  var url = config.baseURL + endpoint;
  
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
      if (body_value) {
        body[body_value] = data.body;
      } else {
        body = data.body;
      }
    }
  }

  var response;

  console.log(body)

  try {
    response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: body
    });
  } catch(err) {
    if(!err.response) return err;

    return err.response.data;
  }

  if(!response) return false;

  return response.data;
}
