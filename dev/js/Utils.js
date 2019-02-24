/** 
 * This class is used as namespace to contains generic method used every
 * where in the application.
 */
class Utils {

    /**
     * Adds a cookie to the browser.
     * @param {string} cname cookie's name/key.
     * @param {string} cvalue cookie's value.
     * @param {number} exdays cookie's duration.
     */
    static setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /**
     * Deletes a cookie from user's browser.
     * @param {string} cookie's name.
     */
    static getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    
    /**
     * Deletes all cookies from user's broswer. It was
     * created to be used on automatic tests.
     */
    static deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

export default Utils;
