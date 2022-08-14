const express = require('express');
const app = express();
const http = require('http').createServer(app);

const request = require("request");
const jsdom = require("jsdom");
const util = require('util');
const fs = require('fs');
const downloadImg = require('image-downloader');

const items = require('./monsters/combi.json');
const statsList = require('./monsters/monstieStats.json');

let temp = [];
let index = 0;



items.forEach((e, i) => {
  const stats = statsList.find(st => st.monsterName === e.name);

  if (stats) {
    console.log('stats', stats);

    delete stats.monsterName;
    e.monstieStats = stats;

  } else {
    console.log('STATS NOT FOUND', e.name);
  }

  if (i + 1 === items.length) {
    fs.writeFile("monsters/combi+monstie.json", JSON.stringify(items), 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  }


})


// request('https://mhst.kiranico.com/mhs2/data/monsties', function (error, response, body) {
//   const {
//     document
//   } = new jsdom.JSDOM(body).window;
//   const tbody = document.body.querySelector('.card-body > table tbody');
//   let allStats = [];

//   for (let i = 0; i < tbody.children.length; i++) {
//     const monster = tbody.children[i];
//     const monsterName = monster.children[0].children[0].textContent.trim();
//     const stats = monster.children[2].querySelector('table');

//     const statsHeader = stats.querySelector('thead tr');

//     let speed = statsHeader.children[0].textContent.replace('Speed : ', '');
//     let crit = statsHeader.children[1].textContent.replace('Crit Rate : ', '');
//     speed = parseInt(speed);
//     crit = parseInt(crit);

//     const statsBody = stats.querySelector('tbody');

//     const leven1row = statsBody.children[0];
//     const leven20row = statsBody.children[2];
//     const leven50row = statsBody.children[5];
//     const leven99row = statsBody.children[7];

//     const monstieStats = {
//       monsterName,
//       speed,
//       crit,
//       level1: {
//         lp: leven1row.children[1].textContent,
//         Recovery: leven1row.children[2].textContent,
//         attack: [
//           leven1row.children[3].textContent,
//           leven1row.children[4].textContent,
//           leven1row.children[5].textContent,
//           leven1row.children[6].textContent,
//           leven1row.children[7].textContent,
//           leven1row.children[8].textContent,
//         ],
//         defence: [
//           leven1row.children[9].textContent,
//           leven1row.children[10].textContent,
//           leven1row.children[11].textContent,
//           leven1row.children[12].textContent,
//           leven1row.children[13].textContent,
//           leven1row.children[14].textContent,
//         ],
//       },

//       level20: {
//         lp: leven20row.children[1].textContent,
//         Recovery: leven20row.children[2].textContent,
//         attack: [
//           leven20row.children[3].textContent,
//           leven20row.children[4].textContent,
//           leven20row.children[5].textContent,
//           leven20row.children[6].textContent,
//           leven20row.children[7].textContent,
//           leven20row.children[8].textContent,
//         ],
//         defence: [
//           leven20row.children[9].textContent,
//           leven20row.children[10].textContent,
//           leven20row.children[11].textContent,
//           leven20row.children[12].textContent,
//           leven20row.children[13].textContent,
//           leven20row.children[14].textContent,
//         ],
//       },

//       level50: {
//         lp: leven50row.children[1].textContent,
//         Recovery: leven50row.children[2].textContent,
//         attack: [
//           leven50row.children[3].textContent,
//           leven50row.children[4].textContent,
//           leven50row.children[5].textContent,
//           leven50row.children[6].textContent,
//           leven50row.children[7].textContent,
//           leven50row.children[8].textContent,
//         ],
//         defence: [
//           leven50row.children[9].textContent,
//           leven50row.children[10].textContent,
//           leven50row.children[11].textContent,
//           leven50row.children[12].textContent,
//           leven50row.children[13].textContent,
//           leven50row.children[14].textContent,
//         ],
//       },

//       level99: {
//         lp: leven99row.children[1].textContent,
//         Recovery: leven99row.children[2].textContent,
//         attack: [
//           leven99row.children[3].textContent,
//           leven99row.children[4].textContent,
//           leven99row.children[5].textContent,
//           leven99row.children[6].textContent,
//           leven99row.children[7].textContent,
//           leven99row.children[8].textContent,
//         ],
//         defence: [
//           leven99row.children[9].textContent,
//           leven99row.children[10].textContent,
//           leven99row.children[11].textContent,
//           leven99row.children[12].textContent,
//           leven99row.children[13].textContent,
//           leven99row.children[14].textContent,
//         ],
//       },
//     }

//     allStats.push(monstieStats);

//     if (i + 1 === tbody.children.length) {
//       fs.writeFile("monsters/monstieStats.json", JSON.stringify(allStats), 'utf8', function (err) {
//         if (err) {
//           console.log("An error occured while writing JSON Object to File.");
//           return console.log(err);
//         }

//         console.log("JSON file has been saved.");
//       });
//     }

//   }


// });




// const sortItems = () => {
//   function compare(a, b) {
//     if (a.number < b.number) {
//       return -1;
//     }
//     if (a.number > b.number) {
//       return 1;
//     }
//     return 0;
//   }
//   items.sort(compare);


//   fs.writeFile("monsters/temp.json", JSON.stringify(items), 'utf8', function (err) {
//     if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//     }

//     console.log("JSON file has been saved.");
//   });
// }


// items.forEach((e, i) => {

//   if (e.parts && e.parts.length) {
//     e.parts.forEach(part => {
//       part.tactic = part.tactic.name;
//       console.log(part);
//     });
//   } 

//   if (i + 1 === items.length) {
//     fs.writeFile("monsters/temp.json", JSON.stringify(items), 'utf8', function (err) {
//       if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//       }

//       console.log("JSON file has been saved.");
//     });
//   }
// })





// items.forEach((e, i) => {





//   // if (e.basic && e.basic.defenseWeakness.indexOf('Element') !== -1) {
//   //   index++;

//   //   const elements = ["Non-Elem", "Fire", "Water", "Thunder", "Ice", "Dragon"];

//   //   e.basic.defenseWeakness = e.basic.defenseWeakness.replace(' Element', '')

//   //   console.log(index, e.name, e.basic.defenseWeakness.replace(' Element', ''));



//   //   // const stats = statsList.find(st => st.name === e.name);
//   //   // let attackStats = stats.stats.low.attack;
//   //   // let defenseStats = stats.stats.low.defense;

//   //   // attackStats = attackStats.map(function (x) { 
//   //   //   return parseInt(x, 10); 
//   //   // });
//   //   // defenseStats = defenseStats.map(function (x) { 
//   //   //   return parseInt(x, 10); 
//   //   // });

//   //   // const attackIndex = attackStats.indexOf(Math.max(...attackStats));
//   //   // const defenseIndex = defenseStats.indexOf(Math.max(...defenseStats));

//   //   // const attackElement = elements[attackIndex];
//   //   // const defenseElement = elements[defenseIndex];

//   //   // e.basic.attackElement = attackElement;
//   //   // e.basic.defenseElement = defenseElement;


//   // }
//   if (i+1 === items.length) {



//   }
// });




// console.log(temp);


http.listen('3333', async () => {

});