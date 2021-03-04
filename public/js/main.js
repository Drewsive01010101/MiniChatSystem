
const UI = (function () {
    let html = '';

    return {
        postMsg: function (text) {
            let output = document.getElementById('display-posts');
            text.forEach(function (post) { html += `<p>${post.body}</p>` });
            output.innerHTML = html;
        }
    }
})();


//http request object


const HTTP = (function () {
    const xhr = new XMLHttpRequest();

    return {
        get: function (url, callback) {
            xhr.open('GET', url, true);

            xhr.onload = () => {
                if (xhr.status == 200) {
                    callback(null, xhr.responseText);
                } else { callback('Error' + xhr.status) }
            }
            xhr.send();
        },
        post: function (url, data, callback) {
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.onload = () => {
                callback(null, xhr.responseText);
            }
            xhr.send(JSON.stringify(data));
        }
    }

})();


const app = (function () {
    const message = function (body) {
        this.body = `${body}`;
    }

    document.querySelector('#submission').addEventListener('submit', (e) => {
        let text = document.querySelector('#text-box').value;

        let msg = new message(text);
        if (text.length == 0) {
            alert('Need text in box');
        } else {
            //msg obj went
            HTTP.post('http://localhost:3000/messages', msg, function (err, res) {
                if (err) { console.log(err); } else { console.log('post worked' + res); }

            });


        }

        //e.preventDefault();

    });

    HTTP.get('http://localhost:3000/messages', function (err, res) {
        if (err) { console.log(err) } else {
            UI.postMsg(JSON.parse(res));

        }
    });


})(UI, HTTP);
