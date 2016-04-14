/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2015-10-28 09:38:36
 * @version $Id$
 * localStorage
 */

(function () {
  'use strict';

  function storage () {
    var
      localStorage = window.localStorage;

    function get ( key ) {
      var
        value = localStorage.getItem(key) || '';

      try {
        return JSON.parse(value);
      }
      catch ( e ) {
        return value;
      }
    }

    function remove ( key ) {
      localStorage.removeItem(key);
    }

    function clear () {
      localStorage.clear();
    }

    function forEach ( callback ) {
      let
        i = 0,
        key;

      for (i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        callback(key, get(key));
      }
    }

    function set ( key, value ) {
      if ( typeof value === 'object' ) {
        value = JSON.stringify(value);
      }
      try {
        localStorage.setItem(key, value);
      }
      catch ( e ) {
        if ( e.name === 'QuotaExceededError' ) {
          clear();
          // console.log('已经超出本地存储限定大小!');
        }
      }
    }

    return {
      set: set,
      get: get,
      remove: remove,
      clear: clear,
      forEach: forEach
    }
  }

  if ( typeof define === 'function' && typeof define.amd === 'object' && define.amd ) {
    define(function () {
      return storage;
    });
  }
  else if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = storage;
  }
  else {
    window.storage = storage;
  }
}());
