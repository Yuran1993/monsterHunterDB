let splide;
let busy = false;
let favos;

//* Help functions
let myTimeout;
const debounce = (fn, timer) => {
  clearTimeout(myTimeout);
  myTimeout = setTimeout(async () => {
    fn();
  }, timer);
};

function getParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

async function setParams() {
  const activeMonster = document.querySelector("li.is-active");
  const id = activeMonster.getAttribute("data-splide-hash");

  const url = new URL(window.location);
  url.searchParams.set("ID", id);
  window.history.pushState({}, "", url);
}

function getFilters() {
  const storageFilters = localStorage.getItem("monster-list-filters");
  if (!storageFilters) return "";

  return "filters=" + storageFilters;
}

function imgReady(imgArr) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      let allReady = true;
      const htmlArr = Array.from(imgArr);

      htmlArr.forEach((img, i) => {
        const imgReady = img.complete && img.naturalHeight !== 0;

        console.log(img.complete, img.naturalHeight);

        if (!imgReady) allReady = false;

        console.log('htmlArr.length', htmlArr.length);
        console.log('i', i+1);

        if (i + 1 >= htmlArr.length) {
          if (allReady) {
            clearInterval(interval);
            resolve(allReady);
          } else {

          }
        }
      });
    }, 100);
  });
}

//* Layout functionality
const setLayout = () => {
  const mobile = window.innerWidth <= 685;

  if (!mobile) {
    setMasonry();
  } else {
    setTabFn();
  }

  resizePageHeight();
};

function setMasonry() {
  console.log('setMasonry');
  var elems = document.querySelectorAll(".masonry-notSet");

  elems.forEach(function (elem) {
    elem.classList.remove("masonry-notSet");

    var msnry = new Masonry(elem, {
      itemSelector: ".elementWrapper",
      columnWidth: 0,
    });
  });
}

async function resizePageHeight() {
  const activeMonster = document.querySelector("li.is-active");
  const activeMonsterHeight = activeMonster.querySelector(
    ".monsterWrapper_inner"
  ).offsetHeight;
  const inner = document.querySelector(".main_inner");

  inner.style.height = activeMonsterHeight + 3 + "px";
}

//* Mobile tab functionality
function ClosedTabsData() {
  const obj = {
    get: function () {
      const monsterPage = JSON.parse(localStorage.getItem("monsterPage"));
      const values =
        monsterPage && monsterPage.ClosedTabs ? monsterPage.ClosedTabs : [];

      return values;
    },
    set: function () {
      let monsterPage = JSON.parse(localStorage.getItem("monsterPage"));
      const currentClosedElements = document.querySelectorAll(
        ".elementWrapper.closed"
      );
      let currentClosedIDs = Array.from(currentClosedElements).map(function (
        item
      ) {
        return item.dataset.wrapper;
      });
      currentClosedIDs = [...new Set(currentClosedIDs)];

      if (monsterPage) {
        monsterPage.ClosedTabs = currentClosedIDs;
      } else {
        monsterPage = {
          ClosedTabs: currentClosedIDs,
        };
      }

      localStorage.setItem("monsterPage", JSON.stringify(monsterPage));
    },
  };

  return obj;
}

function setTabFn() {
  const closedTabs = ClosedTabsData();
  const closedTabsStorage = closedTabs.get();

  const headers = document.querySelectorAll(".elementWrapper .header");

  headers.forEach((e) => {
    if (e.classList.contains("tabFn-set")) return;

    e.classList.add("tabFn-set");
    let parentWrapper = e.parentNode;
    const wrapperHeight = parentWrapper.offsetHeight - 20 + "px";

    closedTabsStorage.forEach((tabName) => {
      if (parentWrapper.classList.contains(tabName)) {
        parentWrapper.classList.add("closed");
        parentWrapper.style.height = "26px";
      }
    });

    e.addEventListener("click", () => {
      const parentClasses = parentWrapper.classList.toString();
      const allWrapper = document.querySelectorAll(
        "." + parentClasses.replaceAll(" ", ".")
      );

      allWrapper.forEach(function (wrapper) {
        wrapper.classList.toggle("closed");

        if (wrapper.classList.contains("closed")) {
          wrapper.style.height = "26px";
        } else {
          wrapper.style.height = "";
        }
      });

      resizePageHeight();
      closedTabs.set();
    });
  });
}

//* Get monster data
async function getPlaceholders() {
  return new Promise(async (resolve) => {
    const response = await fetch("./get-all-monsters/?" + getFilters());
    let data = await response.json();

    console.log("data", data);

    if (favos)
      data = data.filter((element) =>
        favos.find((e) => e.number === element.number)
      );

    console.log("favos", favos);
    console.log("data", data);

    const list = document.querySelector(".splide__list");

    data.forEach(function (e, i) {
      const newLi = document.createElement("li");
      newLi.classList.add("monsterWrapper", "splide__slide");
      newLi.setAttribute("data-splide-hash", e.number);

      newLi.innerHTML = `
       <div class="placeholder-monster monsterWrapper_inner"
      id="N${e.number}"></div>`;

      list.append(newLi);

      if (i + 1 === data.length) resolve();
    });
  });
}

async function fetchMonster(arr) {
  return new Promise(async (resolve) => {
    console.log("arr", arr);
    const response = await fetch(
      "./get-monster/?monsterIDs=" + JSON.stringify(arr) + "&" + getFilters()
    );
    const data = await response.json();

    console.log("data", data);

    if (data)
      data.forEach(function (monster, i) {
        console.log("monster", monster);
        const li = document.querySelector(
          `li[data-splide-hash="${monster.number}"]`
        );

        li.innerHTML = generateMonsterPage(monster).innerHTML;

        if (i + 1 === data.length) resolve(true);
      });
  });
}

async function getMonsters() {
  return new Promise(async (resolve) => {
    busy = true;

    const activeMonster = document.querySelector("li.is-active");

    if (activeMonster.querySelector(".placeholder-monster")) {
      const currentArr = [];

      currentArr.push(activeMonster.getAttribute("data-splide-hash"));

      if (activeMonster.previousElementSibling)
        currentArr.push(
          activeMonster.previousElementSibling.getAttribute("data-splide-hash")
        );

      if (activeMonster.nextElementSibling)
        currentArr.push(
          activeMonster.nextElementSibling.getAttribute("data-splide-hash")
        );

      await fetchMonster(currentArr);
    }

    const prevMonster = activeMonster.previousElementSibling;
    let prevMonster2 = prevMonster?.previousElementSibling;
    let prevMonster3 = prevMonster2?.previousElementSibling;

    if (prevMonster2 && prevMonster2.querySelector(".placeholder-monster")) {
      const prevArr = [];

      prevArr.push(prevMonster2.getAttribute("data-splide-hash"));

      if (prevMonster3 && prevMonster3.querySelector(".placeholder-monster"))
        prevArr.push(prevMonster3.getAttribute("data-splide-hash"));

      await fetchMonster(prevArr);
    }

    const nextMonster = activeMonster.nextElementSibling;
    let nextMonster2 = nextMonster?.nextElementSibling;
    let nextMonster3 = nextMonster2?.nextElementSibling;

    if (nextMonster2 && nextMonster2.querySelector(".placeholder-monster")) {
      const nextArr = [];

      nextArr.push(nextMonster2.getAttribute("data-splide-hash"));

      if (nextMonster3 && nextMonster3.querySelector(".placeholder-monster"))
        nextArr.push(nextMonster3.getAttribute("data-splide-hash"));

      await fetchMonster(nextArr);
    }

    console.log('ckeck img');
    await imgReady(document.querySelectorAll(".monsterImage"));
    console.log('img done');
    setLayout();

    busy = false;
    resolve();
  });
}

//* Favorits functionality
const favoBtn = document.querySelector('button[title="Favorite"]');

function checkFavorits() {
  let localFavos = localStorage.getItem("monster-favos");
  if (!localFavos) return;
  localFavos = JSON.parse(localFavos);

  const favoBtn = document.querySelector('button[title="Favorite"]');
  const activeMonster = document.querySelector("li.is-active");
  const activeMonsterID = activeMonster.getAttribute("data-splide-hash");

  if (localFavos.data.find((e) => e.number === activeMonsterID)) {
    favoBtn.classList.add("favo_active");
  } else {
    favoBtn.classList.remove("favo_active");
  }
}

function isFavoActive() {
  let localFavos = localStorage.getItem("monster-favos");
  if (!localFavos) return;
  localFavos = JSON.parse(localFavos);

  if (localFavos.active) favos = localFavos.data;
}

favoBtn.addEventListener("click", function () {
  let localFavosObj = JSON.parse(localStorage.getItem("monster-favos")) || {};
  const localFavos = localFavosObj.data || [];
  let newFavos;

  const activeMonster = document.querySelector("li.is-active");
  const activeMonsterID = activeMonster.getAttribute("data-splide-hash");

  if (localFavos && localFavos.find((e) => e.number === activeMonsterID)) {
    newFavos = localFavos.filter((e) => e.number !== activeMonsterID);
  } else if (
    localFavos &&
    !localFavos.find((e) => e.number === activeMonsterID)
  ) {
    newFavos = [...localFavos, { number: activeMonsterID }];
  } else {
    newFavos = [{ number: activeMonsterID }];
  }

  localFavosObj.data = newFavos;

  localStorage.setItem("monster-favos", JSON.stringify(localFavosObj));

  checkFavorits();
});

//* Init
const init = async () => {
  const inner = document.querySelector(".splide__list");

  isFavoActive();
  await getPlaceholders();
  splide = await new Splide(".main_inner").mount();

  await getMonsters();

  let activeMonster;
  let activeMonsterI;

  activeMonster = document.querySelector(`li[data-splide-hash="${getParameter("ID")}"]`);
  activeMonsterI = Array.from(activeMonster.parentNode.children).indexOf(activeMonster);
  splide.Components.Controller.go(activeMonsterI);

  setTimeout(() => {
    document.querySelector(".hide").classList.remove("hide");
  }, 200);

  inner.addEventListener("transitionend", async function () {
    debounce(async function () {
      setParams();
      checkFavorits();

      if (!busy) await getMonsters();
    }, 200);
  });
};

init();
