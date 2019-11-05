const url = "https://cdf.gannacademy.org/web/api/v1/animals";

function format(foo) {
    let p = document.createElement("p");
    p.innerText =  'id' + foo.id + "; name: " + foo.name + "; species: " + foo.species;
    return p;
}

function request(method, endpoint, params, callback) {
    var http = new XMLHttpRequest();
    http.open(method, endpoint, true);
    http.onload = function() {
        let data = JSON.parse(this.response);
        console.log(request, data);
        if (http.status >= 200 && http.status < 400) {
            callback(data);
        } else {
            console.log("ERROR " + http.status + ": " + http.statusText);
        }
    };
    if (params !== undefined) {
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(params)
    } else {
        http.send();
    }
}

request("GET", url, undefined, function(data) {
    const div = document.getElementById("get-all");
    div.innerHTML = "";
    data.forEach(function(foo) {
        div.append(format(foo));
    })
});

request("GET", url + "/2", undefined, function(foo) {
    const div = document.getElementById("get-one");
    div.innerHTML = "";
    div.append(format(foo));
});

var id = null;
request("POST", url, "bar=dummy%20info&baz=more%20dummy%20info", function (foo) {
    const div = document.getElementById("post");
    div.innerHTML = "";
    div.append(format(foo));
    id = foo.id;
});

request("PUT", url + "/" + id, "baz=smart%20info!", function(foo) {
    const div = document.getElementById("ppst");
    div.innerHTML = "";
    div.append(format(foo));
});

request("DELETE", url + "/" + id, undefined, function(count) {
    const div = document.getElementById("delete");
    div.innerHTML = "";
    let p = document.createElement("p");
    p.innerText = "deleted " + count + " records";
    div.append(p);
});