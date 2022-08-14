const express = require('express');
const app = express();
const http = require('http').createServer(app);

const request = require("request");
const jsdom = require("jsdom");
const util = require('util');
const fs = require('fs');
const downloadImg = require('image-downloader');



http.listen('3333', async () => {
  console.log('listening on port: ' + process.env.PORT);

  // const createJson = (table) => {

  // }

  // const converToPage = async (string) => {
  //   const {
  //     document
  //   } = new jsdom.JSDOM(string).window;
  //   const rows = document.body.querySelectorAll('.is-style-stripes tr');
  //   const outputList = [];

  //   console.log('rows', rows);

  //   for (let i = 0; i < rows.length; i++) {
  //     const currentRow = rows[i].children;


  //     let name = currentRow[0].innerHTML;
  //     name = name.replace(/<\/?strong>|&nbsp;/gi, '');
  //     name = name.replace(/<br>/gi, ' ');

  //     let attacks = currentRow[1].innerHTML;
  //     attacks = attacks.split('<br>');

  //     let attackObj = {
  //       name,
  //       attackPattrn: [],
  //     };

  //     attacks.forEach((element, i) => {
  //       let cleanAttack = element.replace(/<\/?strong>|<\/?em>|<br>/gi, '');
  //       cleanAttack = cleanAttack.replace(/&nbsp;/gi, ' ');
  //       cleanAttack = cleanAttack.replace(/: /gi, ':');

  //       if (cleanAttack.indexOf(':') !== -1) {
  //         const splitAttack = cleanAttack.split(':');

  //         attackObj.attackPattrn.push([splitAttack[0], splitAttack[1]]);
  //       };

  //       if (i + 1 === attacks.length) {
  //         outputList.push(attackObj);
  //       }
  //     });

  //     if (i + 1 === rows.length) {
  //       console.log(outputList);
  //     }

  //     // console.log(attacks);
  //     //   const img = monster.children[0];
  //     //   const stats = monster.children[1].querySelector('table tbody');
  //     //   const partsFound = monster.children[2];


  //     //   const lowAttackRow = stats.children[1];
  //     //   const lowDefenseRow = stats.children[2];
  //     //   const highAttackRow = stats.children[3];
  //     //   const highDefenseRow = stats.children[4];


  //     //   if (parseInt(lowAttackRow.children[1].innerHTML) !== 0) {



         

  //     //     let temp = {
  //     //       name: img.children[1].innerHTML,
  //     //       stats: {
  //     //         low: {
  //     //           lp: lowAttackRow.children[1].innerHTML,
  //     //           speed: lowAttackRow.children[2].innerHTML,
  //     //           attack: [
  //     //             lowAttackRow.children[4].innerHTML,
  //     //             lowAttackRow.children[5].innerHTML,
  //     //             lowAttackRow.children[6].innerHTML,
  //     //             lowAttackRow.children[7].innerHTML,
  //     //             lowAttackRow.children[8].innerHTML,
  //     //             lowAttackRow.children[9].innerHTML,
  //     //           ],
  //     //           defense: [
  //     //             lowDefenseRow.children[1].innerHTML,
  //     //             lowDefenseRow.children[2].innerHTML,
  //     //             lowDefenseRow.children[3].innerHTML,
  //     //             lowDefenseRow.children[4].innerHTML,
  //     //             lowDefenseRow.children[5].innerHTML,
  //     //             lowDefenseRow.children[6].innerHTML,
  //     //           ],
  //     //         },
  //     //         high: {
  //     //           lp: highAttackRow.children[1].innerHTML,
  //     //           speed: highAttackRow.children[2].innerHTML,
  //     //           attack: [
  //     //             highAttackRow.children[4].innerHTML,
  //     //             highAttackRow.children[5].innerHTML,
  //     //             highAttackRow.children[6].innerHTML,
  //     //             highAttackRow.children[7].innerHTML,
  //     //             highAttackRow.children[8].innerHTML,
  //     //             highAttackRow.children[9].innerHTML,
  //     //           ],
  //     //           defense: [
  //     //             highDefenseRow.children[1].innerHTML,
  //     //             highDefenseRow.children[2].innerHTML,
  //     //             highDefenseRow.children[3].innerHTML,
  //     //             highDefenseRow.children[4].innerHTML,
  //     //             highDefenseRow.children[5].innerHTML,
  //     //             highDefenseRow.children[6].innerHTML,
  //     //           ],
  //     //         },
  //     //       }
  //     //     }

  //     //     if (partsFound.querySelector('table tbody')) {
  //     //       const partsTable = partsFound.querySelector('table tbody');
  //     //       const partsRows = partsTable.children;
  //     //       const parts = [];

  //     //       for (let i2 = 0; i2 < partsRows.length; i2++) {
  //     //         const row = partsRows[i2];
  //     //         const id = row.children[0].children[0].getAttribute('src').match(/(\d+).png/)[1];
  //     //         const allTactics = [
  //     //           {name: 'Slice', points: parseInt(row.children[2].innerHTML)},
  //     //           {name: 'Blunt', points: parseInt(row.children[3].innerHTML)},
  //     //           {name: 'Pierce', points: parseInt(row.children[4].innerHTML)},
  //     //         ];

  //     //         // const tactic = Math.max.apply(Math, allTactics.map(function(o) { return o.name; }));
  //     //         const tactic = allTactics.reduce(function(prev, current) {
  //     //           return (prev.points > current.points) ? prev : current
  //     //       }) //returns object

  //     //         console.log(tactic);

  //     //         parts.push({
  //     //           id,
  //     //           tactic: tactic.name
  //     //         });

  //     //         if (i2+1 === partsRows.length) {
  //     //           temp.parts = parts;
  //     //         }
  //     //       }

  //     //     }


  //     //     outputList.push(temp);
  //     //   };


  //     //   if (i + 1 === monsters.length) {
  //     //     // console.log(statsTable.children[1].children[1].innerHTML);


  //     //     // console.log(util.inspect(outputList, { showHidden: false, depth: null, colors: true }));


  //     // }

  //     // fs.writeFile("monsters/monsters.json", JSON.stringify(outputList), 'utf8', function (err) {
  //     //   if (err) {
  //     //     console.log("An error occured while writing JSON Object to File.");
  //     //     return console.log(err);
  //     //   }

  //     //   console.log("JSON file has been saved.");
  //     // });

  //   }
  // }

  // request('https://progameguides.com/monster-hunter/all-attack-types-weaknesses-and-counters-in-monster-hunter-stories-2-wings-of-ruin/', function (error, response, body) {
  //   converToPage(body);

  //   if (error) console.log(error);
  // });


  // let parts = require('./monsters/stats-parts.json');


  // let attacks = require('./monsters/attackPtrn.json');

  // let no = [];



  // parts.forEach((e, index) => {
  //   let found = false;

  //   attacks.forEach((element, i) => {

  //     if (element.name !== e.name && i+1 === attacks.length && !found) {
  //       no.push(e.name);
  //     } else if (element.name === e.name) {
  //       found = true
  //     }
  //   });

  //   if (index+1 === parts.length) {

  //    fs.writeFile("monsters/no-attackptrn.json", JSON.stringify(no), 'utf8', function (err) {
  //      if (err) {
  //        console.log("An error occured while writing JSON Object to File.");
  //        return console.log(err);
  //      }

  //      console.log("JSON file has been saved.");
  //    });
  //   }
  // });

  let attacks = require('./monsters/temp.json');
  const notFound = [];

  request('https://mhst.kiranico.com/mhs2/data/monsties/', function (error, response, body) {

    const {
      document
    } = new jsdom.JSDOM(body).window;
    const trs = document.body.querySelectorAll('tr');
    let time = 1;

    trs.forEach(tr => {
      time++;
      setTimeout(() => {


        const img = tr.querySelector('small + img');
        let name = tr.children[0];



        if (img && name.innerHTML) {
          name = name.querySelector('div').textContent;
          name = name.trim();
          console.log(name, img);

          const options = {
            url: img.getAttribute('src'),
            dest: `./static/images/eggs/${name}-egg.png`                // will be saved to /path/to/dest/image
          }

          downloadImg.image(options)
            .then(({ filename }) => {
              console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
            })
            .catch((err) => console.error(err))


          // let found = attacks.findIndex(e => e.name === headerData[2]);
          // let basicData = false;
          // let location = false;
          // let weakness = false;
          // let retreat = false;
          // let kinship = false;

          // const createObject = () => {
          //   const temp = {
          //     number: headerData[1],
          //     basic: {
          //       genus: basicData.genus,
          //       rarity: basicData.rarity,
          //       attackType: basicData.attackType,
          //       attackElement: basicData.attackElement,
          //       defenseElement: basicData.defenceElement,
          //       defenseWeakness: weakness.value,
          //       ridingActions: basicData.ridingActions,
          //       hatchable: basicData.hatchable,
          //       kinship: kinship ? kinship : false,
          //     },

          //     location: {
          //       locations: location.values,
          //       retreat: retreat ? retreat.values : false,
          //     }
          //   }

          //   attacks[found] = {
          //     number: headerData[1],
          //     name: attacks[found].name,
          //     basic: temp.basic,
          //     location: temp.location,
          //     attackPattrn: attacks[found].attackPattrn
          //   };

          //   fs.writeFile("monsters/temp2.json", JSON.stringify(attacks), 'utf8', function (err) {
          //     if (err) {
          //       console.log("An error occured while writing JSON Object to File.");
          //       return console.log(err);
          //     }

          //     console.log("JSON file has been saved.");
          //   });
          // }




          // if (found !== -1) {
          //   let nextSibling = h2.nextElementSibling;
          //   let index = 0;

          //   while (nextSibling.tagName !== 'H2') {

          //     nextSibling = nextSibling.nextElementSibling;

          //     if (!nextSibling) {
          //       nextSibling = {
          //         tagName: 'H2'
          //       };
          //       return;
          //     };

          //     const thisHeader = nextSibling;
          //     const tagName = thisHeader.tagName;

          //     if (tagName === 'H1') {

          //       if (thisHeader.textContent === 'Information') {
          //         basicData = thisHeader.nextElementSibling;



          //         while (basicData.tagName !== 'UL') {
          //           basicData = basicData.nextElementSibling;

          //           const length = basicData.children.length;

          //           if (basicData.tagName === 'UL' && basicData.children.length) {
          //             let genus = false;
          //             let rarity = false;
          //             let attackType = false;
          //             let attackElement = false;
          //             let defenceElement = false;
          //             let ridingActions = false;
          //             let hatchable = false;

          //             for (let i = 0; i < length; i++) {
          //               const child = basicData.children[i];

          //               if (child.textContent.indexOf('Genus') !== -1) {
          //                 genus = child.textContent.replace('Genus: ', '');
          //               } else if (child.textContent.indexOf('Rarity') !== -1) {
          //                 rarity = child.innerHTML.match(/★/g).length;
          //               } else if (child.textContent.indexOf('Attack Type') !== -1) {
          //                 attackType = child.textContent.replace('Attack Type: ', '');
          //               } else if (child.textContent.indexOf('Attack Element') !== -1) {
          //                 attackElement = child.textContent.replace('Attack Element: ', '');
          //               } else if (child.textContent.indexOf('Resistance') !== -1) {
          //                 defenceElement = child.textContent.replace('Resistance: ', '');
          //               } else if (child.textContent.indexOf('Riding Actions') !== -1) {
          //                 ridingActions = child.querySelectorAll('li');
          //                 ridingActions = [].slice.call(ridingActions).map(e => e.textContent);
          //               } else if (child.textContent.indexOf('Hatchable?') !== -1) {
          //                 hatchable = child.textContent.includes('Yes') ? true : false;
          //               }

          //               if (i + 1 === length) {
          //                 basicData = {
          //                   tagName: 'UL',
          //                   genus,
          //                   rarity,
          //                   attackType,
          //                   attackElement,
          //                   defenceElement,
          //                   ridingActions,
          //                   hatchable
          //                 }
          //               }

          //             }

          //           }
          //         }


          //       } else if (thisHeader.textContent === 'Where to Find') {
          //         location = thisHeader.nextElementSibling;

          //         while (location.tagName !== 'UL') {
          //           location = location.nextElementSibling;

          //           if (location.tagName === 'UL' && location.children.length) {
          //             const values = [];

          //             for (const item of location.children) {
          //               const cleanItem = item.textContent.replace(/Location \d+: /, '');
          //               values.push(cleanItem);

          //             }

          //             location = {
          //               tagName: 'UL',
          //               values,
          //             };
          //           }
          //         }


          //       } else if (thisHeader.textContent === 'Weaknesses' || thisHeader.textContent === 'Weakness') {
          //         weakness = thisHeader.nextElementSibling;


          //         while (weakness && weakness.tagName !== 'UL') {
          //           weakness = weakness.nextElementSibling;

          //           if (weakness && weakness.tagName === 'UL' && weakness.children.length) {
          //             weakness = {
          //               tagName: 'UL',
          //               value: weakness.children[0].textContent,
          //             }
          //           }
          //         }


          //       } else if (thisHeader.textContent === 'Retreat Boost') {
          //         retreat = thisHeader.nextElementSibling;

          //         while (retreat.tagName !== 'UL') {
          //           retreat = retreat.nextElementSibling;


          //           if (retreat && retreat.tagName === 'UL' && retreat.children.length) {
          //             const values = [];

          //             for (const item of retreat.children) {
          //               const cleanItem = item.textContent;
          //               values.push(cleanItem);
          //             }

          //             retreat = {
          //               tagName: 'UL',
          //               values
          //             }
          //           }
          //         }


          //       } else if (thisHeader.textContent === 'Kinship Skill') {
          //         kinship = thisHeader.nextElementSibling.textContent;

          //       }
          //     }

          //     if (nextSibling.tagName === 'H2') {
          //       // console.log('kinship', kinship);
          //       createObject();
          //     }

          //   }






          //   // h2.classList.add('h2');

          //   // console.log(headerData[1]);


          //   // let lists = document.body.querySelectorAll('.h2 ~ ul');
          //   // lists = Array.prototype.filter.call(lists, node => {
          //   //   if (!node.children[0].style.length) {
          //   //     return node;
          //   //   } else {
          //   //     return;
          //   //   }
          //   // });
          //   // // lists = [].slice.call(lists).map(e => e.style !== 'list-style-type: none;');

          //   // const basicData = lists[0];
          //   // const basicDataLi = basicData.querySelectorAll('li');
          //   // const location = lists[1];
          //   // const weakness = lists[2];
          //   // const retreat = lists[5];
          //   // let kinship = retreat.nextElementSibling;
          //   // console.log('lists', basicData.children[2].innerHTML);
          //   // kinship = kinship.nextElementSibling;
          //   // console.log(kinship);
          //   // kinship = kinship.nextElementSibling;
          //   // console.log(kinship);



          //   // let ridingActions = basicData.children[7];
          //   // if (ridingActions) {
          //   //   ridingActions.querySelectorAll('li');
          //   //   ridingActions = [].slice.call(ridingActions).map(e => e.innerHTML);
          //   // }

          //   // let locations = location.children[0].textContent.replace('Location 1: ', '');
          //   // locations = locations.split('; ');

          //   // let defenseElement = basicDataLi[5];
          //   // if (defenseElement)
          //   //   defenseElement = defenseElement.textContent.replace('Resistance: ', '');

          //   // const temp = {
          //   //   number: headerData[1],
          //   //   basic: {
          //   //     genus: basicDataLi[1].textContent.replace('Genus: ', ''),
          //   //     rarity: basicDataLi[2].innerHTML.match(/★/g).length,
          //   //     attackType: basicDataLi[3].textContent.replace('Attack Type: ', ''),
          //   //     attackElement: basicDataLi[4].textContent.replace('Attack Element: ', ''),
          //   //     defenseElement: defenseElement || false,
          //   //     defenseWeakness: weakness.children[0].textContent,
          //   //     ridingActions: ridingActions || 'None',
          //   //     hatchable: basicDataLi[8].innerHTML.includes('Yes') ? true : false,
          //   //     kinship: kinship.textContent,
          //   //   },

          //   //   location: {
          //   //     locations,
          //   //     retreat: retreat.children[0].textContent,
          //   //   }
          //   // }



          //   // attacks[found] = temp;
          //   // h2.classList.remove('h2');



          // } else {
          //   // notFound.push(headerData[2]);
          // }
        }

        // console.log(time);
      }, time*500);

      // fs.writeFile("monsters/temp.json", JSON.stringify(attacks), 'utf8', function (err) {
      //   if (err) {
      //     console.log("An error occured while writing JSON Object to File.");
      //     return console.log(err);
      //   }

      //   console.log("JSON file has been saved.");
      // });

      

      if (error) console.log(error);
    });
  });



});