// Wait until the DOM has loaded before querying the document
$(document).ready(function(){
  console.log('The program is starting...');

  $('#mainp').text('This text is animated!');
  $('#mainp').slideUp('slow');


  console.log('...The program has ended.');
});