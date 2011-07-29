// Object.toQueryString from MooTools Core
jasmine.toQueryString = function(object, base){
	var queryString = [];

	for (var i in object) (function(value, key){
		if (base) key = base + '[' + key + ']';
		var result;
		if (jasmine.isArray_(value)){
			var qs = {};
			for (var j = 0; j < value.length; j++)
				qs[j] = value[j];
			result = jasmine.toQueryString(qs, key);
		} else if (typeof value == 'object'){
			result = jasmine.toQueryString(value, key);
		} else {
			result = key + '=' + encodeURIComponent(value);
		}

		if (value != undefined) queryString.push(result);
	})(object[i], i);

	return queryString.join('&');
};

// String.parseQueryString from MooTools More
jasmine.parseQueryString = function(string){
	var vars = string.split(/[&;]/),
		object = {};

	if (!vars.length) return object;

	for(var i = 0; i < vars.length; i++) (function(val){
		var index = val.indexOf('='),
			keys = index < 0 ? [''] : val.substr(0, index).match(/[^\]\[]+/g),
			value = decodeURIComponent(val.substr(index + 1));

		for(var j = 0; j < keys.length; j++) (function(key, i){
			var current = object[key];
			if(i < keys.length - 1)
				object = object[key] = current || {};
			else if(current != null && typeof current.length == 'number')
				current.push(value);
			else
				object[key] = current != null ? [current, value] : value;
		})(keys[j], j);

	})(vars[i]);

	return object;
};
