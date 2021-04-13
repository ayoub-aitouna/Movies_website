var movie = JSON.parse(sessionStorage.getItem('movie'));
var recherch = document.querySelector('.recherch');
var search = document.querySelector('.search');


recherch.onclick = (e) => {
    if (recherch.classList.contains('active')) {
        recherch.classList.remove('active');
        recherch.classList.add('des');

    }
}

getMovies();
setInfo();

function setInfo() {

    document.title = 'Watch ' + movie.name;
    document.querySelector('.background').src = movie.background;
    //document.querySelector('.background').src = 'https://variety.com/wp-content/uploads/2021/01/Malcolm-Marie-1.jpg';
    document.querySelector('.small_back').src = movie.background;
    var _name = document.querySelector('.name');
    _name.innerText = movie.name;
}

function getMovies() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadMovies(JSON.parse(this.responseText));
        }
    }
    request.open('GET', 'http://localhost/Movies-Web-App/script.php?q=' + movie.category + '&c=&t=', true);
    //request.open('GET', 'http://localhost/Movies-Web-App/php/Search.php?q=l', true);
    request.send();
}

function loadMovies(data) {
    shuffle(data);
    var container = document.querySelector('.li_container');
    container.innerHTML = '';
    var i = 0;
    data.forEach(element => {
        if (i <= 3) {
            let Item = '<li><a href="movie.html"><div class="poster"><div class="rate">' + element.Rate + '</div><img src="' + element.Poster + '" class="Movoie_img" alt="" srcset=""></div><h5>' + element.name + '</h5><h6>' + element.category + '</h6><div class="id" style="display:none">' + element.movie_ID + '</div></a></li>'
            container.innerHTML += Item;
        }
        i++;
    });
    clik_Handler(data);
}

function clik_Handler(data) {
    var list = document.querySelectorAll('.li_container li');
    list.forEach(element => {
        element.onclick = (e) => {
            let id = element.querySelector('.id');
            var item;
            data.forEach(element => {
                //console.log(element.movie_ID + ':::' + element.name)
                if (element.movie_ID == id.innerText) {
                    item = element;
                    return;
                }
            });
            sessionStorage.setItem('movie', JSON.stringify(item));
        }
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}