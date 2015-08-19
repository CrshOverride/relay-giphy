#!/usr/bin/env babel-node --optional es7.asyncFunctions

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Search,
  Gif,
  Images,
  Image,
  getGif,
  getSearch
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if(type === 'Gif') {
      return getGif(id);
    } else if (type === 'Search') {
      return getSearch(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if(obj instanceof Gif) {
      return gifType;
    } else if(obj instanceof Search) {
      return searchType;
    } else if(obj instanceof Images) {
      return imagesType;
    } else if(obj instanceof Image) {
      return imageType;
    } else {
      return null;
    }
  }
);

var imageType = new GraphQLObjectType({
  name: 'Image',
  description: 'A single Giphy image',
  fields: () => ({
    url: {
      type: GraphQLString,
      description: 'URL of the image'
    },
    width: {
      type: GraphQLInt,
      description: 'Width of the image'
    },
    height: {
      type: GraphQLInt,
      description: 'Height of the image'
    }
  })
});

var imagesType = new GraphQLObjectType({
  name: 'Images',
  description: 'An object representing different Giphy image representations',
  fields: () => ({
    fixed_height: {
      type: imageType,
      description: 'A fixed height animated gif'
    },
    fixed_width: {
      type: imageType,
      description: 'A fixed width animaged gif'
    }
  })
});

var gifType = new GraphQLObjectType({
  name: 'Gif',
  description: 'A giphy image',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The id of the giphy image'
    },
    type: {
      type: GraphQLString,
      description: 'The type of the image'
    },
    url: {
      type: GraphQLString,
      description: 'The URL of the image'
    },
    embed_url: {
      type: GraphQLString,
      description: 'The embeddable URL of the image'
    },
    images: {
      type: imagesType,
      description: 'All the Giphy!'
    }
  })
});

var searchType = new GraphQLObjectType({
  name: 'Search',
  description: 'A giphy search',
  fields: () => ({
    id: globalIdField('Search'),
    results: {
      type: new GraphQLList(gifType),
      description: 'Gify Search Results'
    }
  })
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    search: {
      type: searchType,
      args: {
        q: {
          description: 'The search term to search for',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { q }) => getSearch(q)
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType
});
