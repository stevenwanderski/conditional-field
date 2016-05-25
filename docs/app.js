new ConditionalField({
  control: '.select-field',
  visibility: {
   'credit': '.sample--select .credit',
   'check': '.sample--select .check'
  }
});

new ConditionalField({
  control: '.payment-radios',
  visibility: {
   'credit': '.sample--radio .credit',
   'check': '.sample--radio .check'
  }
});

new ConditionalField({
  control: '.payment-checkbox',
  visibility: {
   'off': '.sample--checkbox .credit',
   'on': '.sample--checkbox .check'
  }
});

$(function(){
  $('img.svg').each(function(){
    var $img = $(this);
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
       // Get the SVG tag, ignore the rest
       var $svg = $(data).find('svg');

       // Remove any invalid XML tags as per http://validator.w3.org
       $svg = $svg.removeAttr('xmlns:a');

       // Replace image with new SVG
       $img.replaceWith($svg);
    }, 'xml');
  });

  var navBreakPoint = $('.header').outerHeight();
  $(window).on('scroll', function(){
    if($(this).scrollTop() >= navBreakPoint){
      $('.nav').addClass('sticky');
    }else{
      $('.nav').removeClass('sticky');
    }
  });
});