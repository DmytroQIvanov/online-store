let basketArray = [];
let totalAmount = 0;
let currentKey = "all";

let nickName = document.getElementById("nick");
let email = document.getElementById("email");

let userD = JSON.parse(localStorage.getItem("userData"));
if (userD != null) {
  nickName.innerHTML = userD.nick;
  email.innerHTML = userD.email;
}

let searchInput = document.getElementById("Search");
searchInput.addEventListener("keypress", (key) => {
  key.key == "Enter" ? toSearch() : console.log(key.key);
});

function toSearch() {
  goodsKeys.map((elem) => {
    for (let d in elem) alert(d);
  });
  currentKey = searchInput.value;

  goodsGenerate(currentKey);
}
function goodsGenerate(key) {
  document.querySelector(".goods-container").innerHTML = " ";
  let goodBlock = goods.map((elem, id) => {
    if (elem.key == key || key == "all") {
      let block = `
    <div class="good-block" id="good-block">
       <img class="good-img" src="./assets/img/${elem.img}">
       <div class="good-name" onclick="goodPage(${id})">${elem.name}</div>
       <div class="good-description">
       ${elem.description}      
       </div>
       <button class="buy-button" onclick="buy(${id})">Buy</button>
       <div class="good-price ${elem.discount}">${elem.price}</div>
    </div>`;

      document.querySelector(".goods-container").innerHTML += block;
    } else {
    }
  });
  currentKey = key;
}
function goodPage(id, elem = "goods-container") {
  let array = goods[id];
  let block = `
  <div class="good-page-container">
    <img src="./assets/img/back.png" class="good-page-back" onclick="back()">
    <div class="good-page-name">${array.name}</div>  
    <img class="good-page-img" src="./assets/img/${array.img}">
    <div class="good-page-description">${array.description}</div>
    <div class="good-page-price">Price: ${array.price}</div>
    <button class="buy-button" onclick="buy(${id})">Buy</button>


    <div class="horisontal-blocks"><div>
  </div>`;
  document.querySelector(".goods-container").innerHTML = block;
}

function user() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let block;
  if (userData == null) {
    block = `
  <div class="good-page-container">
  Вы не зарегистрированы
    <img src="./assets/img/back.png" class="good-page-back" onclick="back()">
  </div>`;
  } else {
    block = `
  <div class="good-page-container">
  Nick: -- ${userData.nick}<br>
  Age: -- ${userData.age}<br>
  Email: -- ${userData.email}
  </div>`;
  }

  document.querySelector(".goods-container").innerHTML = block;
}

function horisontalBlockS() {
  goodsGenerate("all");
}

function log() {
  let userData = localStorage.getItem("userData");
  let block;
  if (userData == null) {
    block = `
  <div class="good-page-container">
    <img src="./assets/img/back.png" class="good-page-back" onclick="back()">
  <input placeholder="Nick" id="log-nick">
  <input placeholder="Age" id="log-age">
  <input placeholder="Email" id="log-email">
  <button onclick="saveData()">Зарегистрироваться</button>
  </div>`;
  } else {
    block = `
  <div class="good-page-container">
  Вы уже зарегистрированы
  </div>`;
  }

  document.querySelector(".goods-container").innerHTML = block;
}
function basket() {
  // totalAmount = 0;
  let basketBlock = `<div class="goods-page-container">
    <img src="./assets/img/back.png" class="good-page-back" onclick="back()">
  <div>Общая сумма покупок: ${totalAmount}</div> 
  <div>Покупки: </div>
`;
  basketBlock += basketArray.map((elem) => {
    totalAmount += elem.price;
    let block = `
    <div class="good-page-container">
    <div class="good-page-name">${elem.name}</div>
    <div>Price: ${elem.price}</div>
    <img src="./assets/img/${elem.img}" class="good-page-img">
    <div>${elem.description}</div>
    </div>
  `;
    return block;
  });
  basketBlock += `<button onclick="alert('Ещё в разработке')">Оформить</button>`;

  document.querySelector(".goods-container").innerHTML = basketBlock;
}

function saveData() {
  let userData = {
    nick: document.getElementById("log-nick").value,
    age: document.getElementById("log-age").value,
    email: document.getElementById("log-email").value,
  };
  user();

  localStorage.setItem("userData", JSON.stringify(userData));
}

function showSide() {
  document.getElementById("side-bar").classList.toggle("visible");
}
function back() {
  goodsGenerate(currentKey);
}
goodsGenerate("all");

function buy(id) {
  // basketArray.push(id)
  basketArray.push({
    name: goods[id].name,
    price: goods[id].price,
    img: goods[id].img,
    description: goods[id].description,
  });
}

function sortAscending() {
  // alert(goods[0].price);
  goods.sort(function (a, b) {
    return b.price - a.price;
  });
  goodsGenerate(currentKey);
}
function sortDescending() {
  // alert(goods[0].price);
  goods.sort(function (a, b) {
    return a.price - b.price;
  });
  goodsGenerate(currentKey);
  let a = document.querySelector(".good-block");
  a.classList.toggle("GOOD02");
  setTimeout(() => {
    alert();
  }, 299);
}
