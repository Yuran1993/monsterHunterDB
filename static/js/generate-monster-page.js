window.generateMonsterPage = function (monster) {
  const newLi = document.createElement('li');
  newLi.classList.add('monsterWrapper', 'splide__slide', );
  newLi.setAttribute('data-splide-hash', monster.number);

  const wrapperInner = document.createElement('div');
  wrapperInner.classList.add('monsterWrapper_inner', monster.basic.attackElement, 'masonry-notSet');
  wrapperInner.id = 'N' + monster.number;

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('elementWrapper', 'imageWrapper', 'headerEl');
  imageWrapper.setAttribute('data-wrapper', 'headerEl');

  imageWrapper.innerHTML = `
  <img class="monsterImage" src="../images/large/${monster.name}.png" alt="monster image" />
  <div class="imageWrapper_inner">
    <span class="no-drag number">#${monster.number}</span>
    <span class="no-drag name">${monster.name}</span>
  </div>
  `;

  const basicInfo = document.createElement('div');
  basicInfo.classList.add('elementWrapper', 'basicInfo');
  basicInfo.setAttribute('data-wrapper', 'basicInfo');

  basicInfo.innerHTML = `
  <div class="header">
    <span>Basic info</span>
  </div>

  <div class="table element">
    <div>
      <p>
        Type: ${monster.basic.attackType ? `<img class="icon" src="../images/attackTypes/${monster.basic.attackType}.svg" alt="" />` : ''}
      </p>
      <p>
        Attack: ${monster.basic.attackElement ? `<img class="icon" src="../images/elements/small/${monster.basic.attackElement}.svg" alt="" />` : ''}
      </p>
    </div>

    <div>
      <p>
        Defense: ${monster.basic.defenseElement ? `<img class="icon" src="../images/elements/small/${monster.basic.defenseElement}.svg" alt="" />` : ''}
      </p>
      <p>
        Weakness: ${monster.basic.defenseWeakness ? `<img class="icon" src="../images/elements/small/${monster.basic.defenseWeakness}.svg" alt="" />` : ''}
      </p>
    </div>

    <div>
      <p class="rarity">
        ${monster.basic.rarity}
        <img class="icon" src="../images/icons/star-brown.svg" alt="" />
      </p>
      <p>
        ${monster.basic.hatchable ? `hatchable` : '-'}
      </p>
    </div>
  </div>

  ${
    monster.basic.ridingActions ?
    ` <div class="riderActions element">
    <span class="elementHeader"> Rider Action </span>
    <ul class="list-style">
      ${monster.basic.ridingActions.map(action => `<li><span class="no-drag">${action}</span></li>`).join("")}
    </ul>
    </div>` 
    : 
    ''
  }`;


  const habitat = document.createElement('div');
  habitat.classList.add('elementWrapper', 'habitat');
  habitat.setAttribute('data-wrapper', 'habitat');

  habitat.innerHTML = `
    <div class="header">
      <span>Habitat / Retreat</span>
    </div>

    <div class="riderActions element">
      <span class="elementHeader"> Habitat </span>
      <ul class="list-style">
        ${monster.location.locations.map(location => `<li><span class="no-drag">${location}</span></li>`).join("")}
      </ul>
    </div>

    ${
      monster.location.retreat ?
      `<div class="riderActions element">
        <span class="elementHeader"> Retreat </span>
        <p><span class="no-drag">${monster.location.retreat}</span></p>
      </div>` 
      : 
      ''
    }`;


  let attackPattrn;
  if (monster.attackPattrn) {
    attackPattrn = document.createElement('div');
    attackPattrn.classList.add('elementWrapper', 'attackPttrn');
    attackPattrn.setAttribute('data-wrapper', 'attackPttrn');

    attackPattrn.innerHTML = `
        <div class="header">
          <span>Attack pattern</span>
        </div>

        ${monster.attackPattrn.map(pttrn => `
        <div class="attackPattrn_element element">
          ${pttrn[0]}
          <img class="icon" src="../images/attackTypes/${pttrn[1]}.svg" alt="" />
        </div>`).join("")}
      `;
  }

  let parts;
  if (monster.parts) {
    parts = document.createElement('div');
    parts.classList.add('elementWrapper', 'parts');
    parts.setAttribute('data-wrapper', 'parts');

    parts.innerHTML = `
      <div class="header">
        <span>Parts</span>
      </div>

      <div class="parts_inner">
        ${monster.parts.map(part => `
        <div class="attackPattrn_element partElement">
          <img class="icon part" src="../images/part/part${part.id}.png" alt="" />
          <img class="icon" src="../images/weaponTypes/${part.tactic}.png" alt="" />
        </div>`).join("")}

      </div>`;
  }



  const wildStats = document.createElement('div');
  wildStats.classList.add('elementWrapper', 'wildStats');
  wildStats.setAttribute('data-wrapper', 'wildStats');

  wildStats.innerHTML = `
  <div class="header">
    <span>Wild stats</span>
  </div>

  <p class="smallBold">Low Rank</p>

  <div class="table stats smallStats element">
    <div>
      <p>HP</p>
      <p>speed</p>
    </div>

    <div>
      <p>${monster.wildStats.low.lp}</p>
      <p>${monster.wildStats.low.speed}</p>
    </div>
  </div>

  <div class="table stats element">
    <div>
      <p>Attack</p>
      <p>Defense</p>
    </div>

    <div>
      <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
      <p>${monster.wildStats.low.attack[0]}</p>
      <p>${monster.wildStats.low.defense[0]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Fire.svg" alt="Fire" />
      <p>${monster.wildStats.low.attack[1]}</p>
      <p>${monster.wildStats.low.defense[1]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Water.svg" alt="Water" />
      <p>${monster.wildStats.low.attack[2]}</p>
      <p>${monster.wildStats.low.defense[2]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
      <p>${monster.wildStats.low.attack[3]}</p>
      <p>${monster.wildStats.low.defense[3]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Ice.svg" alt="Ice" />
      <p>${monster.wildStats.low.attack[4]}</p>

      <p>${monster.wildStats.low.defense[4]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
      <p>${monster.wildStats.low.attack[5]}</p>

      <p>${monster.wildStats.low.defense[5]}</p>
    </div>
  </div>

  <p class="smallBold">High Rank</p>

  <div class="table stats smallStats element">
    <div>
      <p>HP</p>
      <p>speed</p>
    </div>

    <div>
      <p>${monster.wildStats.high.lp}</p>
      <p>${monster.wildStats.high.speed}</p>
    </div>
  </div>
  <div class="table stats element">
    <div>
      <p>Attack</p>
      <p>Defense</p>
    </div>

    <div>
      <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
      <p>${monster.wildStats.high.attack[0]}</p>
      <p>${monster.wildStats.high.defense[0]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Fire.svg" alt="Fire" />
      <p>${monster.wildStats.high.attack[1]}</p>
      <p>${monster.wildStats.high.defense[1]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Water.svg" alt="Water" />
      <p>${monster.wildStats.high.attack[2]}</p>
      <p>${monster.wildStats.high.defense[2]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
      <p>${monster.wildStats.high.attack[3]}</p>
      <p>${monster.wildStats.high.defense[3]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Ice.svg" alt="Ice" />
      <p>${monster.wildStats.high.attack[4]}</p>

      <p>${monster.wildStats.high.defense[4]}</p>
    </div>

    <div>
      <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
      <p>${monster.wildStats.high.attack[5]}</p>

      <p>${monster.wildStats.high.defense[5]}</p>
    </div>
  </div>
  `;

  let monstieStats;

  if (monster.monstieStats) {
    monstieStats = document.createElement('div');
    monstieStats.classList.add('elementWrapper', 'monstieStats');
    monstieStats.setAttribute('data-wrapper', 'monstieStats');

    monstieStats.innerHTML = `
    <div class="header">
      <span>Monstie stats</span>
    </div>

    <div class="table stats smallStats smallStats_first element">
      <div>
        <p>Speed</p>
        <p>Crit.</p>
      </div>

      <div>
        <p>${monster.monstieStats.speed}</p>
        <p>${monster.monstieStats.crit}</p>
      </div>
    </div>

    <p class="smallBold">Level 1</p>

    <div class="table stats smallStats element">
      <div>
        <p>HP</p>
        <p>Recov.</p>
      </div>

      <div>
        <p>${monster.monstieStats.level1.lp}</p>
        <p>${monster.monstieStats.level1.Recovery}</p>
      </div>
    </div>

    <div class="table stats element">
      <div>
        <p>Attack</p>
        <p>Defense</p>
      </div>

      <div>
        <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
        <p>${monster.monstieStats.level1.attack[0]}</p>
        <p>${monster.monstieStats.level1.defense[0]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Fire.svg" alt="Fire" />
        <p>${monster.monstieStats.level1.attack[1]}</p>
        <p>${monster.monstieStats.level1.defense[1]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Water.svg" alt="Water" />
        <p>${monster.monstieStats.level1.attack[2]}</p>
        <p>${monster.monstieStats.level1.defense[2]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
        <p>${monster.monstieStats.level1.attack[3]}</p>
        <p>${monster.monstieStats.level1.defense[3]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Ice.svg" alt="Ice" />
        <p>${monster.monstieStats.level1.attack[4]}</p>

        <p>${monster.monstieStats.level1.defense[4]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
        <p>${monster.monstieStats.level1.attack[5]}</p>

        <p>${monster.monstieStats.level1.defense[5]}</p>
      </div>
    </div>

    <p class="smallBold">Level 20</p>

    <div class="table stats smallStats element">
      <div>
        <p>HP</p>
        <p>Recov.</p>
      </div>

      <div>
        <p>${monster.monstieStats.level20.lp}</p>
        <p>${monster.monstieStats.level20.Recovery}</p>
      </div>
    </div>

    <div class="table stats element">
      <div>
        <p>Attack</p>
        <p>Defense</p>
      </div>

      <div>
        <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
        <p>${monster.monstieStats.level20.attack[0]}</p>
        <p>${monster.monstieStats.level20.defense[0]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Fire.svg" alt="Fire" />
        <p>${monster.monstieStats.level20.attack[1]}</p>
        <p>${monster.monstieStats.level20.defense[1]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Water.svg" alt="Water" />
        <p>${monster.monstieStats.level20.attack[2]}</p>
        <p>${monster.monstieStats.level20.defense[2]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
        <p>${monster.monstieStats.level20.attack[3]}</p>
        <p>${monster.monstieStats.level20.defense[3]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Ice.svg" alt="Ice" />
        <p>${monster.monstieStats.level20.attack[4]}</p>

        <p>${monster.monstieStats.level20.defense[4]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
        <p>${monster.monstieStats.level20.attack[5]}</p>

        <p>${monster.monstieStats.level20.defense[5]}</p>
      </div>
    </div>

    <p class="smallBold">Level 50</p>

    <div class="table stats smallStats element">
      <div>
        <p>HP</p>
        <p>Recov.</p>
      </div>

      <div>
        <p>${monster.monstieStats.level50.lp}</p>
        <p>${monster.monstieStats.level50.Recovery}</p>
      </div>
    </div>

    <div class="table stats element">
      <div>
        <p>Attack</p>
        <p>Defense</p>
      </div>

      <div>
        <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
        <p>${monster.monstieStats.level50.attack[0]}</p>
        <p>${monster.monstieStats.level50.defense[0]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Fire.svg" alt="Fire" />
        <p>${monster.monstieStats.level50.attack[1]}</p>
        <p>${monster.monstieStats.level50.defense[1]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Water.svg" alt="Water" />
        <p>${monster.monstieStats.level50.attack[2]}</p>
        <p>${monster.monstieStats.level50.defense[2]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
        <p>${monster.monstieStats.level50.attack[3]}</p>
        <p>${monster.monstieStats.level50.defense[3]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Ice.svg" alt="Ice" />
        <p>${monster.monstieStats.level50.attack[4]}</p>

        <p>${monster.monstieStats.level50.defense[4]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
        <p>${monster.monstieStats.level50.attack[5]}</p>

        <p>${monster.monstieStats.level50.defense[5]}</p>
      </div>
    </div>

    <p class="smallBold">Level 99</p>

    <div class="table stats smallStats element">
      <div>
        <p>HP</p>
        <p>Recov.</p>
      </div>

      <div>
        <p>${monster.monstieStats.level99.lp}</p>
        <p>${monster.monstieStats.level99.Recovery}</p>
      </div>
    </div>

    <div class="table stats element">
      <div>
        <p>Attack</p>
        <p>Defense</p>
      </div>

      <div>
        <img src="../images/elements/small/Non-Elem.svg" alt="Non-element" />
        <p>${monster.monstieStats.level99.attack[0]}</p>
        <p>${monster.monstieStats.level99.defense[0]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Fire.svg" alt="Fire" />
        <p>${monster.monstieStats.level99.attack[1]}</p>
        <p>${monster.monstieStats.level99.defense[1]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Water.svg" alt="Water" />
        <p>${monster.monstieStats.level99.attack[2]}</p>
        <p>${monster.monstieStats.level99.defense[2]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Thunder.svg" alt="Thunder" />
        <p>${monster.monstieStats.level99.attack[3]}</p>
        <p>${monster.monstieStats.level99.defense[3]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Ice.svg" alt="Ice" />
        <p>${monster.monstieStats.level99.attack[4]}</p>

        <p>${monster.monstieStats.level99.defense[4]}</p>
      </div>

      <div>
        <img src="../images/elements/small/Dragon.svg" alt="Dragon" />
        <p>${monster.monstieStats.level99.attack[5]}</p>

        <p>${monster.monstieStats.level99.defense[5]}</p>
      </div>
  `;
  }

  let egg;
  if (monster.monstieStats) {
    egg = document.createElement('div');
    egg.classList.add('elementWrapper', 'eggWrapper');
    egg.setAttribute('data-wrapper', 'eggWrapper');

    egg.innerHTML = `
  <div class="header">
    <span>Egg</span>
  </div>

  <img src="../images/eggs/${monster.name}-egg.png" alt="" />`;
  }




  wrapperInner.append(
    imageWrapper,
    basicInfo,
    habitat,
  );

  if (attackPattrn) wrapperInner.append(attackPattrn);
  if (parts) wrapperInner.append(parts);
  wrapperInner.append(wildStats);
  if (monstieStats) wrapperInner.append(monstieStats, egg);


  newLi.append(wrapperInner);

  return newLi;
}