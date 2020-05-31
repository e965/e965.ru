'use strict';

$make.rnd = e => Math.floor(Math.random() * e);

var domain,
    board,
    thread,
    video = $make.qs('video'),
    reloadBtn = $make.qs('.load'),
    nextBtn = $make.qs('.next'),
    form = $make.qs('form'),
    submitBtn = form.querySelector('input[type="submit"]');

function get(e, t, o) {
    fetch('https://cors-anywhere.herokuapp.com/https://' + e + '/' + t + '/res/' + o + '.json', {
        cache: 'no-store',
    }).then(function (n) {
        n.json().then(function (n) {
            var a = n.threads[0].posts,
                c = [];

            function r() {
                video.setAttribute('src', 'https://' + e + '/' + t + '/src/' + o + '/' + c[$make.rnd(c.length - 1)]);
            }

            a.forEach(function (e) {
                for (var t = 0; t < e.files.length; t++) {
                    let fileName = e.files[t].name;

                    if (
                        fileName.endsWith('webm') ||
                        fileName.endsWith('mp4') ||
                        fileName.endsWith('mkv') ||
                        fileName.endsWith('ogv') ||
                        fileName.endsWith('ogg') ||
                        fileName.endsWith('avi') ||
                        fileName.endsWith('3gp')
                    ) {
                        c[c.length] = e.files[t].name;
                    }
                }
            });

            r();

            video.onended = function () {
                r();
            };
            video.onerror = function () {
                r();
            };
            nextBtn.onclick = function () {
                r();
            };
        });
    });
}

!(function () {
    var e = $check.get('domain'),
        t = $check.get('board'),
        o = $check.get('thread');

    if (!o) return void document.body.classList.add('no-choose');

    switch (((thread = o), (board = t ? t : 'b'), e)) {
        case 'pm':
            domain = '2ch.pm';
            break;
        case 'hk':
        default:
            domain = '2ch.hk';
    }

    get(domain, board, thread);
})()(function () {
    form.onsubmit = function (e) {
        e.preventDefault();

        var t = form.querySelector('input[name="domain"]').value,
            o = form.querySelector('input[name="board"]').value,
            n = form.querySelector('input[name="thread"]').value;

        thread = n;
        board = o ? o : 'b';
        (domain = t ? t.replace('https:', '').replace('http:', '').replace('//', '').replace('/', '') : '2ch.hk'),
            document.body.classList.remove('no-choose');

        get(domain, board, thread);
    };
})(),
    (reloadBtn.onclick = function () {
        get(domain, board, thread);
    });
