$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('#DatosT').change(function() {
        // console.log("hola")
        $('.borrar').tooltip()
      })
})
$(function () {
    $('.borrar').tooltip()
})

// $(document).on('focus','.table', function() {
//     console.log(this);
//     $(this).tooltip()
// })

// $('.table').mouseleave(function (e) { 
//     console.log('hili');
    
//  })
// //  $('#DatosT').change()
$(document).ready(function() {
    $('.borrar').tooltip()
})