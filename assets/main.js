'use strict'

// синтаксический сахар для document.querySelector(All?)
// f - from, s - selector, a - all
const qs = ({ f = document, s, a = false }) => f[`querySelector${ a ? 'All' : '' }`](s)

// синтаксический сахар для document.createElement()
const ce = nodeName => document.createElement(nodeName)

document.addEventListener('DOMContentLoaded', () => {
	const contentBox = qs({ s: '.content' })

	// sorry guys ¯\_(ツ)_/¯

	contentBox.querySelectorAll('.link[href^="http"]:not([href*="github.io"])')
		.forEach(link => link.addEventListener('click', e => {
			link.href += `?utm_source=${location.host}&utm_content=index-page`
		}))
})
