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

  export {randomizeArrayOrder, cloneArray};
