'use strict'

// синтаксический сахар для document.querySelector(All?)
// f - from, s - selector, a - all
const qs = ({ f = document, s, a = false }) => f[`querySelector${ a ? 'All' : '' }`](s)

// синтаксический сахар для document.createElement()
const ce = nodeName => document.createElement(nodeName)

document.addEventListener('DOMContentLoaded', () => {
	let main = qs({ s: '.main' })

	let mainSelectBox = qs({ f: main, s: '.main__select-box' })
	let mainSelect = qs({ f: mainSelectBox, s: '.main__select' })

	let mainOptionsBox = qs({ f: main, s: '.main__options-box' })
	let mainOptions = qs({ f: mainOptionsBox, s: '.main__option', a: true })

	let showOption = option => {
		let currentSelected = qs({ f: mainOptionsBox, s: '[data-current]' })
		if (currentSelected) {
			delete currentSelected.dataset.current
		}

		qs({ f: mainOptionsBox, s: `[data-id="${option}"]` }).dataset.current = ''
	}

	mainSelect.addEventListener('input', e => showOption(e.target.value))

	mainOptions.forEach(option => {
		let selectOption = ce('option')

		selectOption.innerText = option.dataset.title
		selectOption.value = option.dataset.id

		mainSelect.appendChild(selectOption)

		if (option.dataset.id === location.hash.substr(1)) {
			selectOption.selected = true
			mainSelect.dispatchEvent(new Event('input'))
		}
	})

	if (location.hash) {
		history.pushState('', document.title, location.pathname + location.search)
	}
})
