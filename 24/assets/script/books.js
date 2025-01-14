let API_BASE_URL = "  http://localhost:3000";
let selectMenu = document.querySelector('#select-menu');
let sortBtn = document.querySelector('#sortByYear');
let addNewBtn = document.querySelector('#addNew');
let searchForm = document.querySelector('#searchBooks');
let searchInput = document.querySelector('#searchInput');
let boxWrapper = document.querySelector('.box-wrapper');
let bookName = document.querySelectorAll('h5');
let deleteBtn = document.querySelectorAll('#delete');
let editBtn = document.querySelectorAll('#change');
let detailsBtn = document.querySelectorAll('#details');
let shopBtn = document.querySelectorAll('.cart');
let cartCount = document.querySelector('.cartCount')
let showMoreBtn = document.querySelector('#showMore');
let submitBtn  = document.querySelector(".submitBtn")
let modal = document.querySelector(".modal");
let modalWrapper = document.querySelector(".modal_wrapper");
let loader = document.querySelector(".loader-wrapper");

//#region add new book
const getBooks = async () => {
  const res = await fetch(API_BASE_URL+'/books');
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('Failed to fetch data');
  }
};

const addNewBook = async (e) => {
  e.preventDefault();
  let name = document.querySelector(".name").value;
  let pageCount = document.querySelector(".pg-count").value;
  let imgLink = document.querySelector(".img-link").value;
  let author = document.querySelector(".author").value;
  let description = document.querySelector(".description").value;
  let genre = document.querySelector(".genre").value;
  let createDate = document.querySelector(".description").value;

  const booksData = await getBooks();

  const lastBook = booksData[booksData.length - 1];
  const lastElementId = lastBook ? lastBook.id + 1 : 1;

  const data = {
    name,
    pageCount,
    imgLink,
    author,
    description,
    genre,
    createDate,
    id: lastElementId
  };

  console.log(data);

  await fetch(API_BASE_URL+'/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
//добовляем
submitBtn.addEventListener("click", (e) => addNewBook(e));
submitBtn.addEventListener("click", (e) => addNewBook(e))
// закрывает модалку
modal.addEventListener("click", () => {
  modal.className = "modal"
 
})
// не реагирует на клик по белому окну в модалке
modalWrapper.addEventListener("click", (e) =>  e.stopPropagation())
// открывает модалку
addNewBtn.addEventListener("click" , () => {
    console.log("hello")
  modal.className += " active"
})
//#endregion 

//#region sort by year
sortBtn.addEventListener('click', () =>{
    
    boxWrapper.innerHTML = ''
    fetch(API_BASE_URL+'/books')
    .then((response) => response.json())
    .then((books) => {
        const yearsOfBook = books.sort((a, b) => a.year - b.year)
        yearsOfBook.forEach((book) => boxWrapper.innerHTML += `
        <div class="col-3">
            <div class="box">
                <div class="box-img">
                    <img src="${book.coverImage}" id="card-img" class="card-img-top" alt="book cover">
                </div>
                <div class="box-descr">
                    <h5>${book.name}</h5>
                    <h6>${book.author}    <br>     ${book.year}</h6>
                    <p>${book.description}</p>
                    <p>${book.pageCount} pages</p>
                    <p>${book.genre}</p>
                </div>
                <div class="box-btn">
                    <button id="delete" type="button" class="btn btn-danger" style="background-color:#a96030; border: none;"><i class="fa-solid fa-trash"></i></button>
                    <button id="change" type="button" class="btn btn-warning" style="color: #ffffff; background-color:#A98064; border: none;"><i class="fa-solid fa-edit"></i></button>
                    <a id="details" class="btn btn-warning" href="detail.html?id=${book.id}"  style="color: #ffffff; background-color:#88766a; border: none;"><i class="fa-solid fa-gear"></i></a>
                    <button id="${book.id}" type="button" class="btn btn-warning cart" style="color: #ffffff; background-color:#bd825e; border: none;"><i class="fa-solid fa-cart-shopping"></i></button>
               </div>
            </div>
        </div>
        `)
    })  
    
});
//#endregion sort by

//#region search books
searchForm.addEventListener('keyup', (e)=>{
    e.preventDefault();
    boxWrapper.innerHTML = ''
        fetch(API_BASE_URL+'/books')
        .then((response) => response.json())
        .then((books) => {
            books.forEach(function(book){
                if(book.name.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim())){
                    boxWrapper.innerHTML += `
                    <div class="col-3">
                        <div class="box">
                            <div class="box-img">
                                <img src="${book.coverImage}" id="card-img" class="card-img-top" alt="book cover">
                            </div>
                            <div class="box-descr">
                                <h5>${book.name}</h5>
                                <h6>${book.author}    <br>     ${book.year}</h6>
                                <p>${book.description}</p>
                                <p>${book.pageCount} pages</p>
                                <p>${book.genre}</p>
                            </div>
                            <div class="box-btn">
                                <button id="delete" type="button" class="btn btn-danger" style="background-color:#a96030; border: none;"><i class="fa-solid fa-trash"></i></button>
                                <button id="change" type="button" class="btn btn-warning" style="color: #ffffff; background-color:#A98064; border: none;"><i class="fa-solid fa-edit"></i></button>
                                <a id="details" class="btn btn-warning" href="detail.html?id=${book.id}"  style="color: #ffffff; background-color:#88766a; border: none;"><i class="fa-solid fa-gear"></i></a>
                                <button  id="${book.id}" type="button" class="btn btn-warning cart" style="color: #ffffff; background-color:#bd825e; border: none;"><i class="fa-solid fa-cart-shopping"></i></button>
                              </div>
                        </div>
                    </div>
                    `
                }
            })
            
        });
    })
//#endregion

//#region about modal
bookName.forEach((name) => {
  name.addEventListener('click', (e) => {
      e.preventDefault();
      fetch(API_BASE_URL+'/books')
      .then((response) => response.json())
      .then((books) => {
          books.forEach(function(book){
              if(book.name.toLowerCase().trim() === name.textContent.toLowerCase().trim()) {
                  Swal.fire({
                      title: `${book.name}`,
                      text: `${book.author}`,
                      imageUrl: `${book.coverImage}`,
                      imageWidth: 400,
                      imageHeight: 500,
                      imageAlt: 'Custom image',
                  });
              }
          });
      });
  });
});

//#endregion

//#region //!edit button


//#endregion

//#region delete button
deleteBtn.forEach((btn)=>{
    btn.addEventListener('click',function(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD92A3',
        cancelButtonColor: '#6EB4BC',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.parentElement.parentElement.parentElement.remove();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
           'success'
          )
        }
      })
    })
  })
//#endregion

//#region select menu choose a genre 
selectMenu.addEventListener("change", async (e) => {
  console.log(e.target.value);

  const response = await fetch(API_BASE_URL+'/books');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  let sortedData = [];

  if (e.target.value !== 'all') {
    sortedData = data.filter((book) => book.genre.toLowerCase() === e.target.value.toLowerCase());
  } else {
    sortedData = data;
  }

  boxWrapper.innerHTML = "";
  sortedData.forEach((book) => {
    boxWrapper.innerHTML += `
      <div class="col-3">
          <div class="box">
              <div class="box-img">
                  <img src="${book.coverImage}" id="card-img" class="card-img-top" alt="book cover">
              </div>
              <div class="box-descr">
                  <h5>${book.name}</h5>
                  <h6>${book.author}    <br>     ${book.year}</h6>
                  <p>${book.description}</p>
                  <p>${book.pageCount} pages</p>
                  <p>${book.genre}</p>
              </div>
              <div class="box-btn">
                  <button id="delete" type="button" class="btn btn-danger" style="background-color:#a96030; border: none;"><i class="fa-solid fa-trash"></i></button>
                  <button id="change" type="button" class="btn btn-warning" style="color: #ffffff; background-color:#A98064; border: none;"><i class="fa-solid fa-edit"></i></button>
                  <a id="details" class="btn btn-warning" href="detail.html?id=${book.id}"  style="color: #ffffff; background-color:#88766a; border: none;"><i class="fa-solid fa-gear"></i></a>
                  <button id="${book.id}" type="button" class="btn btn-warning cart" style="color: #ffffff; background-color:#bd825e; border: none;"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
          </div>
      </div>
    `;
  });
});
//#endregion
 
//#region show more button
showMoreBtn.addEventListener('click', function(e){
  e.preventDefault();
  boxWrapper.innerHTML = ""
  fetch(API_BASE_URL+'/books')
    .then((response) => response.json())
    .then((books) => {
      books.forEach(function(book) {
        boxWrapper.innerHTML += `
          <div class="col-3">
              <div class="box">
                  <div class="box-img">
                      <img src="${book.coverImage}" id="card-img" class="card-img-top" alt="book cover">
                  </div>
                  <div class="box-descr">
                      <h5>${book.name}</h5>
                      <h6>${book.author}    <br>     ${book.year}</h6>
                      <p>${book.description}</p>
                      <p>${book.pageCount} pages</p>
                      <p>${book.genre}</p>
                  </div>
                  <div class="box-btn">
                      <button id="delete" type="button" class="btn btn-danger" style="background-color:#a96030; border: none;"><i class="fa-solid fa-trash"></i></button>
                      <button id="change" type="button" class="btn btn-warning" style="color: #ffffff; background-color:#A98064; border: none;"><i class="fa-solid fa-edit"></i></button>
                      <a id="details" class="btn btn-warning" href="detail.html?id=${book.id}"  style="color: #ffffff; background-color:#88766a; border: none;"><i class="fa-solid fa-gear"></i></a>
                      <button id="${book.id}" type="button" class="btn btn-warning cart" style="color: #ffffff; background-color:#bd825e; border: none;"><i class="fa-solid fa-cart-shopping"></i></button>
                  </div>
              </div>
          </div>
        `;
      });
      //...
      shopBtn.forEach((btn) => {
        btn.addEventListener('click', function () {
        fetch(API_BASE_URL+'/books'+`/${this.id}`)
        .then((response) => response.json())
        .then((book) => {
          if(localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
            book.quantity = 1
            localStorage.setItem('cart', JSON.stringify([book]))
          }else{
            let card = JSON.parse(localStorage.getItem('cart'))
            let found = card.find((x) => x.id === book.id)
            if(found){
              found.quantity++
              localStorage.setItem('cart', JSON.stringify([...card]))
              cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length
            }else{
              book.quantity = 1
              localStorage.setItem('cart', JSON.stringify([...card, book]))
              cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length
            }
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Book added to cart',
            showConfirmButton: false,
            timer: 1000
            })
          })
      });
      })


      bookName.forEach((name) => {
        name.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(API_BASE_URL+'/books')
            .then((response) => response.json())
            .then((books) => {
                books.forEach(function(book){
                    if(book.name.toLowerCase().trim() === name.textContent.toLowerCase().trim()) {
                        Swal.fire({
                            title: `${book.name}`,
                            text: `${book.author}`,
                            imageUrl: `${book.coverImage}`,
                            imageWidth: 400,
                            imageHeight: 500,
                            imageAlt: 'Custom image',
                        });
                    }
                });
            });
        });
      });


      deleteBtn.forEach((btn)=>{
        btn.addEventListener('click',function(){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD92A3',
            cancelButtonColor: '#6EB4BC',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.parentElement.parentElement.parentElement.remove();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
               'success'
              )
            }
          })
        })
      })
    //..
    })
});

//#endregion

//#region shop button

shopBtn.forEach((btn) => {
  btn.addEventListener('click', function () {
  fetch(API_BASE_URL+'/books'+`/${this.id}`)
  .then((response) => response.json())
  .then((book) => {
    if(localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0) {
      book.quantity = 1
      localStorage.setItem('cart', JSON.stringify([book]))
    }else{
      let card = JSON.parse(localStorage.getItem('cart'))
      let found = card.find((x) => x.id === book.id)
      if(found){
        found.quantity++
        localStorage.setItem('cart', JSON.stringify([...card]))
        cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length
      }else{
        book.quantity = 1
        localStorage.setItem('cart', JSON.stringify([...card, book]))
        cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length
      }
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Book added to cart',
      showConfirmButton: false,
      timer: 1000
      })
    })
});
})

//#endregion

cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length
