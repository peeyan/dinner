let $window = $(window);
let $year = $('#js-year');
let $month = $('#js-month');
let $tbody = $('#js-calendar-body');

let today = new Date();
let currentYear = today.getFullYear(),
    currentMonth = today.getMonth();

$window.on('load',function(){
  calendarHeading(currentYear, currentMonth);
  calendarBody(currentYear, currentMonth, today);
});

function calendarBody(year, month, today){
  let todayYMFlag = today.getFullYear() === year && today.getMonth() === month ? true : false;
  let startDate = new Date(year, month, 1);
  let endDate  = new Date(year, month + 1 , 0);
  let startDay = startDate.getDay();
  let endDay = endDate.getDate();
  let textSkip = true;
  let textDate = 1;
  let tableBody ='';

  for (let row = 0; row < 6; row++){
    let tr = '<tr>';

    for (let col = 0; col < 7; col++) {
      if (row === 0 && startDay === col){
        textSkip = false;
      }
      if (textDate > endDay) {
        textSkip = true;
      }
      let addClass = "fullday ";
      if(todayYMFlag && textDate === today.getDate()) {
      addClass=addClass+'is-today ';
      }
      let dayOfWeek=new Date(year, month, textDate).getDay();
      if(dayOfWeek==0 || dayOfWeek==6) {
      addClass=addClass+'is-holiday ';
      }
      let textTd = textSkip ? ' ' : textDate++;
      let td = '<td class="'+addClass+'"><p>'+textTd+'</p></td>';
      tr += td;
    }
    tr += '</tr>';
    tableBody += tr;
  }
  $tbody.html(tableBody);
}

function calendarHeading(year, month){
  $year.text(year);
  $month.text(month + 1);}

$('#calendar_open').on('click',function(){
$('.calendar_modal').css('display','block')
})

$('#calendar_close').on('click',function(){
$('.calendar_modal').css('display','none')
})


$('#drink-help').on('click',function(){
  sendPush('飲み物おなしゃーっす！！');
})

$('#rice-help').on('click',function(){
  sendPush('米おなしゃーっす！！');
})

function sendPush(bodyText) {
    const data = {
      title: '晩飯アプリ',
      body: bodyText,
      url: 'https://peeyan.github.io/dinner/',
      apikey: 'a46bac257dcf4bc0aa077386cb92c9e6',
      icon: 'https://push7.jp/notifycation_icon.p'
    };

    $.ajax({
      url:'https://api.push7.jp/api/v1/28a62230d0a948c2bd8b47a0867e8f88/send',
      type:'POST',
      data: JSON.stringify(data),
      dataType: "json",
      contentType : "application/json"
    }).done( (data) => {
      console.log(data);
    }).fail( (data) => {
      console.log(data);
    })
}
