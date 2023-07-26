//import { randomizeArrayOrder, cloneArray } from "scripts/_utils.js";

function randomizeArrayOrder(array){
    let randomizedArray = [];
    let arrayClone = cloneArray(array);
  
    for (let i = 0; i < array.length; i++) {
      let randomIndex = Math.floor(Math.random()*(arrayClone.length-1));
      randomizedArray[i] = arrayClone[randomIndex];
      arrayClone.splice(randomIndex, 1);
    }
  
    return randomizedArray
  }      
  
  function cloneArray(array) {
    let arrayClone = [];
  
    for (let i=0; i < array.length; i++) {
      arrayClone[i] = array[i];
    };
  
    return arrayClone;
  }







//creates the array in which the teams have to be stored
let partecipants = [];
for (let i = 0; i < 40; i++) {
  partecipants[i]= `Team ${i+1}`;
}

const tournamentDraw = calculateTournamentDraw(partecipants);

renderTournamentDraw(tournamentDraw);




function renderTournamentDraw(tournamentDraw) {
  tournamentDraw.forEach( (val, index) => {
    
    let stageID = '';

    if (index===tournamentDraw.length-1) {
      stageID = ['FINALI'];
    } else {
      stageID = val[0].ID.split(',');
    };

    let stage$match = `
    <section class="stage" id="stage${index}">
      <div class="stage-ID">
        ${stageID[0].toUpperCase()}
      </div>
        `;
    val.forEach((val, index) => {
      stage$match += `
        <div class="match" id="match${index}">
          <div class="match-ID">
            ${val.ID}
          </div>
          <div class="match-result">
            <div class="competitor">
              ${val.first}
            </div>
            <div class="score">
              ${val.firstScore} - ${val.secondScore}
            </div>
            <div class="competitor">
              ${val.second}
            </div>
          </div>
        </div>
      `
    });
    stage$match += '</section>';
    document.getElementById("container").innerHTML += (stage$match);
  });

}


function calculateTournamentDraw (partecipants){  
  //saves the number of partecipants into a variable
  const numberOfPartecipants = partecipants.length;

  //initializes the variable used to count the number of stages of direct elimination required
  let numberOfStages = 0;

  //calculates the number of direct elimination stages needed
  while (numberOfPartecipants >= 2**(numberOfStages+1)) {
    numberOfStages++;
  };

  //calculates how many partecipants eccede from the direct elimination stages
  const numberOfEccedingPartecipansts = numberOfPartecipants - 2**numberOfStages;

  //creates the 2-dimentional array with structure [#stage][#matchID] and initializes 10 stages (so 1024 maximum partecipants)
  let stages$matchID = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  //cuts the unnecessary stage subarrays from the array (basing on the count made by numberOfStages)
  stages$matchID.splice(numberOfStages+1)

  //randomises the order of the partecipants to pick casual matches
  const randomizedPartecipants = randomizeArrayOrder(partecipants);

  //creates a clone of randomizedPartecipants to select the partecipants that have to do a stage more (qualification stage) than the others
  let qualificationsPartecipants = cloneArray(randomizedPartecipants);
  
  //keeps only the number of partecipants needed for the extra stage, which is the double of the partecipants that have to be eliminated, cutting the others out of the array
  qualificationsPartecipants.splice(numberOfEccedingPartecipansts*2);

  //creates the matches and updates the array with the program of the first stage
  stages$matchID[0] = calculateQualificationsRound(qualificationsPartecipants);

  //creates the array that contains the partecipants that automatically pass the qualification stage
  let qualifiedPartecipants = cloneArray(randomizedPartecipants);

  qualifiedPartecipants.splice(0, numberOfEccedingPartecipansts*2)

  stages$matchID[1] = calculateFirstRound(numberOfEccedingPartecipansts, qualifiedPartecipants);

  for (let i=2; i < numberOfStages + 1; i++) {
    let k = 1;
    for(let j=0; j < 2**(numberOfStages-i); j++) {

      stages$matchID[i][j] = {
        ID: '',
        first: '',
        firstScore: 0,
        second: '',
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };

      if (numberOfStages-i > 3){
        stages$matchID[i][j].ID = `${i}° turno di eliminazione, #${j+1}`;
        stages$matchID[i][j].first = `Vincitore ${i-1}° eliminatorio, #${2*j+1}`;
        stages$matchID[i][j].second = `Vincitore ${i-1}° eliminatorio, #${2*j+2}`;
      } else if (numberOfStages-i === 3) {
        stages$matchID[i][j].ID = `Ottavi di finale, #${j+1}`;
        stages$matchID[i][j].first = `vincitore ${numberOfStages-4}° eliminatorio, #${2*j+1}`;
        stages$matchID[i][j].second = `vincitore ${numberOfStages-4}° eliminatorio, #${2*j+2}`;
      } else if (numberOfStages-i === 2) {
        stages$matchID[i][j].ID = `Quarti di finale, #${j+1}`;
        stages$matchID[i][j].first = `Vincitore Ottavi, #${2*j+1}`;
        stages$matchID[i][j].second = `Vincitore Ottavi, #${2*j+2}`;
      } else if (numberOfStages-i === 1) {
        stages$matchID[i][j].ID = `Semifinale, ${j+1}`;
        stages$matchID[i][j].first = `Vincitore Quarti, #${2*j+1}`;
        stages$matchID[i][j].second = `Vincitore Quarti, #${2*j+2}`;
      } else if (k === 1) {
        stages$matchID[i][k] = {
          ID: `Finale 1° / 2°`,
          first: `Vincitore Semifinale, ${2*j+1}`,
          firstScore: 0,
          second: `Vincitore Semifinale, ${2*j+2}`,
          secondScore: 0,
          winner: undefined,
          loser: undefined
        };
        k--;
        j--;
      } else {
        stages$matchID[i][j].ID = 'Finale 3° / 4°';
        stages$matchID[i][j].first = `Semifinalista ${2*j+1}`;
        stages$matchID[i][j].second = `Semifinalista ${2*j+2}`;
      };
    };
  }
  
  console.log(stages$matchID);

  return stages$matchID;
}

function calculateFirstRound(numberOfEccedingPartecipants, qualifiedPartecipants) {
  let firstRound = [];
  const numberOfQualifiedPartecipants = qualifiedPartecipants.length;

  const numberOfStages = Math.log(numberOfEccedingPartecipants+numberOfQualifiedPartecipants)/Math.log(2);

  if(numberOfEccedingPartecipants <= 2**(numberOfStages-1)){
    for (let i = 0; i < numberOfEccedingPartecipants; i++) {
      let ID = '';  
      if (numberOfStages === 3) {
        ID = `Quarti di Finale, #${i+1}`
      } else if (numberOfStages === 4) {
        ID = `Ottavi di Finale, #${i+1}`
      } else {
        ID = `1° turno di eliminazione, #${i+1}`
      };

      firstRound[i] = {
        ID,
        first: `Vincitore Qual. #${i+1}`,
        firstScore: 0,
        second: qualifiedPartecipants[i],
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };
    };

    for (let i = numberOfEccedingPartecipants; i < (numberOfQualifiedPartecipants + numberOfEccedingPartecipants)/2; i++){
      let ID = '';  
      if (numberOfStages === 3) {
        ID = `Quarti di Finale, ${i+1}`
      } else if (numberOfStages === 4) {
        ID = `Ottavi di Finale, ${i+1}`
      } else {
        ID = `1° turno di eliminazione, ${i+1}`
      };
      firstRound[i] = {
        ID,
        first: qualifiedPartecipants[2*i-numberOfEccedingPartecipants],
        firstScore: 0,
        second: qualifiedPartecipants[2*i-numberOfEccedingPartecipants+1],
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };
    };
  } else {
    for (let i = 0; i < numberOfQualifiedPartecipants; i++) {
      let ID = '';  
      if (numberOfStages === 3) {
        ID = `Quarti di Finale, ${i+1}`
      } else if (numberOfStages === 4) {
        ID = `Ottavi di Finale, ${i+1}`
      } else {
        ID = `1° turno di eliminazione, ${i+1}`
      };

      firstRound[i] = {
        ID,
        first: `Vincitore Qualificazioni ${i+1}`,
        firstScore: 0,
        second: qualifiedPartecipants[i],
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };
    };

    for (let i = numberOfQualifiedPartecipants; i < (numberOfQualifiedPartecipants + numberOfEccedingPartecipants)/2; i++){
      let ID = '';  
      if (numberOfStages === 3) {
        ID = `Quarti di Finale, ${i+1}`
      } else if (numberOfStages === 4) {
        ID = `Ottavi di Finale, ${i+1}`
      } else {
        ID = `1° turno di eliminazione, ${i+1}`
      };

      firstRound[i] = {
        ID,
        first: `Vincitore Qualificazioni ${2*i-numberOfQualifiedPartecipants+1}`,
        firstScore: 0,
        second: `Vincitore Qualificazioni ${2*i-numberOfQualifiedPartecipants+2}`,
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };
    };
  }
  
  return firstRound
}

function calculateQualificationsRound(array) {
  let dividedArray = [];

  if (array.length % 2 === 0) {
    for (let i = 0; i < array.length/2; i++) {
      dividedArray[i] = {
        ID: `Qualificazioni, ${i+1}`,
        first: array[2*i],
        firstScore: 0,
        second: array[2*i+1],
        secondScore: 0,
        winner: undefined,
        loser: undefined
      };
    };
  } else {
    console.log(`calculateQualificationsRound function returns Error: array with odd length passed as an argument. Only arrays with even length allowed.`)
  };

  return dividedArray;
}
