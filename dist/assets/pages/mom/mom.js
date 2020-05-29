'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const s = n => document.querySelector(n);

    s('.btn__main').onclick = e => {
        e.target.hidden = true;
        s('.tnx').hidden = false;

        if (navigator.share && navigator.canShare()) {
            s('.btn__share').hidden = false;
            s('.btn__share').onclick = () => {
                navigator.share({
                    title: 'Я нажал кнопку, а значит люблю свою маму! 🤗',
                    text: 'А любите ли вы? 🤨 Если да, срочно жмите на кнопку.',
                    url: location.href,
                });
            };
        }
    };
});
