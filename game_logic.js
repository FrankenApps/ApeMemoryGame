var timeMode = true;
var lang = 'en';
var buttonNumbers = [];
var usedButtonIndexes = [];

$(document).ready(function () {
  $('#time_mode_settings').slideDown(400);
  timeMode = true;
  $('#time_mode_radio').prop('checked', true);
  console.log('TimeMode: ' + timeMode);

  // radios
  $('input[type=radio][name=mode]').change(function () {
    if (this.id === 'time_mode_radio') {
      timeMode = true;
      $('#time_mode_settings').slideDown(400);
    }else if (this.id === 'click_mode_radio') {
      timeMode = false;
      $('#time_mode_settings').slideUp(400);
    }
  })

  // create the game field buttons
  for (var i = 0; i < 40; i++) {
    var r = $('<div style="float: left" id="'+ "buttondiv"+ String(i) +'"><button style="width: 100px; height: 100px; background-color: #000000; color: #ffffff; font-size : 60px; border:none;" id="' + "gameButton" + String(i)+'"></button>' + '</div>');
    $("#playground").append(r);
  }

  //buttons
  $('button').on('click', function (){
    if (this.id === 'close_button') {

    }
    else if (this.id === 'start_game_button') {
      startTheGame();
    }
    else {
        $('#' + String(this.id)).css('background-color', '#000000');
        $('#' + String(this.id)).prop('disabled', 'true');
      }
    })
  })

  function startTheGame() {
    if(timeMode){
      if ($('#fade_in_input').val()<1 || $('fade_out_input').val()<1) {
        showInputErrorWarning();
      }
      else {
        setTimeout(function(){
          generateNumbers();
        }, $('#fade_in_input').val());

      }
    }
    else {

    }
  }

function showInputErrorWarning () {
  if (lang === 'en') {
    window.alert('You have to enter a numeric value in both text fields.');
  }else if (lang === 'de') {
    window.alert('Sie müssen eine Zahl in beide Textfelder eingeben.');
  }
}

function isNumber (evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function generateNumbers () {
  buttonNumbers = [];
  for (var i = 0; i < $('#displayed_numbers_picker').val(); i++) {
    var number = Math.floor((Math.random() * 9)+1);
    if(buttonNumbers.indexOf(number) === -1){
    buttonNumbers[i] = number;
  }
  else {
    i = i-1;
  }
  }
  initializeButtons();
}

function initializeButtons () {
  usedButtonIndexes = [];
  for (var i = 0; i < buttonNumbers.length; i++) {
    var number = Math.floor((Math.random() * 40));
    if(usedButtonIndexes.indexOf(number) === -1){
    usedButtonIndexes[i] = number;
  }
  else {
    i = i-1;
  }
  }
  for (var i = 0; i < buttonNumbers.length; i++) {
    $('#gameButton' + String(usedButtonIndexes[i])).html(buttonNumbers[i]);
  }
  for (var c = 0; c < 40; c++) {
    if (!$('#gameButton' + String(c)).text().trim().length) {
        $('#gameButton' + String(c)).prop('disabled', 'true');
    }
  }
  setTimeout(function(){
    hideDigits();
  }, $('#fade_out_input').val());
}

function hideDigits () {
  for (var i = 0; i < buttonNumbers.length; i++) {
    $('#gameButton' + String(usedButtonIndexes[i])).css('background-color', '#ffffff');
  }
}
