# What It Does

Jquery.metacookie operates on nested/bundled cookies, generally having the format

key=value|key=value|key=value


# Public Methods

* $.setCookie(name, value [, expires] [, path] [, domain] [, secure]) - Sets a cookie; default values are expires="1 year", path="/", domain=window.location.hostname, secure=""
* $.getCookie(name) - Retrieve a cookie by name
* $.deleteCookie(name) - Delete a cookie by name
* $.setMetaCookie(subName, name, value) - Set a sub cookie within a meta cookie
* $.getMetaCookie(subName, name) - Retrieve the value for a subcookie in a meta cookie
* $.deleteMetaCookie(subName, name) - Removes a sub cookie within a meta cookie
* $.getDomain() - Reports cookie domain

