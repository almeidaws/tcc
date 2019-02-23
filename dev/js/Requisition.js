import Utils from './Utils.js';

const U = Utils;

class Requisition {
    static login(email, password, error, success) {
        const logged = (data, status) => {
            U.setCookie('id', data.id, 365);            
            U.setCookie('token', data.token, 365);            
            Requisition.userInfo(data.id, data.token, error, () => {
                if (success) success();
                location.reload();
            });
        }
        $.ajax('users/tokens', {
            method: 'POST',
            success: logged,
            error: (res) => { if (error) error(res.status) },
            data: { email, password },
        });
    }

    static userInfo(id, token, error, success) {
        const retrieved = (data, status) => {
           U.setCookie('name', data.name, 365);
           U.setCookie('email', data.email, 365);
           if (success) success();
        };
        $.ajax('users/' + id, {
            success: retrieved,
            error: (res) => { if (error) error(res.status) },
            headers: { Authorization: token },
        });
    }

    static register(name,email, password, error) {
        const user = (data, status) => {            
            Requisition.register(name,email,password,error,() => {
                if(error) error(error.status);
            })
        }
        $.ajax('users/', {
            method: 'POST',
            success: user,
            error: (res) => { if (error) error(res.status) }
        });
    }
}

export default Requisition;
