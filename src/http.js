const axios = require('axios');
const config = require('../config.json');

module.exports = async function req(token, method, endpoint, data=null, body=null) {
  var url = config.baseURL + endpoint;

  var headers = {
    Authorization: 'Bearer ' + token
  };

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
  }

  var response;

  try {
    response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: body
    });
  } catch(err) {
    if(!err.response) return Promise.reject(err);;

    return Promise.reject(err.response.data);
  }

  if(!response) return Promise.reject(new Error("No response."));

  return response.data;
}
