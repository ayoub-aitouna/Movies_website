var previous = document.querySelector('.Previous_');
var next = document.querySelector('.next_');
var pagelist = document.querySelector('.pagelist');
var last = document.querySelector('.last');
var first = document.querySelector('.first');
var get;
var N_list;

next.setAttribute('onclick', '_next()');
previous.setAttribute('onclick', '_previous()');
last.setAttribute('onclick', 'last_()');
first.setAttribute('onclick', 'first_()');

function last_() {
    var last_page = Math.ceil(state.querySet.length / state.rows);
    state.page = last_page;
    button(false);
    getQuerylist();
}

function first_() {
    state.page = 1;
    button(true);
    getQuerylist();
}

function _next() {
    state.window = state.window + 1;

    state.page = state.page + 1;
    getQuerylist();

    if (button(false)) {
        return;
    }
}

function _previous() {
    state.window = state.window - 1;
    button(true);
    if (state.page > 1) {
        state.page = state.page - 1;
        getQuerylist()

    }

}

// function hightLight() {
//     N_list = document.querySelectorAll('.pagination_list');
//     console.log(N_list[0]);
//     N_list.forEach(element => {
//         element.classList.remove('active')
//     });
//     N_list[state.window].classList.add('active');

// }

function getQuerylist() {
    document.querySelector('.MoviesList').innerHTML = '';
    pagelist.innerHTML = '<p>' + state.page + '</p>'
    var start, end;
    if (state.page == 1) {
        previous.style.opacity = 0;
        start = 0
    } else {
        previous.style.opacity = 1;
        start = (state.page - 1) * state.rows + 1;
    }
    end = start + state.rows;
    var list = state.querySet.slice(start, end);
    list.forEach(element => {
        setMoviesList(element);
    });
    var li = document.querySelectorAll('.MoviesList li');
    li.forEach(element => {
        element.setAttribute('onclick', 'Item_clicked(this)');
    });
    return list
}

function Item_clicked(e) {
    let id = e.querySelector('.id');
    var item;
    state.querySet.forEach(element => {
        //console.log(element.movie_ID + ':::' + element.name)
        if (element.movie_ID == id.innerText) {
            item = element;
            return;
        }
    });
    sessionStorage.setItem('movie', JSON.stringify(item));
}

function button(p) {
    var max = Math.ceil(state.querySet.length / state.rows);
    if (state.page >= max) {
        if (p == true) {
            next.style.opacity = '1';
        } else {
            next.style.opacity = '0';
        }
        return true;
    } else {
        next.style.opacity = '1';
        return false;
    }
}

// function maxPages(s, e) {
//     state.window = 0;
//     list_container.innerHTML = '';
//     var max = Math.ceil(state.querySet.length / state.rows);

//     for (var i = 4; i <= 8; i++) {
//         list_container.innerHTML += '<li class="pagination_list">' + i + '</li>';
//     }
//     N_list = document.querySelectorAll('.pagination_list');

// }

function pagination_reset() {
    state.page = 1;
    button(true);
}