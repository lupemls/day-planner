$(document).ready(function(){


    //function for adding the time slots with input form and save button to the page
    function makeTimeSlot(num){
        let timeSlot = $('#time-slots');
        let list = $('<li></li>');
        let eventInput = $('<form></form>');
        eventInput.append('<input type = "text">').attr('id', num);
        console.log(eventInput.attr('id'));

        let saveBtn = $('<button></button>').text('Save');
        list.text(num);
        list.append(eventInput);
        list.append(saveBtn);
        
        timeSlot.append(list);

    }
    //save function 

    let eventList = {
        '9AM':'',
        '10AM':'',
        '11AM':'',
        '12PM':'',
        '1PM':'',
        '2PM':'',
        '3PM':'',
        '4PM':'',
        '5PM':''
    }

    $('#day').text(moment().format('dddd MMMM Do'))
    for(key in eventList){
    // for(let i = 0; i <= 8; i++){
        makeTimeSlot(key);
    }

    $('button').on('click', function(){
        console.log('Little bit of this');
    })
});