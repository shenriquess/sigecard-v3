/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {
  'use strict';
  // The Calender
  $( "#calendar" ).datepicker({
    format: "dd/mm/yyyy",
    language: "pt-BR"
  });
  
  $("#calendar").datepicker("setDate", new Date());
  $('#calendar').datepicker({
          "setDate": new Date(),
          "autoclose": true
  });


});
