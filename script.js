$(document).ready(function(){
    
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

    //this will be where we append the hour slots
    let timeSlot = $('#time-slots');

    //empties the time slots and clear the local event list 
    function clear(){ 
        timeSlot.empty();
        for(key in eventList){
            eventList[key] = '';
            let textBox = makeTimeSlot(key);
            colorTimeSlot(textBox, key);
        }
        clearBtn();
        localStorage.setItem('eventList', JSON.stringify(eventList));
    }

    //sets up the time slots between 9AM and 5PM, adding buttons to save locally as well
    function makeTimeSlot(key){
        let list = $('<li>');
        let eventInput = $('<form>');
        let eventTemp = JSON.stringify(eventList[key]); 
        eventInput.append(`<input [type="text"] class = "event" placeholder = ${eventTemp} id = ${key}>`); 
        let time = $('<span>').text(key);
        
        let localEventList = JSON.parse(localStorage.getItem('eventList'));
        eventInput.attr('placeholder', localEventList.key); 
        let saveBtn = $(`<button data-id = '${key}' class = "save">`).text("Save");
        list.append(time);
        list.append(eventInput);
        list.append(saveBtn);
        
        timeSlot.append(list);
        return $(`#${key}`);
    }
    
    //Colors the event slots based off the current time, red for past, gray for current, green for future
    function colorTimeSlot(textBox, time){
        let m = moment();
        let timeM = moment(time, "hA");
        if(time === m.format("hA")){
            textBox.css("background", "gray");
        }
        else if(m.isAfter(timeM)){
            textBox.css("background", "tomato");
        }
        else{
            textBox.css("background", "palegreen")
        }
    }

    //checks if there is a locally stored object for a saved list of events and if there is, will set the event list to that. If not, it will create a new one, then dynamically create the time slots
    function init(){
        let storedEventList = JSON.parse(localStorage.getItem('eventList'));
        if(storedEventList !== null){
            eventList = storedEventList;
        }
        else{
            localStorage.setItem('eventList', JSON.stringify(eventList));
        }
        for(key in eventList){
            let textBox = makeTimeSlot(key); 
            colorTimeSlot(textBox, key);    
        }
        clearBtn();
        
    }
    
    //adds the clear button
    function clearBtn(){
        let clearBtn = $('<button id = "clear">').text('Clear Events');
        timeSlot.append(clearBtn);
    }
    
    //saves event list locally, or clears function 
    function save(){
        let targetId = $(this).attr('data-id');
        console.log(targetId);
        console.log(eventList[targetId])
        console.log($(`#${targetId}`))
        let eventInfo = $(`#${targetId}`);
        console.log(eventInfo.val());
        eventList[targetId] = eventInfo.val();
        console.log(eventList);
        localStorage.setItem('eventList', JSON.stringify(eventList));
        
    }

    //sets the day to the current day
    $('#day').text(moment().format('dddd MMMM Do'))
    init();

    $('.save').on('click', save);
    $('#clear').on('click', clear);
});