'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.link[href^="http"]:not([data-no-nfno])').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'nofollow noopener');
    });
});
