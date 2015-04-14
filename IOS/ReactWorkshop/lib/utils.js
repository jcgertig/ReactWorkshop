(function(){
  'use strict';

  function urlForQuery(path, data) {
    var querystring = '';
    if (data) {
      querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');
      querystring = `?${querystring}`;
    }

    return `http://1d1d2f92.ngrok.com/api/v1/${path}.json${querystring}`;
  }

  function _executeRequest(method, useHeaders, path, data, callback, user) {
    if (user && user.uuid.length > 0 && user.token.length > 0) {
      data.uuid = user.uuid;
      data.token = user.token;
    }
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        callback(request.responseText);
      } else {
        console.warn('error');
      }
    };

    if (!useHeaders) {
      request.open(method, urlForQuery(path, data));
    } else {
      var headers = Object.keys(data);
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        request.setRequestHeader(header, headers[header]);
      }

      request.open(method, urlForQuery(path));
    }

    request.send();
  }

  function _mergeObjects(obj1, obj2) {
    var obj3 = {};
    for (var attrname1 in obj1) { obj3[attrname1] = obj1[attrname1]; }
    for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
    return obj3;
  }

  var Utils = {
    getRequest: _executeRequest.bind(null, 'GET'),

    postRequest: _executeRequest.bind(null, 'POST'),

    mergeObjects: _mergeObjects.bind(null)
  };

  module.exports = Utils;
})();
