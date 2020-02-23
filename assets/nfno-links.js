'use strict'

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('a[href^="http"], a[data-nfnr]').forEach(link => {
		link.setAttribute('target', '_blank')
		link.setAttribute('rel', 'nofollow noopener')
	})
})
