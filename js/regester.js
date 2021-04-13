var _accounts;


var parent = document.querySelector('.login');
var singin = document.querySelector('.singin');
var valid = document.querySelector('.valid');
var input_panel = document.querySelector('.input_panel');
var control_panel = document.querySelector('.control_panel');
var title = document.querySelector('.head');
var msg = document.querySelector('.title_ h1');
var name_ = document.querySelector('.Nam');
var email = document.querySelector('.Ema');
var pass = document.querySelector('.Pas');
var user_name = document.querySelector('.user_name');
var local = localStorage.getItem('Account');
valid.value = 'Regester'
if (local != null) {

    var info = JSON.parse(local);
    user_name.innerText = info.name;
}
singin.onclick = (e) => {
    if (input_panel.classList.contains('active')) {
        _SING_UI();
    } else {
        _REGESTER_UI();
    }
}

function _SING_UI() {
    input_panel.classList.remove('active');
    control_panel.classList.remove('active');
    input_panel.classList.add('des');
    control_panel.classList.add('des');
    singin.value = 'Sing In';
    title.innerHTML = 'Hello my Friend'
    msg.innerHTML = 'Create an Account';
    valid.setAttribute('onclick', 'Regester_()');
    valid.value = 'Regester'

}

function _REGESTER_UI() {
    input_panel.classList.add('active');
    control_panel.classList.add('active');
    input_panel.classList.remove('des');
    control_panel.classList.remove('des');
    singin.value = 'Sing Up';
    title.innerHTML = 'Welcome back!'
    msg.innerHTML = 'Sing in';
    valid.setAttribute('onclick', 'SingIn_()');
    valid.value = 'Sing In'

}
email.setAttribute('onkeyup', 'check()');
pass.setAttribute('onkeyup', 'check()');
name_.setAttribute('onkeyup', 'check()');
valid.addEventListener("load", check());
valid.setAttribute('onclick', 'Regester_()');

function SingIn_() {
    var _email = email.value;
    var _pass = pass.value;
    var state;
    var singin_request = new XMLHttpRequest();

    singin_request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 'none[]' || this.responseText == '[]') {}
            state = JSON.parse(this.responseText);
            user_name.innerText = state.name;
            login_panel.classList.remove('active');
            localStorage.setItem('Account', this.responseText);
            onaddCLick();

        } else {}
    }



    singin_request.open('GET', 'http://localhost/Movies-Web-App/php/Regester.php?name=&email=' + _email + '&pass=' + _pass + '&isregester=2', true);
    singin_request.send();

}

function Regester_() {
    var _email = email.value;
    var _pass = pass.value;
    var _name = name_.value;
    var accounts = new XMLHttpRequest();
    accounts.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            _accounts = JSON.parse(this.responseText);
            if (_accounts[0].number > 0) {
                email.style = "border:1px solid red";
            } else {
                Request_.open('GET', 'http://localhost/Movies-Web-App/php/Regester.php?name=' + _name + '&email=' + _email + '&pass=' + _pass + '&isregester=1', true);
                Request_.send();
                email.style = "border:none";


            }
        }
    }

    var Request_ = new XMLHttpRequest();
    Request_.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            valid.value = 'loged In'
            setTimeout(function() {
                _REGESTER_UI();;
            }, 500);

        }
    }

    accounts.open('GET', 'http://localhost/Movies-Web-App/php/Regester.php?name=&email=' + _email + '&pass=&isregester=0', true);
    accounts.send();
}

function check() {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

    if (name_.value.length == 0 || pass.value.length < 8 || !regex.test(email.value)) {
        valid.disabled = true;
        if (valid.value == 'Sing In') {
            valid.disabled = false;
        }
    } else {
        valid.disabled = false;
    }
}
var Logout_panel = document.querySelector('.logout');
var logout = document.querySelector('.log');
logout.onclick = function() {
    // localStorage.remove('Account')
    Logout_panel.classList.remove('active');
    user_name.innerText = 'log in';

    localStorage.removeItem('Account');
    onaddCLick();
}