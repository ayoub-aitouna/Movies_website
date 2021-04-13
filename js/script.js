///get data from php Server using Ajax
var request_ = new XMLHttpRequest();
var object;
var state = {
    'querySet': object,
    'page': 1,
    'rows': 12,
    'window': 5,
}
request_.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        try {
            object = JSON.parse(this.responseText);
            state.querySet = object;
            page_reset();
            pagination_reset();
            getQuerylist();
            onaddCLick();
        } catch (error) {

        }

    }
}

fetch("http://localhost/Movies-Web-App/script.php?q=&c=&t=", {
        mode: 'cors'
    }).then(
        js => {
            return js.json();
        }
    ).then(data => {
        state.querySet = data;
        page_reset();
        pagination_reset();
        getQuerylist();
        onaddCLick();
    })
    // request_.open("GET", "http://localhost/Movies-Web-App/script.php?q=&c=&t=", true);
    // request_.send();
    ///////////////////////////////////////

var list = document.querySelectorAll('.menu_li .ul .li');


var content
list.forEach(element => {
    element.setAttribute('onclick', 'list_click(this)')
});
list[3].setAttribute('onclick', 'alter()');


function alter() {
    let ge = document.querySelector('.ge ul');
    list.forEach(element => {
        element.querySelector('.content')
            .style.margin = '0 0 0 20%';

    });
    list[3].querySelector('.content').style.margin = '0 0 0 24%';
    ge.style.display = 'block'
    let ge_list = document.querySelectorAll('.ge ul li');
    ge_list.forEach(element => {
        element.setAttribute('onclick', 'ge_click(this)')

    });


}

function ge_click(e) {
    document.querySelector('.body h3').innerText = e.innerText
    let Container = document.querySelector('.MoviesList');
    Container.innerHTML = '';
    request_.open("GET", "http://localhost/Movies-Web-App/script.php?q=" + e.innerText + "&c=&t=", true);
    request_.send();
}

function list_click(e) {
    let ge = document.querySelector('.ge ul');
    ge.style.display = 'none'
    list.forEach(element => {
        element.querySelector('.content')
            .style.margin = '0 0 0 20%';
    });
    e.querySelector('.content').style.margin = '0 0 0 24%';
    document.querySelector('.body h3').innerText = e.querySelector('.content').innerText
}


function setMoviesList(e) {
    // let name, category, Rate, Poster, background, trailer, Movie, TvShow;
    var Item_holder =
        `<li class="_li_item_container_">
            <div class="add">
                <div class="cnt">
                    <div class="icon_container">
                        <i class="far fa-plus-square add_icon"></i>
                        <i class="far fa-check-square _done_icon_"></i>
                    </div>
                    <div class="message">Add To Watch List</div>
                </div>
             </div>
            <a style="text-decoration: none;" href="movie.html">
                <div class="poster">
                    <div class="rate">` + e.Rate + `</div>
                    <img src="` + e.Poster + `" class="Movoie_img" alt="" srcset="">
                </div>
                <h5>` + e.name + `</h5>
                <h6>` + e.category + `</h6>
                <div class="id" style="display:none">` + e.movie_ID + `</div>
            </a>
        </li>`;
    let Container = document.querySelector('.MoviesList');
    Container.innerHTML += Item_holder;
}
var Coming_Soon = document.querySelector('.Coming_Soon');
var Trending = document.querySelector('.Trending');
var Home = document.querySelector('.Home');
var watchlist = document.querySelector('.watchlist');

Coming_Soon.onclick = (e) => {
    page_reset();
    request_.open("GET", "http://localhost/Movies-Web-App/script.php?q=&c=true&t=", true);
    request_.send();
}
Trending.onclick = (e) => {
    page_reset();
    request_.open("GET", "http://localhost/Movies-Web-App/script.php?q=&c=&t=true", true);
    request_.send();

}
Home.onclick = (e) => {
    page_reset();
    request_.open("GET", "http://localhost/Movies-Web-App/script.php?q=&c=&t=", true);
    request_.send();

}
watchlist.onclick = (e) => {
    page_reset();
    var account = localStorage.getItem('Account');
    var info = JSON.parse(account);
    if (account != null) {
        fetch('http://localhost/Movies-Web-App/php/watchlist.php?id=' + info.id + '&movie=&setStatue=read')
            .then(res => res.json())
            .then(data => {
                var _watch_list_ = Array();
                let i = 0;
                state.querySet.forEach(element => {
                    if (DoesContains(data, element.movie_ID)) {
                        _watch_list_[i] = element;
                        i++;
                    }
                })
                state.querySet = _watch_list_;
                getQuerylist();
                ManageAddandDelete();
            });
    }
}

function ManageAddandDelete() {

}

function page_reset() {
    let Container = document.querySelector('.MoviesList');
    Container.innerHTML = '';
}
var login_panel = document.querySelector('.login');
var login = document.querySelector('.profile_container');
login.onclick = (e) => {
    var logout = document.querySelector('.logout');
    if (localStorage.getItem('Account') != null) {
        if (logout.classList.contains('active')) {
            logout.classList.remove('active');
        } else {
            logout.classList.add('active');
        }
    } else {
        if (login_panel.classList.contains('active')) {
            login_panel.classList.remove('active');
        } else {
            login_panel.classList.add('active');
        }
    }
}

//whatch list manage//
function onaddCLick() {
    fetch('http://localhost/Movies-Web-App/php/watchlist.php?id=' + info.id + '&movie=&setStatue=read')
        .then(res => res.json())
        .then(data => {
            CODE(data);
        })
}

function CODE(data) {
    var add = document.querySelectorAll('.add');
    var account = localStorage.getItem('Account');
    var info = JSON.parse(account);
    add.forEach(element => {
        var id = element.parentElement.querySelector('.id').innerHTML;

        if (account == null) {
            // no account 
            element.classList.add('remove');

        } else {
            element.classList.remove('remove');
            if (DoesContains(data, id)) {
                element.querySelector('.add_icon').classList.add('active');
                element.querySelector('._done_icon_').classList.add('active');
            } else {
                element.onclick = () => {
                    fetch('http://localhost/Movies-Web-App/php/watchlist.php?id=' + info.id + '&movie=' + id + '&setStatue=write')
                        .then(() => {
                            element.querySelector('.add_icon').classList.add('active');
                            element.querySelector('._done_icon_').classList.add('active');
                            onaddCLick();

                        });


                }
            }
        }
    });
}
////////
function DoesContains(list, id) {
    if (list.some(e => e.movie_id === id)) {
        return true
    } else {
        return false;
    }
}