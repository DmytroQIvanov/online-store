let forSearch = [{ toiletBowl: "Унитазы" }, { smartphone: "Смартфоны" }];
let goods = [
  {
    name: "Унитаз - обычный",
    description: "Хотя-бы смывает",
    price: "1999",
    img: "U.png",
    key: forSearch[0].toiletBowl,
  },
  {
    name: "Супер-Пупер Унитаз",
    description: "Обмоет всё, что моется ещё лучше",
    price: "2599",
    img: "U.png",
    key: forSearch[0].toiletBowl,
  },
  {
    name: "Супер-Пупер Унитаз 2",
    description: "Куда лучше?",
    price: "3999",
    img: "U.png",
    key: forSearch[0].toiletBowl,
    discount: "red",
  },
  {
    name: "Realme 6 Pro",
    description: `Realme 6 Pro. 6,5-дюймов. 8-ядерный процессор Snapdragon 720G. 90 Гц`,
    price: "6999",
    img: "realme.png",
    key: forSearch[1].smartphone,
  },
  {
    name: "Iphone 7",
    description: `128 Гб,12 Мпикс.,(3840х2160 точек), ƒ/1.8, автофокус, True Tone Quad-LED вспышка, iOS 10`,
    price: "15 999",
    img: "Iphone 7.png",
    key: forSearch[1].smartphone,
  },
];

let basketArray = [];

let nickName = document.getElementById("nick");

let d = JSON.parse(localStorage.getItem("userData"));
if (d != null) {
  nickName.innerHTML = d.nick;
}

let searchInput = document.getElementById("Search");
searchInput.addEventListener("keypress", (key) => {
  key.key == "Enter" ? toSearch() : console.log(key.key);
});

let currentKey = "all";

function toSearch() {
  goodsGenerate(searchInput.value);
  currentKey = searchInput.value;
}
function goodsGenerate(key) {
  let goodBlock = goods.map((elem, id) => {
    if (elem.key == key || key == "all") {
      let block = `
    <div class="good-block">
       <img class="good-img" src="./assets/img/${elem.img}">
       <div class="good-name" onclick="goodPage(${id})">${elem.name}</div>
       <div class="good-description">
       ${elem.description}      
       </div>
       <button class="buy-button" onclick="buy(${id})">Buy</button>
       <div class="good-price ${elem.discount}">${elem.price}</div>
    </div>`;

      return block;
    } else {
    }
  });
  currentKey = key;
  document.querySelector(".goods-container").innerHTML = goodBlock;
}
function goodPage(id) {
  let array = goods[id];
  let block = `
  <div class="good-page-container">
    <img src="./assets/img/back.png" class="good-page-back" onclick="back()">
    <div class="good-page-name">${array.name}</div>  
    <img class="good-page-img" src="./assets/img/${array.img}">
    <div class="good-page-description">${array.description}</div>
    <div class="good-page-price">Price: ${array.price}</div>
    <button class="buy-button" onclick="buy(${id})">Buy</button>
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
  </div>`;
  } else {
    block = `
  <div class="good-page-container">
  Nick: -- ${userData.nick}<br>
  Age: -- ${userData.age}
  </div>`;
  }
  console.log(userData);

  document.querySelector(".goods-container").innerHTML = block;
}

function log() {
  let userData = localStorage.getItem("userData");
  let block;
  if (userData == null) {
    block = `
  <div class="good-page-container">
  <input placeholder="Nick" id="log-nick">
  <input placeholder="Age" id="log-age">
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
  let basketBlock = `<div class="good-page-container">
  <div>Покупки: </div>
`;

  basketBlock += basketArray.map((elem) => {
    let block = `
  
  <div>${elem.name}</div>

  `;
    return block;
  });
  basketBlock += `<button onclick="">Оформить</button>`;

  document.querySelector(".goods-container").innerHTML = basketBlock;
}

function saveData() {
  let userData = {
    nick: document.getElementById("log-nick").value,
    age: document.getElementById("log-age").value,
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
  basketArray.push({
    name: goods[id].name,
  });
}
