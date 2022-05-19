google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Visitors'],
      ['Dubai', 200],
      ['United States', 300],
      ['India', 400],
      ['America', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {
        width: 250,
        colorAxis: {colors: ['#d7a8e0', '#8e489c']},
          
        datalessRegionColor: '#e9d3ed',
       
      
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }