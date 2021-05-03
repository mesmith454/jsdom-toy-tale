let addToy = false;
const baseUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
 
//define variables
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const newToyForm = document.querySelector('.add-toy-form');


//individual fetch
const getToys = () => {
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      // console.log(data[0])
      data.forEach((toy) => renderToys(toy))
    })
}

const patchToy = (likes, toyId) => {
  fetch(baseUrl + `/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': likes
    })
  })
  .then(res => res.json())
  .then(console.log)
}

//make toy card
const renderToys = (toy) => {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')   
  let p =  document.createElement('p')
  let button = document.createElement('button')
    
  div.className = 'card'
  img.className = 'toy-avatar'
  button.className = "likes-btn"
  button.data = toy.id

  h2.innerText = toy.name
  img.src = toy.image
  p.innerText =  toy.likes
  button.innerText = "Likes <3"

  div.append(h2, img, p, button)
  toyCollection.appendChild(div)


  button.addEventListener('click', e => {
    let toyId = e.target.data
    p.innerText++
    let likes = p.innerText
    patchToy(likes, toyId)
  })
}

//stand alone event listeners
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyForm.addEventListener("submit", e => {
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringfy({
        'name': name,
        'image': image,
        'likes': 0

      }) 
    })
    .then(res => res.json())
    .then(toy = renderToys(toy))
  })

  //calling functions
  getToys()
});


