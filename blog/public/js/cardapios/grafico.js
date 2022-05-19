$('#modalExpandirGrafico').on('shown.bs.modal', function (event) {

  $('#barChart2').remove();
  var string = '<canvas id="barChart2" style="height:230px"></canvas>'
  $('#div_chart2').append(string);
  var areaChartData = {
    labels  : ['Calorias', 'Carb.', 'Proteínas', 'Lipídios', 'Fibras', 'Vit. A', 'Vit. C',
               'Vit. D', 'Vit. E', 'Vit. B1', 'Vit. B2', 'Vit. B6', 'Vit. B12',
               'Niacina', 'Ác. Fólico', 'Ác. Pant.', 'Cálcio', 'Ferro', 'Magnésio', 'Potássio',
               'Selênio', 'Fósforo', 'Iodo', 'Cobre', 'Zinco', 'Sódio', 'G. Total', 'Colesterol',
               'G. Sat', 'G. Poli', 'G. Mono'],
    datasets: [
      {
        label               : 'Valor da Referência',
        fillColor           : 'rgba(60,141,188,0.9)',
        strokeColor         : 'rgba(60,141,188,0.8)',
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [referencia_modalidade.calorias, referencia_modalidade.carboidratos, referencia_modalidade.proteinas, referencia_modalidade.lipidios,
                               referencia_modalidade.fibras, referencia_modalidade.vitamina_a, referencia_modalidade.vitamina_c, referencia_modalidade.vitamina_d,
                               referencia_modalidade.vitamina_e, referencia_modalidade.vitamina_b1, referencia_modalidade.vitamina_b2, referencia_modalidade.vitamina_b6,
                               referencia_modalidade.vitamina_b12, referencia_modalidade.niacina, referencia_modalidade.folico, referencia_modalidade.pantotenico,
                               referencia_modalidade.calcio, referencia_modalidade.ferro, referencia_modalidade.magnesio, referencia_modalidade.potassio, referencia_modalidade.selenio,
                               referencia_modalidade.fosforo, referencia_modalidade.iodo, referencia_modalidade.cobre, referencia_modalidade.zinco, referencia_modalidade.sodio,
                               referencia_modalidade.gordura_total, referencia_modalidade.colesterol, referencia_modalidade.gordura_saturada,
                               referencia_modalidade.gordura_poliinsaturada, referencia_modalidade.gordura_monoinsaturada]
      },
      {
        label               : 'Valor do Cardápio',
        fillColor           : 'rgba(210, 214, 222, 1)',
        strokeColor         : 'rgba(210, 214, 222, 1)',
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [(energia/numero_dias).toFixed(2), (carboidratos/numero_dias).toFixed(2), (proteinas/numero_dias).toFixed(2), (lipidios/numero_dias).toFixed(2),
                               (fibras/numero_dias).toFixed(2), (vitamina_a/numero_dias).toFixed(2), (vitamina_c/numero_dias).toFixed(2), (vitamina_d/numero_dias).toFixed(2),
                               (vitamina_e/numero_dias).toFixed(2), (vitamina_b1/numero_dias).toFixed(2), (vitamina_b2/numero_dias).toFixed(2), (vitamina_b6/numero_dias).toFixed(2),
                               (vitamina_b12/numero_dias).toFixed(2), (niacina/numero_dias).toFixed(2), (folico/numero_dias).toFixed(2), (pantotenico/numero_dias).toFixed(2),
                               (calcio/numero_dias).toFixed(2), (ferro/numero_dias).toFixed(2), (magnesio/numero_dias).toFixed(2), (potassio/numero_dias).toFixed(2), (selenio/numero_dias).toFixed(2),
                               (fosforo/numero_dias).toFixed(2), (iodo/numero_dias).toFixed(2), (cobre/numero_dias).toFixed(2), (zinco/numero_dias).toFixed(2), (sodio/numero_dias).toFixed(2),
                               (gordura_total/numero_dias).toFixed(2), (colesterol/numero_dias).toFixed(2), (gordura_saturada/numero_dias).toFixed(2),
                               (gordura_poliinsaturada/numero_dias).toFixed(2), (gordura_monoinsaturada/numero_dias).toFixed(2)]
      }
    ]
  }



  //-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas                   = $('#barChart2').get(0).getContext('2d')
  var barChart                         = new Chart(barChartCanvas)
  var barChartData                     = areaChartData
  barChartData.datasets[1].fillColor   = '#00a65a'
  barChartData.datasets[1].strokeColor = '#00a65a'
  barChartData.datasets[1].pointColor  = '#00a65a'
  var barChartOptions                  = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero        : true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines      : true,
    //String - Colour of the grid lines
    scaleGridLineColor      : 'rgba(0,0,0,.05)',
    //Number - Width of the grid lines
    scaleGridLineWidth      : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines  : true,
    //Boolean - If there is a stroke on each bar
    barShowStroke           : true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth          : 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing         : 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing       : 1,
    //String - A legend template
    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    //Boolean - whether to make the chart responsive
    responsive              : true,
    maintainAspectRatio     : true
  }

  barChartOptions.datasetFill = false
  barChart.Bar(barChartData, barChartOptions)



});


function grafico(){
      $('#barChart').remove();
      var string = '<canvas id="barChart" style="height:230px"></canvas>'
      $('#div_chart').append(string);
        /* ChartJS
         * -------
         * Here we will create a few charts using ChartJS
         */
        var areaChartData = {
          labels  : ['Calorias', 'Carb.', 'Proteínas', 'Lipídios', 'Fibras', 'Vit. A', 'Vit. C',
                     'Vit. D', 'Vit. E', 'Vit. B1', 'Vit. B2', 'Vit. B6', 'Vit. B12',
                     'Niacina', 'Ác. Fólico', 'Ác. Pant.', 'Cálcio', 'Ferro', 'Magnésio', 'Potássio',
                     'Selênio', 'Fósforo', 'Iodo', 'Cobre', 'Zinco', 'Sódio', 'G. Total', 'Colesterol',
                     'G. Sat', 'G. Poli', 'G. Mono'],
          datasets: [
            {
              label               : 'Valor da Referência',
              fillColor           : 'rgba(60,141,188,0.9)',
              strokeColor         : 'rgba(60,141,188,0.8)',
              pointColor          : '#3b8bba',
              pointStrokeColor    : 'rgba(60,141,188,1)',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(60,141,188,1)',
              data                : [referencia_modalidade.calorias, referencia_modalidade.carboidratos, referencia_modalidade.proteinas, referencia_modalidade.lipidios,
                                     referencia_modalidade.fibras, referencia_modalidade.vitamina_a, referencia_modalidade.vitamina_c, referencia_modalidade.vitamina_d,
                                     referencia_modalidade.vitamina_e, referencia_modalidade.vitamina_b1, referencia_modalidade.vitamina_b2, referencia_modalidade.vitamina_b6,
                                     referencia_modalidade.vitamina_b12, referencia_modalidade.niacina, referencia_modalidade.folico, referencia_modalidade.pantotenico,
                                     referencia_modalidade.calcio, referencia_modalidade.ferro, referencia_modalidade.magnesio, referencia_modalidade.potassio, referencia_modalidade.selenio,
                                     referencia_modalidade.fosforo, referencia_modalidade.iodo, referencia_modalidade.cobre, referencia_modalidade.zinco, referencia_modalidade.sodio,
                                     referencia_modalidade.gordura_total, referencia_modalidade.colesterol, referencia_modalidade.gordura_saturada,
                                     referencia_modalidade.gordura_poliinsaturada, referencia_modalidade.gordura_monoinsaturada]
            },
            {
              label               : 'Valor do Cardápio',
              fillColor           : 'rgba(210, 214, 222, 1)',
              strokeColor         : 'rgba(210, 214, 222, 1)',
              pointColor          : 'rgba(210, 214, 222, 1)',
              pointStrokeColor    : '#c1c7d1',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data                : [(energia/numero_dias).toFixed(2), (carboidratos/numero_dias).toFixed(2), (proteinas/numero_dias).toFixed(2), (lipidios/numero_dias).toFixed(2),
                                     (fibras/numero_dias).toFixed(2), (vitamina_a/numero_dias).toFixed(2), (vitamina_c/numero_dias).toFixed(2), (vitamina_d/numero_dias).toFixed(2),
                                     (vitamina_e/numero_dias).toFixed(2), (vitamina_b1/numero_dias).toFixed(2), (vitamina_b2/numero_dias).toFixed(2), (vitamina_b6/numero_dias).toFixed(2),
                                     (vitamina_b12/numero_dias).toFixed(2), (niacina/numero_dias).toFixed(2), (folico/numero_dias).toFixed(2), (pantotenico/numero_dias).toFixed(2),
                                     (calcio/numero_dias).toFixed(2), (ferro/numero_dias).toFixed(2), (magnesio/numero_dias).toFixed(2), (potassio/numero_dias).toFixed(2), (selenio/numero_dias).toFixed(2),
                                     (fosforo/numero_dias).toFixed(2), (iodo/numero_dias).toFixed(2), (cobre/numero_dias).toFixed(2), (zinco/numero_dias).toFixed(2), (sodio/numero_dias).toFixed(2),
                                     (gordura_total/numero_dias).toFixed(2), (colesterol/numero_dias).toFixed(2), (gordura_saturada/numero_dias).toFixed(2),
                                     (gordura_poliinsaturada/numero_dias).toFixed(2), (gordura_monoinsaturada/numero_dias).toFixed(2)]
            }
          ]
        }



        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
        var barChart                         = new Chart(barChartCanvas)
        var barChartData                     = areaChartData
        barChartData.datasets[1].fillColor   = '#00a65a'
        barChartData.datasets[1].strokeColor = '#00a65a'
        barChartData.datasets[1].pointColor  = '#00a65a'
        var barChartOptions                  = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero        : true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines      : true,
          //String - Colour of the grid lines
          scaleGridLineColor      : 'rgba(0,0,0,.05)',
          //Number - Width of the grid lines
          scaleGridLineWidth      : 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines  : true,
          //Boolean - If there is a stroke on each bar
          barShowStroke           : true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth          : 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing         : 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing       : 1,
          //String - A legend template
          legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
          //Boolean - whether to make the chart responsive
          responsive              : true,
          maintainAspectRatio     : true
        }

        barChartOptions.datasetFill = false
        barChart.Bar(barChartData, barChartOptions)
}
