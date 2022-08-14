const titleValue = document.querySelector('#title')
const authorValue = document.querySelector('#author')
const isbnValue = document.querySelector('#isbn')
const submitBTN = document.querySelector('.submit')
const tbody = document.querySelector('#book-list')
const main = document.querySelector('main')
const bookForm = document.querySelector('.book-form')
let books = []

//Constructor Function
function AddBook(title, author, isbn) {
    let row

    new.target ? books.push({ title, author, isbn }) : undefined

    Object.assign(this, {
        title,
        author,
        isbn,
        createBook() {
            row = document.createElement('tr')
            row.innerHTML = `
            <td>${this.title}</td>
            <td>${this.author}</td>
            <td>${this.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `
            tbody.appendChild(row)
        },
    })
}

//Add new book
submitBTN.addEventListener('click', e => {
    e.preventDefault()
    let newBook, alertError, alertSuccess

    if (
        titleValue.value == '' ||
        authorValue.value == '' ||
        isbnValue.value == ''
    ) {
        alertError = document.createElement('div')
        alertError.classList.add(
            'alert',
            'alert-dismissible',
            'alert-danger',
            'text-center'
        )
        alertError.innerHTML = `
        <h4><strong>Please, fill all the fields!</strong></h4>
        `
        main.children[1].insertBefore(alertError, bookForm)

        setTimeout(() => {
            main.children[1].removeChild(main.children[1].firstElementChild)
        }, 2000)
    } else {
        newBook = new AddBook(
            titleValue.value,
            authorValue.value,
            isbnValue.value
        )
        newBook.createBook()

        titleValue.value = ''
        authorValue.value = ''
        isbnValue.value = ''

        alertSuccess = document.createElement('div')
        alertSuccess.classList.add(
            'alert',
            'alert-dismissible',
            'alert-success',
            'text-center'
        )
        alertSuccess.innerHTML = `
        <h4><strong>Book successfully added!</strong></h4>
        `
        main.children[1].insertBefore(alertSuccess, bookForm)

        setTimeout(() => {
            main.children[1].removeChild(main.children[1].firstElementChild)
        }, 2000)

        saveBookInLocal(newBook)
    }
})

//Save Local Storage
function saveBookInLocal(book) {
    let savedBooks
    localStorage.getItem('books') === null
        ? (savedBooks = [])
        : (savedBooks = JSON.parse(localStorage.getItem('books')))

    savedBooks.push(book)
    localStorage.setItem('books', JSON.stringify(savedBooks))
}

//Get book from Local Storage
document.addEventListener('DOMContentLoaded', () => {
    let savedBooks, row

    localStorage.getItem('books') === null
        ? (savedBooks = [])
        : (savedBooks = JSON.parse(localStorage.getItem('books')))

    savedBooks.forEach(item => {
        row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `
        tbody.appendChild(row)
    })
})

//Delete book
document.addEventListener('click', e => {
    let target = e.target

    let savedBooks = JSON.parse(localStorage.getItem('books'))
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove()
        savedBooks.forEach((item, index) => {
            if (
                target.parentElement.previousSibling.previousSibling
                    .textContent === item.isbn
            )
                savedBooks.splice(index, 1)
            localStorage.setItem('books', JSON.stringify(savedBooks))
        })
    }
})
