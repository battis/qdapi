/* base URL for RESTful API requests */
const url = "http://example.com/api/v1/foo";

/**
 * Formats a "foo" record into a paragraph element
 * @param foo
 * @returns {HTMLParagraphElement}
 */
function formatRecord(foo) {
    let p = document.createElement("p");
    p.innerText = 'id' + foo.id + "; bar: " + foo.bar + "; baz: " + foo.baz;
    return p;
}

/**
 * Replace the content of an element
 * @param id
 * @param content
 */
function replaceElementContent(id, content) {
    let node = document.getElementById(id);
    node.innerHTML = "";
    node.append(content);
}

/**
 * Send an asynchronous AJAX request to a RESTful API
 * @param method GET, POST, PUT, DELETE
 * @param url
 * @param callback
 */
function sendAjaxRequest(method, url, callback) {
    let http = new XMLHttpRequest();
    if (typeof url === "string") {
        url = new URL(url);
    }
    http.open(method, url, true);
    http.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            callback(JSON.parse(this.response));
        }
    };
    http.send();
}

/* get all of the "foo" record */
sendAjaxRequest("GET", url, function (data) {
    const div = document.getElementById("get-all");
    div.innerHTML = "";
    data.forEach(function (foo) {
        div.append(formatRecord(foo));
    })
});

/* get a single "foo" record by ID */
sendAjaxRequest("GET", url + "/2", function (foo) {
    replaceElementContent("get-one", formatRecord(foo));
});

/* post a new "foo" record to the database */
let postUrl = new URL(url);
postUrl.searchParams.set("bar", "dummy info");
postUrl.searchParams.set("baz", "more dummy info");
sendAjaxRequest("POST", postUrl, function (foo) {
    replaceElementContent("post", formatRecord(foo));

    /* put changes to an existing "foo" record to the database */
    // don't process PUT until POST completes
    let putUrl = new URL(url + "/" + foo.id);
    putUrl.searchParams.set("baz", "smart info!");
    sendAjaxRequest("PUT", putUrl, function (foo) {
        replaceElementContent("put", formatRecord(foo));

        /* delete an existing "foo" record */
        // don't process DELETE until PUT completes
        sendAjaxRequest("DELETE", url + "/" + foo.id, function (count) {
            let message = document.createElement("p");
            message.innerText = "deleted " + count + " records";
            replaceElementContent("delete", message);
        });
    });
});


