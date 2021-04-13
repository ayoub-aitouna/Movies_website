var SearchBox = document.querySelector('.sherch_box');
var input = document.querySelector('.Search_input');
var autoComplet = document.querySelector('.autoComplet');
input.setAttribute('onkeyup', 'search()');
var htps = new XMLHttpRequest();
var Sujestions;
htps.onreadystatechange = function() {
    if (this.readyState == 4 || this.status == 200) {
        try {
            Sujestions = JSON.parse(this.responseText);
            setList(Sujestions);


        } catch (error) {
            SearchBox.classList.remove('active');

        }
    } else {
        SearchBox.classList.remove('active');

    }

}

function search() {
    if (input.value.length == 0) {
        var no = Array();
        setList(no);
        SearchBox.classList.remove('active');
    } else {
        htps.open('GET', 'http://localhost/Movies-Web-App/php/Search.php?q=' + input.value, true);
        htps.send();
    }
}

function setList(list) {
    var list_container = document.querySelector('.list_container');
    list_container.innerHTML = '';
    if (list.length > 0) { SearchBox.classList.add('active'); } else {
        //SearchBox.classList.remove('active');
    }
    var i = 0;
    list.forEach(e => {
        if (i < 6) {
            let template = ' <a style="text-decoration: none; color:black"  href="movie.html"><li><div class="item"><div class="img"><img src="' + e.Poster + '" alt=""></div><div class="details"><h5>' + e.name + '</h5><p>Category : ' + e.category + '</p><p>Rating : ' + e.Rate + '</p></div></div><div class="id" style="display:none">' + e.movie_ID + '</div></li></a>';
            list_container.innerHTML += template;
        }
        i++;
    });
    var li = document.querySelectorAll('.list_container li');
    li.forEach(element => {
        element.setAttribute('onclick', ' swearch_Item_clicked(this)');
    });

}
document.body.onclick = function(e) {
    if (e.target != SearchBox) {
        SearchBox.classList.remove('active');

    } else {}
}

function swearch_Item_clicked(e) {
    let id = e.querySelector('.id');
    var item;
    Sujestions.forEach(element => {
        //console.log(element.movie_ID + ':::' + element.name)
        if (element.movie_ID == id.innerText) {
            item = element;
            return;
        }
    });
    sessionStorage.setItem('movie', JSON.stringify(item));
}