$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    var availableCharacters = 140 - $(this).val().length;
    var counterCount = $(this).parent().find('.counter').html(availableCharacters);
    // availableCharacters < 0 ? counterCount.css('color', 'red') : counterCount.css('color', '')
    if (availableCharacters < 0) {
      counterCount.css('color', 'red')
    } else {
      counterCount.css('color', '')
    }
  })
});