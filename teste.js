const baseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010016/products';

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDisco = document.querySelector('#m-Disco')
const sPreco = document.querySelector('#m-Preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

async function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDisco.value = itens[index].Disco
    sPreco.value = itens[index].Preco
    id = index
  } else {
    sNome.value = ''
    sDisco.value = ''
    sPreco.value = ''
  }
  
}

async function editItem(index) {

  openModal(true, index)
}

async function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

async function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.Disco}</td>
    <td>R$ ${item.Preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDisco.value == '' || sPreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].Disco = sDisco.value
    itens[id].Preco = sPreco.value
  } else {
    itens.push({'nome': sNome.value, 'Disco': sDisco.value, 'Preco': sPreco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

async function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()