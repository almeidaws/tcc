const R = {
    login: (email, password, error, success) => {
        const logged = (data, status) => {
            setCookie('id', data.id, 365);            
            setCookie('token', data.token, 365);            
            R.userInfo(data.id, data.token, error, () => {
                if (success) success();
                location.reload();
            });
        }
        $.ajax('users/tokens', {
            method: 'POST',
            success: logged,
            error: (_, status) => { if (error) error(status) },
            data: { email, password },
        });
    },
    userInfo: (id, token, error, success) => {
        const retrieved = (data, status) => {
           setCookie('name', data.name, 365);
           setCookie('email', data.email, 365);
           if (success) success();
        };
        $.ajax('users/' + id, {
            success: retrieved,
            error: (_, status) => { if (error) error(status) },
            headers: { Authorization: token },
        });
    },
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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
