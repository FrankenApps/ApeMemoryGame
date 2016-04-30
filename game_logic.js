var timeMode = true;

$(document).ready(function() {
  $("#time_mode_settings").slideDown(400);
  timeMode=true;
  $("#time_mode_radio").prop("checked", true)
  console.log("TimeMode: " + timeMode);
  //radios
  $('input[type=radio][name=mode]').change(function() {
    if (this.id == 'time_mode_radio') {
      timeMode=true;
      $("#time_mode_settings").slideDown(400);
    }
    else if (this.id == 'click_mode_radio') {
      timeMode=false;
      $("#time_mode_settings").slideUp(400);
    }
  });

  //buttons
  $("button").on('click', function(){
    if (this.id=="close_button") {

    }
    else if (this.id=="start_game_button") {

    }
  });
});
