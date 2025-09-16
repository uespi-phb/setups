const title = document.getElementById('main-title')
const toggleColorButton = document.getElementById('toggle-color')

toggleColorButton.addEventListener('click', () => {
  const currentColor = title.style.color
  title.style.color = currentColor === 'blue' ? '#333' : 'blue'
})
