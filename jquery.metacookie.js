jQuery.extend(true, (function(){
    
   var gCookieLife = '1 year', // cookies will expire in 1 year by default
     gMajorDelim = '|', // delimiter for sub-cookies in meta cookies
     gMinorDelim = '=', // delimiter between key-value pairs for sub-cookies w/in meta cookies
     gDomain = window.location.hostname;

    /**
     * set a cookie	
     */
    _setCookie = function (name, value, expires, path, domain, secure) {

  	  var cookieUnits = 24 * 60 * 60 * 1000, // default to day units
  	    permCookie = true,
  	    expDate = new Date(),
  	    cookieStr;

      if (!name || !value) {
		    if (console) {
		      console.log("ERROR: missing name or value for [" + name + "] -- cookie not set!");
		    }
		    return this;
	    }
	
		  expires = expires || gCookieLife;
	
	    if (expires.match(/year/)) {
		    expires	= parseInt(expires, 10) * 365 * cookieUnits;	    
	    }
	    else if (expires.match(/month/)) {
		    expires = parseInt(expires, 10) * 30 * cookieUnits;	    
	    }
	    else if (expires.match(/kill|remove|delete/)) {
		    expires = -1 * 365 * cookieUnits;	    
	    }
	    else {
	      permCookie = false;
				expires = parseInt(expires, 10);
	    }
				
	    if (permCookie) {
	      expDate.setTime(expDate.getTime() + expires);  
	    }
		
	    cookieStr = name + "=" + encodeURIComponent(value) 
		    + ((permCookie) ? "; expires=" + expDate.toGMTString() : "") 
		    + "; path=" + ((path) ? path : "/")
		    + "; domain=" + ((domain) ? domain : gDomain)
		    + ((secure) ? "; secure" : "");
	
	    document.cookie = cookieStr;
	
    };

    /**
     * retrieve a cookie by name
     */
    _getCookie = function (name) {
	    var cookieStr = document.cookie,
	      cookies = [],
	      result;
	
	    if (cookieStr) {
	      cookies = cookieStr.split(/;\s*/);
	    }
	
	    result = splitFind(cookies, name, '=');
	
	    return(unescape(result));
    };

    /**
     * delete a cookie by name
     */
    _deleteCookie = function (name) {
      return _setCookie(name, -1, 'kill');
    };

    /**
     * sort through a given array, splitting up each
     * element by a given delimiter into key/value pairs,
     * then find the value that corresponds to a given key.
     * (used to parse cookies)
     * @private
     */
    function splitFind(list, key, delim) {
	    var result, 
		    fields, 
		    tmp, 
		    len = list.length;
	
	    for (var i=0; i < len; i++) {
		    tmp = list[i];
		    if (tmp) {	
			    fields = tmp.split(delim);
			    if (fields[0] == key) {
				    result = fields[1];
				    break;		
			    }	
		    }
	    }
	
	    return(result);
    }

    /**
     * retrieve the value for a subcookie in a meta cookie.
     */
    _getMetaCookie = function (subName, name) {
	    var cookieStr = _getCookie(name);
	    return(splitFind(cookieStr.split(gMajorDelim), subName, gMinorDelim));
    };

    /**
     * set a sub cookie within a meta cookie.
     */
    _setMetaCookie = function (subName, name, value) {
	    var currentCookieVal = _getCookie(name),
	      subCookies = [],
	      temp = [],
	      newCookieVal = '',
	      fields,
	      i;
	
	    if (currentCookieVal) {
	      subCookies = currentCookieVal.split(gMajorDelim);
	    }
		  
	    // get all existing sub cookies
	    for (i in subCookies) {
		    fields = subCookies[i].split(gMinorDelim);
		    if (fields[0] && fields[1]) {
		      temp[fields[0]] = fields[1]; // build hash  
		    }	
	    }
		
	    // set or reset sub cookie
	    if (subName) {
	      temp[subName] = value;
	    }
		  
	    // rebuild cookie string
	    for (i in temp) {
		    // don't rebuild null values
		    if (temp[i]) {
		      newCookieVal += gMajorDelim + i + gMinorDelim + temp[i];   
		    }
	    }
	
	    return(_setCookie(name, newCookieVal));
    };

    /**
     * removes a sub cookie within a meta cookie
     */
    _deleteMetaCookie = function (subName, name) {
	    // set value to null so it's subcookie doesn't get re-added
	    return(_setMetaCookie(subName, name, null));
    };

		/**
		 * reports cookie domain
		 */
		_getDomain = function() {
			return gDomain;
		};



		return {
			setCookie: _setCookie,
			getCookie: _getCookie,
			deleteCookie: _deleteCookie,
			setMetaCookie: _setMetaCookie,
			getMetaCookie: _getMetaCookie,
			deleteMetaCookie: _deleteMetaCookie,
			getDomain: _getDomain
	};
})( ));

