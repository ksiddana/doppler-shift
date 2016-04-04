function updateStarPosition(currentValue, minValue, maxValue) {

  var translateX = transformX(currentValue);
  var position = 'translateX(' + translateX + 'px)';
  
  var size = scale(currentValue, minValue, maxValue);
  var bgColor = updateBackgroundColor(currentValue); 

  $('.star').css({'transform': position + " " + 'scale('+ size +')'});
  $('.star-color').css({'background': bgColor});
}

/*
The function below translates the X co-ordinate using the input as the current Velocity into a function of
Say the given Velocity is 50 km/s
positionX = (50^1.5)/5 = 70px.

The Graph can be seen here by clicking on the link below:
http://www.meta-calculator.com/online/06qeubl1otgk
*/

function transformX(value) {
  var transformedValue = value < 0 ? - (Math.pow(Math.abs(value), 1.5)/5) : Math.pow(value, 1.5)/5;
  return transformedValue;
}

/*
The function below scales the image, as the velocity increases or decreases to show perspective, as though
the image was further away, when it red, although color of the star is not red, its the wavelengths, that are
red. Similarly as the star approaches the observer, the velocity increases, and the wavelength is shorter closer
to the blue spectrum of light.
*/

function scale(currentValue, minValue, maxValue) {
  var scale = Math.abs(currentValue/2 - minValue)/Math.abs(maxValue - minValue);
  return scale;
}


function updateBackgroundColor(value) {
  var scaledColor = value/200;
  var updatedColor = scaledColor < 0 ? 'rgba(255, 0, 0, '+ Math.abs(scaledColor) +')' : 'rgba(0, 0, 255, '+ scaledColor +')';
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
    updateStarPosition(value, minValue, maxValue);
  });

});

