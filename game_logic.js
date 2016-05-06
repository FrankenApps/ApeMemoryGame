var timeMode = true;
var lang = 'en';
var buttonNumbers = [];
var usedButtonIndexes = [];
var isMobile = false;
var clicks = 0;

$(document).ready(function () {
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        isMobile = true;
      }

  if(isMobile){
    //make start button bigger, to better be able to touch it on small screen.
    $('#playground').css('left', '18%');
    $('#playground').css('top', '420px');
    $('#fade_in_input').val('1500');
    $('#fade_in_input').css('margin-left', '3px');
    $('#time_mode_radio').css('margin-top', '8px');
    $('#time_mode_settings').css('margin-bottom', '4px');
    $('#close_button').css('height', '80px');
    $('#close_button').css('width', '140px');
    $('#start_game_button').css('height', '80px');
    $('#start_game_button').css('width', '140px');
    $('#start_game_button').css('font-size', '25px');
    $('#close_button').css('font-size', '25px');

  }

  $('#time_mode_settings').slideDown(400);
  timeMode = true;
  $('#time_mode_radio').prop('checked', true);

  // radios
  $('input[type=radio][name=mode]').change(function () {
    if (this.id === 'time_mode_radio') {
      timeMode = true;
      $('#time_mode_settings').slideDown(400);
    }else if (this.id === 'click_mode_radio') {
      timeMode = false;
      $('#time_mode_settings').slideUp(400);
    }
  });

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
        clicks = clicks + 1;
        if(clicks === 1){
          hideDigits();
        }
        $('#' + String(this.id)).css('background-color', '#000000');
        $('#' + String(this.id)).prop('disabled', 'true');
        checkCorrectOrder($('#' + String(this.id)).html());
      }
    });
  });

  function startTheGame() {
      if ($('#fade_in_input').val()<1 || $('fade_out_input').val()<1) {
        showInputErrorWarning();
      }
      else {
        setTimeout(function(){
          generateNumbers();
        }, $('#fade_in_input').val());

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
  if(timeMode){
    setTimeout(function(){
      hideDigits();
    }, $('#fade_out_input').val());
  }
  else {
    // let the hideDigits function be called from button click.
  }
}

function hideDigits () {
  for (var i = 0; i < buttonNumbers.length; i++) {
    $('#gameButton' + String(usedButtonIndexes[i])).css('background-color', '#ffffff');
  }
}

function checkCorrectOrder (buttonDigit){
  console.log(buttonDigit);
}
