(function() {
  'use strict';
  var keyInput = document.querySelector('[data-key-input]');
  var saveKeyBTN = document.querySelector('[data-save-key]');
  var savedKeys = [];
  var savedKeysUI = document.querySelector('[data-saved-keys-ui]');
  var compiledKeyBox = document.querySelector('.compiled-key');
  var compileBTN = document.querySelector('[data-comple-btn]');
  var alert = document.querySelector('.alert');

  var hashRegex = /[1-8]{1}-[a-zA-Z0-9]{12}/;

  function alertUser(error,text){
    //error = bool
    if(error){
      alert.className='invalid';
      alert.innerText = text;
    }else{
      alert.className='valid';
      alert.innerText = text;
    }
  }
  saveKeyBTN.addEventListener('click', function() {
    //if there is input
    if (keyInput.value) {
      let str = keyInput.value;
      //remove spaces
      str = str.replace(/\s/g, "");
      //if the length is mached
      if (str.length == 14) {
        //if regex mached
        if(hashRegex.test(str)){
            let exists = false;
          //check if index number already exsits
          for (let i = 0; i < savedKeys.length;i++){
            if(str[0] == savedKeys[i][0]){
              exists = true;
            }
          }

          if(!exists){

            //check if already got 8 hashes
            if(savedKeys.length < 8){
              //push to array
              savedKeys.push(str);
              //sort the arry
              savedKeys.sort();
              //push to saved keys
              let uiString ='<h3>Keys:</h3>';
              for(let i = 0; i< savedKeys.length; i++){
                uiString += "<p>" + savedKeys[i] + "</p>";
              }
              savedKeysUI.innerHTML = uiString;
              //reset keys
              keyInput.value = null;
              //empry alert box
              alert.innerText='';
              alert.className='';
            }else{
              alertUser(true,'already got 8 hashes!');
            }

          }else{
            alertUser(true,'hash index '+str[0]+ ' already exists!');
          }

        }else{
            alertUser(true,'invalid hash!');
        }

      } else {
        //if input not long enough || to short
        alertUser(true,'hash to short / to long!');
      }
    } else {
      //if input empty
      alertUser(true,'no hash found!');
    }
    //check if there are 8 hashes
    if(savedKeys.length == 8){
      compileBTN.disabled = false;
    }
  }
  );

  //press enter to submit
  keyInput.addEventListener('keydown',function(e){

  if(e.keyCode == 13){
    saveKeyBTN.click();
  }
  });


  compileBTN.addEventListener('click',function(){
    if(savedKeys.length == 8){
      let compiledKey ='';
      savedKeys.sort();

      //compile keys
      for(let i = 0; i<savedKeys.length;i++){
        compiledKey += savedKeys[i].substring(2);
      }
      compiledKeyBox.innerHTML = "<h1>compiled Key:</h1>" + compiledKey;
    }
  });
  
}());
