var request = new XMLHttpRequest();
console.log('as');
request.onreadystatechange = function() {
    if (this.readyState == 1 | this.status == 200) {
        var object = JSON.parse(this.responseText);
        document.body.innerHTML = 'asdasdfs' + object[1];
    } else {
        document.body.innerHTML = 'nothing';

    }
}
request.open("GET", "http://localhost/Movies-Web-App/script.php", true);
request.send();