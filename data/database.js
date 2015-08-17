#!/usr/bin/env babel-node --optional es7.asyncFunctions

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import sr from 'sync-request';

// Model types
class Gif extends Object {}
class Search extends Object {}
class Images extends Object {}
class Image extends Object {}

module.exports = {
  getGif: (id) => {
    var response = sr('GET', `http://api.giphy.com/v1/gifs/${id}?api_key=dc6zaTOxFJmzC`);
    var result = JSON.parse(response.getBody('utf8'));
    return result.data;
  },
  getSearch: (id) => {
    var response = sr('GET', `http://api.giphy.com/v1/gifs/search?q=funny%20cat&api_key=dc6zaTOxFJmzC`);
    var body = JSON.parse(response.getBody('utf8'));
    var result = new Search();
    result.results = body.data;
    return result;
  },
  Gif,
  Search
};
