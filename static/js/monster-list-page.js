//* Main variables
const header = document.querySelector("header");
const list = document.querySelector('.monsterList');
const cards = document.querySelectorAll(".card");

//* help functions
let myTimeout = null;
const debounce = (fn, timer) => {
  clearTimeout(myTimeout);
  myTimeout = setTimeout(async () => {
    fn();
  }, timer);
};

//* Search functionality
const search = document.querySelector(".Search");
const closeSearch = document.querySelector(".closeSearch");
const searchField = document.querySelector("#searchField");

[search, closeSearch].forEach(function (e) {
  e.addEventListener("click", function () {
    header.classList.toggle("showSearch");
  });
});

search.addEventListener("click", function () {
  searchField.focus();
});

const searchFn = () => {
  const value = searchField.value;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const name = card.querySelector(".name").innerText;

    if (
      value.length &&
      name.toLowerCase().indexOf(value.toLowerCase()) === -1
    ) {
      card.style.display = "none";
    } else {
      card.style.display = "";
    }
  }
};

searchField.addEventListener("keydown", function (event) {
  debounce(searchFn, 500);

  if (event.keyCode === 13) {
    header.classList.remove("showSearch");
    this.blur();
  }
});


//* Scroll functionality (Gets and sets scroll depth)
const scrollDepth = localStorage.getItem('list-scroll-depth');

if (scrollDepth) {
  window.document.documentElement.scrollTop = scrollDepth;
};

window.addEventListener('scroll', function () {
  localStorage.setItem('list-scroll-depth', window.document.documentElement.scrollTop);
});


//* Filter functionality
const filtersOverlay = document.querySelector('.filters_overlay');
const filters = document.querySelector('.filters');
const filtersOpen = document.querySelector('.filters_open');
const filtersClose = document.querySelector('.filters_close');
const filtersSave = document.querySelector('.filters_save');
const filtersReset = document.querySelector('.filters_reset');

const setFilter = () => {
  const hatchable = document.querySelector('.filter_hatchable input:checked').id === 'All' ? false : true;
  const attackType = Array.from(document.querySelectorAll('.filter_attackType input:checked')).map(e => e.id);
  const attackElement = Array.from(document.querySelectorAll('.filter_attackElement input:checked')).map(e => e.getAttribute('data-filter-element'));
  const defenseElement = Array.from(document.querySelectorAll('.filter_defenseElement input:checked')).map(e => e.getAttribute('data-filter-element'));
  const weakness = Array.from(document.querySelectorAll('.filter_weakness input:checked')).map(e => e.getAttribute('data-filter-element'));

  const filters = {
    hatchable,
    attackType,
    attackElement,
    defenseElement,
    weakness
  }

  const noFilters = Object.values(filters).every(x => x.length === 0 || x === false);

  if (noFilters) {
    filtersOpen.classList.remove('filters_active');
  } else {
    filtersOpen.classList.add('filters_active');
  }

  localStorage.setItem('monster-list-filters', JSON.stringify(filters));
  return filters;
}

const getFilters = () => {
  let storageFilters = localStorage.getItem('monster-list-filters');
  if (!storageFilters) return;

  storageFilters = JSON.parse(storageFilters);

  filterList(storageFilters);

  const noFilters = Object.values(storageFilters).every(x => x.length === 0 || x === false);

  if (noFilters) {
    filtersOpen.classList.remove('filters_active');
  } else {
    filtersOpen.classList.add('filters_active');
  }


  const filters = document.querySelector('.filters');

  const hatchableFilter = filters.querySelector('.filter_hatchable #Hatchable')
  const typeFilters = filters.querySelectorAll('.filter_attackType input');
  const attackElementFilters = filters.querySelectorAll('.filter_attackElement input');
  const defenseElementFilters = filters.querySelectorAll('.filter_defenseElement input');
  const weaknessFilters = filters.querySelectorAll('.filter_weakness input');


  if (storageFilters.hatchable) hatchableFilter.checked = true;

  Array.from(typeFilters).forEach(filter => {
    const found = storageFilters.attackType.find(e => e === filter.name);

    if (found) filter.checked = true;
  });

  Array.from(attackElementFilters).forEach(filter => {
    const found = storageFilters.attackElement.find(e => e === filter.getAttribute('data-filter-element'));

    if (found) filter.checked = true;
  });

  Array.from(defenseElementFilters).forEach(filter => {
    const found = storageFilters.defenseElement.find(e => e === filter.getAttribute('data-filter-element'));

    if (found) filter.checked = true;
  });

  Array.from(weaknessFilters).forEach(filter => {
    const found = storageFilters.weakness.find(e => e === filter.getAttribute('data-filter-element'));

    if (found) filter.checked = true;
  });
}

const filterList = (filters) => {
  cards.forEach(function (card) {
    card.classList.remove('visible');
    card.classList.add('hide');

    const cardHatchable = card.querySelector('.hatchable');
    const cardAttackType = card.querySelector('.attackType').alt;
    const cardAttackElement = card.querySelector('.attackElement').alt;
    const cardDefenseElement = card.querySelector('.defenseElement').alt;
    const cardWeakness = card.querySelector('.weakness').alt;

    const checkObj = {
      hatchableCheck: filters.hatchable === false ? true : !!cardHatchable,
      attackTypeCheck: !filters.attackType.length ? true : !!filters.attackType.find(e => e === cardAttackType),
      attackElementCheck: !filters.attackElement.length ? true : !!filters.attackElement.find(e => e === cardAttackElement),
      defenseElementCheck: !filters.defenseElement.length ? true : !!filters.defenseElement.find(e => e === cardDefenseElement),
      weaknessCheck: !filters.weakness.length ? true : !!filters.weakness.find(e => e === cardWeakness)
    };

    if (Object.values(checkObj).every(e => e === true)) {
      card.classList.remove('hide');
      card.classList.add('visible');
    }
  });
}

const resetFilters = () => {
  const filters = document.querySelector('.filters');
  const Allmonster = filters.querySelector('#All');
  const allCheckboxes = filters.querySelectorAll('input[type="checkbox"]');

  Allmonster.checked = true;
  allCheckboxes.forEach(e => e.checked = false);

  const hiddenCards = document.querySelectorAll('.hide');
  hiddenCards.forEach(e => e.classList.remove('hide'));

  filtersOpen.classList.remove('filters_active');
  localStorage.removeItem('monster-list-filters');
}


filtersOpen.addEventListener('click', function () {
  filtersOverlay.classList.add('filters_show');
});

filtersClose.addEventListener('click', function () {
  filtersOverlay.classList.remove('filters_show');
});

filtersSave.addEventListener('click', function () {
  const filters = setFilter();

  filterList(filters);
  filtersOverlay.classList.remove('filters_show');
});

filtersReset.addEventListener('click', function () {
  resetFilters();
});

//* Favorites functionality
const favoBtn = document.querySelector('button[title="Favoriets"]');
let localFavos = localStorage.getItem('monster-favos');
if (localFavos) localFavos = JSON.parse(localFavos);

function hideNoneFavo() {
  if (!localFavos) return;

  cards.forEach(e => {
    const monsterID = e.querySelector('.number').textContent;

    if (!localFavos.data.find(e => e.number === monsterID.replace('#', '').trim())) {
      e.classList.toggle('hideNoneFavo');
    }
  });

  localFavos.active ? favoBtn.classList.add('favo_active') : favoBtn.classList.remove('favo_active');

  localStorage.setItem('monster-favos', JSON.stringify(localFavos));
}

favoBtn.addEventListener('click', () => {
  if (!localFavos.active) {
    localFavos.active = true;
  } else {
    localFavos.active = !localFavos.active;
  }

  hideNoneFavo();
});

function checkFavo() {
  if (!localFavos) return;

  if (localFavos.active) hideNoneFavo();
}

//* init

document.addEventListener('DOMContentLoaded', function() {
  checkFavo();
  getFilters();
  list.style.visibility = 'visible';
});