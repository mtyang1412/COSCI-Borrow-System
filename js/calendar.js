    $ (document).ready(function(){
      $ ('.datetimepicker').datepicker({
          timepicker: true,
          language: 'en',
          range: true,
          multipleDates: true,
          multipleDatesSeparator: " - "
        });
      $ ("#add-event").submit(function(){
          alert("Submitted");
          var values = {};
          $.each($('#add-event').serializeArray(), function(i, field) {
              values[field.name] = field.value;
          });
          console.log(
            values
          );
      });
    });
    
    (function () {    
        'use strict';
        // ------------------------------------------------------- //
        // Calendar
        // ------------------------------------------------------ //
        $(function() {
        // page is ready
        $('#calendar').fullCalendar({
          themeSystem: 'bootstrap4',
          businessHours: false,
          defaultView: 'month',
          editable: true,
          header: {
            left: 'title',
            center: 'month,agendaWeek,agendaDay',
            right: 'today prev,next'
          },
          events: [
            {
              title: 'Go Space :)',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
              start: '2019-12-27',
              end: '2019-12-27',
              className: 'fc-bg-default',
              icon : "rocket"
            },
            {
              title: 'Dentist',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
              start: '2019-12-29T11:30:00',
              end: '2019-12-29T012:30:00',
              className: 'fc-bg-blue',
              icon : "medkit",
              allDay: false
            }
          ],
          eventRender: function(event, element) {
            if(event.icon){
              element.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
            }
            },
          dayClick: function() {
            $('#modal-view-event-add').modal();
          },
          eventClick: function(event, jsEvent, view) {
            $('.event-icon').html("<i class='fa fa-"+event.icon+"'></i>");
            $('.event-title').html(event.title);
            $('.event-body').html(event.description);
            $('.eventUrl').attr('href',event.url);
            $('#exampleModalCenter1').modal();
          },
        })
      });
      
    })($);