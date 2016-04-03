function updateStarPosition(currentValue, minValue, maxValue) {
  // console.log(currentValue, minValue, maxValue);
  var translatingX = transformX(currentValue);
  var position = 'translateX(' + translatingX + 'px)';
  
  var size = scale(currentValue, minValue, maxValue);
  var bgColor = updateBackgroundColor(currentValue); 
  // console.log(size);

  $('.star').css({'transform': position + " " + 'scale('+ size +')'});
  $('.star-color').css({'background': bgColor});
  console.log($('.star-color').css('background'));
}


function transformX(value) {
  var transformedValue = value < 0 ? - (Math.pow(Math.abs(value), 1.5)/5) : Math.pow(value, 1.5)/5;
  // console.log("Transform: ",value, transformedValue);
  return transformedValue;
}


function scale(currentValue, minValue, maxValue) {
  var scale;
  if (currentValue >= 0 ) {
    scale = (currentValue/2 - minValue)/(maxValue - minValue);
    // console.log(currentValue, minValue, maxValue, scale);
    return scale;
  } else {
    scale = Math.abs(currentValue/2 - minValue)/Math.abs(maxValue - minValue);
    return scale;
  }
}


function updateBackgroundColor(value) {
  var scaledColor = value/150;
  var updatedColor = scaledColor > 0 ? 'rgba(255, 0, 0, '+ scaledColor +')' : 'rgba(0, 0, 255, '+ Math.abs(scaledColor); +')';
  return updatedColor;
}


$(document).ready(function(){

var currentValue = Number($('.velocity').attr('value') );
var minValue = Number($('.velocity').attr('min') );
var maxValue =  Number($('.velocity').attr('max') );
var stepValue = Number($('.velocity').attr('step') );

  $('.slider').slider({
    value: currentValue,
    min: minValue,
    max: maxValue,
    step: stepValue,
    slide: function(event, ui) {
      $('.velocity').val(ui.value);
    }  
  })

  
  $('.slider').on('slide', function() {
    $('.velocity').val( $('.slider').slider('value') );
    var value = +$('.velocity').val();
    // console.log("1.", value);
    updateStarPosition(value, minValue, maxValue);
  });


});

