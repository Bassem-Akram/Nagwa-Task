(function() {

  setTimeout(function() {
    document.querySelector('.loading').style.display = 'none';
  }, 3000);

  var dropdownToggle = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggle.forEach(e => e.addEventListener('click', function(e) {
    this.parentNode.classList.toggle('show')
  }));

  document.addEventListener('click', function(event) {
    var isClickInsideElement = document.querySelector('.dropdown-toggle').contains(event.target);
    if (!isClickInsideElement) {
      document.querySelector('.dropdown').classList.remove('show')
    }
  });

})();

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  
  var chart = am4core.create('chart', am4charts.XYChart)
  chart.colors.step = 2;
  
  chart.legend = new am4charts.Legend()
  chart.legend.position = 'top'
  chart.legend.contentAlign = "left";
  chart.legend.paddingBottom = 20
  chart.legend.labels.template.maxWidth = 95
  
  var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  xAxis.dataFields.category = 'date'
  xAxis.renderer.cellStartLocation = 0.1
  xAxis.renderer.cellEndLocation = 0.9
  xAxis.renderer.grid.template.location = 0;
  xAxis.renderer.minGridDistance = 60;
  xAxis.renderer.inversed = true;
  xAxis.renderer.grid.template.disabled = true;
  
  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;
  
  function createSeries(value, name) {
      var series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'date'
      series.name = name,
      series.columns.template.column.cornerRadiusTopLeft = 25,
      series.columns.template.column.cornerRadiusTopRight = 25,
      series.columns.template.column.cornerRadiusBottomLeft = 25,
      series.columns.template.column.cornerRadiusBottomRight = 25,
      series.columns.template.column.strokeWidth = 2;
      series.columns.template.column.strokeOpacity = 1;
      series.columns.template.column.stroke = am4core.color("#ccc");
  
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
  
      return series;
  }

  // Modify chart's colors
  chart.colors.list = [
    am4core.color("#E5F0F7"),
    am4core.color("#E5E5E5")
  ];

  chart.data = [
      {
        date: '19/5',
        adam: 40,
        average: 55
      },
      {
        date: '20/5',
        adam: 30,
        average: 78
      },
      {
        date: '21/5',
        adam: 27,
        average: 40
      },
      {
        date: '22/5',
        adam: 50,
        average: 33
      },{
        date: '23/5',
        adam: 40,
        average: 55
      },
      {
        date: '24/5',
        adam: 30,
        average: 78
      },
      {
        date: '25/5',
        adam: 27,
        average: 40
      },
      {
        date: '26/5',
        adam: 50,
        average: 33
      },{
        date: '27/5',
        adam: 40,
        average: 55
      },
      {
        date: '28/5',
        adam: 30,
        average: 78
      },
      {
        date: '29/5',
        adam: 27,
        average: 40
      },
      {
        date: '30/5',
        adam: 50,
        average: 33
      },{
        date: '31/5',
        adam: 40,
        average: 55
      },
      {
        date: '1/6',
        adam: 30,
        average: 78
      },
      {
        date: '2/6',
        adam: 27,
        average: 40
      },
      {
        date: '3/6',
        adam: 50,
        average: 33
      }
  ]
  
  
  createSeries('adam', 'Adam');
  createSeries('average', 'Average');
  
  function arrangeColumns() {
  
      var series = chart.series.getIndex(0);
  
      var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
          var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
          var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
          var delta = ((x1 - x0) / chart.series.length) * w;
          if (am4core.isNumber(delta)) {
              var middle = chart.series.length / 2;
  
              var newIndex = 0;
              chart.series.each(function(series) {
                  if (!series.isHidden && !series.isHiding) {
                      series.dummyData = newIndex;
                      newIndex++;
                  }
                  else {
                      series.dummyData = chart.series.indexOf(series);
                  }
              })
              var visibleCount = newIndex;
              var newMiddle = visibleCount / 2;
  
              chart.series.each(function(series) {
                  var trueIndex = chart.series.indexOf(series);
                  var newIndex = series.dummyData;
  
                  var dx = (newIndex - trueIndex + middle - newMiddle) * delta
  
                  series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                  series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
              })
          }
      }
  }
  
  }); // end am4core.ready()