function populatesUFs() {
	const ufSelect = document.querySelector('select[name=uf]')
	fetch(
		'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
	)
		.then(res => res.json())
		.then(states => {
			for (state of states) {
				ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
			}
		})
}
populatesUFs()
function getCities(event) {
	const citySelect = document.querySelector('select[name=city]')
	const stateInput = document.querySelector('input[name=state]')

	const ufValue = event.target.value
	const indexOfSelectedState = event.target.selectedIndex
	stateInput.value = event.target.options[indexOfSelectedState].text
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
	citySelect.innerHTML = '<option value>Selecione a cidade </option>'
	citySelect.disabled = true
	fetch(url)
		.then(res => res.json())
		.then(cities => {
			for (city of cities) {
				citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
			}
			citySelect.disabled = false
		})
}

document.querySelector('select[name=uf]').addEventListener('change', getCities)

// itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')
for (const item of itemsToCollect) {
	item.addEventListener('click', handleSelectedItem)
}
const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []
function handleSelectedItem(event) {
	const itemLi = event.target
	itemLi.classList.toggle('selected')
	const itemId = itemLi.dataset.id

// console.log('ITEM ID:', itemId)	

	const alreadySelected = selectedItems.findIndex(item => {
		const itemFound = item == itemId
		return itemFound
	})
	// console.log(alreadySelected )
	if (alreadySelected >= 0) {
		const filteredItems = selectedItems.filter(item => {
			const itemIsDifferent = item != itemId
			return itemIsDifferent
		})
		selectedItems = filteredItems
		// console.log(filteredItems)
	} else {
		selectedItems.push(itemId)
	}
	// console.log('selectedItems:', selectedItems)
	collectedItems.value = selectedItems
}
