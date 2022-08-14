const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const http = require('http').createServer(app);

const request = require("request");
const jsdom = require("jsdom");
const util = require('util');
const fs = require('fs');
const downloadImg = require('image-downloader');

let items = require('./monsters/monster-list.json');

function filterMonster(filters) {
  const filtersObj = JSON.parse(filters);
  const filterdMonsters = [];

  for (let i = 0; i < items.length; i++) {
    const monster = items[i];

    const hatchable = !filtersObj.hatchable ? true : monster.basic.hatchable;
    const attackType = filtersObj.attackType.length ? filtersObj.attackType.find(e => e === monster.basic.attackType) : true;
    const attackElement = filtersObj.attackElement.length ? filtersObj.attackElement.find(e => e === monster.basic.attackElement) : true;
    const defenseElement = filtersObj.defenseElement.length ? filtersObj.defenseElement.find(e => e === monster.basic.defenseElement) : true;
    const weakness = filtersObj.weakness.length ? filtersObj.weakness.find(e => e === monster.basic.defenseWeakness) : true;

    if (
      hatchable &&
      attackType &&
      attackElement &&
      defenseElement &&
      weakness
    ) {
      filterdMonsters.push(monster);
    }
    
  }

  return filterdMonsters;

  // items.forEach(function(monster) {

  // });
}

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', async (req, res) => {
  res.redirect('/monster-list');
});

app.get('/monster-list', async (req, res) => {

  res.render('monster-list', {
    items
  });
});

app.get('/monster-page', async (req, res) => {
  const {ID, filters} = req.query;
  let filteredItems;


  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }



  res.render('monster-page', {
    monsterID: ID,
    monsters: filteredItems
  });
});

app.get('/get-all-monsters', async (req, res) => {
  const {ID, filters} = req.query;
  let filteredItems;

  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }

  res.send(filteredItems);
});

app.get('/get-monster', async (req, res) => {
  let {monsterIDs, filters} = req.query;
  monsterIDs = JSON.parse(monsterIDs);
  let filteredItems;

  console.log('req.query', req.query);


  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }

  
  const result = [];
  
  monsterIDs.forEach(function(id, i) {
    console.log('id', id);

    const monster = filteredItems.find(e => e.number === id);

    // console.log('filteredItems', filteredItems);
    console.log('monster', monster);

    if (monster) result.push(monster);

    if (i+1 === monsterIDs.length) {
      res.send(result);
    }
  });

});

app.get('/get-monster-current', async (req, res) => {
  const {ID, filters} = req.query;
  let filteredItems;


  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }

  const currentMonsterIndex = filteredItems.findIndex(e => e.number === ID);

  res.send([filteredItems[currentMonsterIndex]]);
});

app.get('/get-monster-prev', async (req, res) => {
  const {ID, filters} = req.query;
  let filteredItems;


  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }

  const currentMonsterIndex = filteredItems.findIndex(e => e.number === ID);

  const prevMonsterIndex = currentMonsterIndex !== 0 ? currentMonsterIndex - 1 : false;
  const prevMonsterIndex2 = prevMonsterIndex !== 0 || false ? prevMonsterIndex - 1 : false;

  const nextMonsters = [];

  if (prevMonsterIndex) nextMonsters.push(filteredItems[prevMonsterIndex]);
  if (prevMonsterIndex2) nextMonsters.push(filteredItems[prevMonsterIndex2]);

  res.send(nextMonsters);
});

app.get('/get-monster-next', async (req, res) => {
  const {ID, filters} = req.query;
  let filteredItems;


  if (!filters) {
    filteredItems = items;
  } else {
    filteredItems = filterMonster(filters);
  }

  const currentMonsterIndex = filteredItems.findIndex(e => e.number === ID);

  const nextMonsterIndex = currentMonsterIndex !== (filteredItems.length - 1) ? currentMonsterIndex + 1 : false;
  const nextMonsterIndex2 = nextMonsterIndex !== (filteredItems.length - 1 || false) ? nextMonsterIndex + 1 : false;

  const nextMonsters = [];

  if (nextMonsterIndex) nextMonsters.push(filteredItems[nextMonsterIndex]);
  if (nextMonsterIndex2) nextMonsters.push(filteredItems[nextMonsterIndex2]);

  res.send(nextMonsters);
});


http.listen('3333', async () => {
  console.log('Listering on Port: 3333');

});