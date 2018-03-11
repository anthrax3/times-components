"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addMissingProtocol = function addMissingProtocol(uri) {
  return uri.startsWith("//") ? "https:" + uri : uri;
};

exports.default = addMissingProtocol;