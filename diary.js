var dayOfWeek = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var monthOfYear = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

// Declare & initialize variables
var calendar = new Date();

var year = calendar.getFullYear();     // Returns year
var month = calendar.getMonth();    // Returns month (0-11)

var calendarContainer = '';    // Used for printing

function makeCalendarHeader() {
  var calendarHeader = '';
  var calendarTitle = '<tr><td colspan="7">'+ year + monthOfYear[month] +'</td></tr>';
  var calendarDaySet = '<tr>';
  for (var i = 0; i < 7; i++){
    calendarDaySet += '<td>' + dayOfWeek[i] +'</td>';
  }
  calendarDaySet += '</tr>';
  calendarHeader += calendarTitle;
  calendarHeader += calendarDaySet;
  return calendarHeader;
}

function makeCalendarContent(item) {
  var result = "";
  if (item != null) {
    var image = "";
    switch (item.emotion) {
      case 1:
        image = '<img src="/static/img/calendar/emotion-2.png">';
        break;
      case 2:
        image = '<img src="/static/img/calendar/emotion-1.png">';
        break;
      case 3:
        image = '<img src="/static/img/calendar/emotion0.png">';
        break;
      case 4:
        image = '<img src="/static/img/calendar/emotion1.png">';
        break;
      case 5:
        image = '<img src="/static/img/calendaremotion2.png">';
        break;
      default:
        image = "";
    }
    result = '<a href="/calendar/emotion/' + item.id + '">' + image + '</a>';
  } else {
    result = '<a href="">Nothing</a>';
    //result = '<a href="/diary/create/' + year + '/' + (month + 1) + '/'+ date +'">Nothing</a>';
  }
  return result;
}

function makeCalendarBody(items) {
  var calendarBody = '';
  var blankDay = '<td></td>'

  calendar.setDate(1);    // Initialize the calendar day at '1'
  var weekOfMonthFirstDay = calendar.getDay(); // Returns month's first day's week (0-6)

  calendarBody += '<tr>'
  //Fill in blank days untill month's first day
  for (var i = 0; i < weekOfMonthFirstDay; i++){
    calendarBody += blankDay; 
  }

  for (var i = 0; i < 31; i++){

    var tempMonth = calendar.getMonth();
    var date = calendar.getDate();
    var week = calendar.getDay();
    if (month !== tempMonth){
      break;
    }
    if (week === 0){
      calendarBody += '</tr><tr>';
    }
    calendarBody += '<td><ul style="list-style:none; margin-bottom: 0px; padding-left: 0px;">';
    calendarBody += '<li style="border-bottom: 1px solid #ddd;">' + date + '</li>';
    var content = 'Nothing';
    items.map(function(item){
      var item = JSON.parse(item);
      var created = item.created_at.split("-");
      if(Number(created[2]) === date){
        content = makeCalendarContent(item);
      }
    });
    if (content === 'Nothing'){
      content = makeCalendarContent(null);
    }
    calendarBody += '<li>' + content + '</li>';
    calendarBody += '</ul></td>';
    calendar.setDate(date + 1);
  }

  for (var i = calendar.getDay(); i < 7; i++){
    if (i !== 0){
      calendarBody += blankDay;
    }else{
      break;
    }
  }
  calendarBody += '</tr>'
  return calendarBody;
}

function makeCalender(items){
  calendarContainer += '<table class="table table-bordered" style="text-align: center">';
  calendarContainer += makeCalendarHeader(); 
  calendarContainer += makeCalendarBody(items);
  calendarContainer += '</table>';
  document.getElementById("calendar").innerHTML = calendarContainer;
}
