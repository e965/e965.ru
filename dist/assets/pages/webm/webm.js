'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const chooseBox = $make.qs('.choose');

    const form = $make.qsf('.choose_form', chooseBox);
    const formInputs = $make.qsf('input, button', form, ['a']);
    const bookmark = $make.qsf('.choose_bookmark a', chooseBox);

    const video = $make.qs('.video');

    const controls = $make.qs('.controls');
    const controlsClose = $make.qsf('.controls__close', controls);
    const controlsReload = $make.qsf('.controls__reload', controls);
    const controlsNext = $make.qsf('.controls__next', controls);

    const formInputsAction = action => {
        formInputs.forEach(input => {
            switch (action) {
                case 'block':
                    input.disabled = true;
                    break;
                case 'unlock':
                    input.disabled = false;
                    break;
                default:
            }
        });
    };

    const random = num => Math.floor(Math.random() * num);

    const threadURLData = url => {
        const threadURL = new URL(url);

        const threadURLSplited = threadURL.pathname.split('/');

        return {
            host: threadURL.hostname,
            board: threadURLSplited[1],
            thread_num: threadURLSplited[3].replace('.html', ''),
        };
    };

    const setRandomVideo = (videos, threadData) => {
        if (!videos && !threadData) {
            videos = JSON.parse(sessionStorage.getItem('e965:webm:videos'));
            threadData = JSON.parse(sessionStorage.getItem('e965:webm:threadData'));
        } else {
            sessionStorage.setItem('e965:webm:videos', JSON.stringify(videos));
            sessionStorage.setItem('e965:webm:threadData', JSON.stringify(threadData));
        }

        video.setAttribute(
            'src',
            'https://' + threadData.host + '/' + threadData.board + '/src/' + threadData.thread_num + '/' + videos[random(videos.length - 1)]
        );
    };

    const showVideo = (videos, threadData) => {
        chooseBox.hidden = true;

        video.hidden = false;
        controls.hidden = false;

        setRandomVideo(videos, threadData);
    };

    const hideVideo = () => {
        chooseBox.hidden = false;

        video.hidden = true;
        controls.hidden = true;
    };

    const APIRequest = threadData => {
        const proxy = 'https://cors-anywhere.herokuapp.com';

        formInputsAction('block');

        fetch(`${proxy}/https://${threadData.host}/${threadData.board}/res/${threadData.thread_num}.json`, { cache: 'no-store' })
            .then(r => r.json())
            .then(data => {
                const posts = data.threads[0].posts;
                const videos = [];

                posts.forEach(post => {
                    const postFiles = post.files;

                    for (let i = 0; i < postFiles.length; i++) {
                        const fileName = postFiles[i].name;

                        if (
                            fileName.endsWith('webm') ||
                            fileName.endsWith('mp4') ||
                            fileName.endsWith('mkv') ||
                            fileName.endsWith('ogv') ||
                            fileName.endsWith('ogg') ||
                            fileName.endsWith('avi') ||
                            fileName.endsWith('3gp')
                        ) {
                            videos.push(fileName);
                        }
                    }
                });

                if (videos.length !== 0) {
                    showVideo(videos, threadData);
                } else {
                    alert('В треде нет ни одного видео');
                }
            })
            .catch(e => {
                alert('Возникла какая-то ошибка' + e);
            })
            .finally(() => {
                formInputsAction('unlock');
            });
    };

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = threadURLData(formData.get('thread_url'));

        APIRequest(data);
    });

    void (() => {
        let threadURL = '';

        try {
            threadURL = new URL($check.get('thread_url'));
        } catch (e) {}

        if (threadURL) {
            formInputs[0].value = threadURL;
            formInputs[1].click();
        }
    })();

    bookmark.href = `javascript:`;

    video.onended = () => setRandomVideo();
    video.onerror = () => setRandomVideo();

    controlsNext.onClick = () => setRandomVideo();
});
