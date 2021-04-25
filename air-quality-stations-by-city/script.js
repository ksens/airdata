Chart.defaults.global.defaultFontFamily = 'Roboto';
Chart.defaults.global.defaultFontColor = '#333';

function makeChart(cities) {
  // cities is an array of objects where each object is something like:
  // {
  //   "city": "Delhi",
  //   "num_stations": "37"
  // }

  var cityLabels = cities.map(function (d) { return d.city });
  var numStations = cities.map(function (d) { return +d.num_stations });
  var cityColors = cities.map(function (d) { return d.num_stations === '1' ? '#19A0AA' : '#F15F36'; });

  var chart = new Chart('chart', {
    type: 'horizontalBar',
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Number of air quality stations',
              fontSize: 16
            }
          }
        ]
      }
    },
    data: {
      labels: cityLabels,
      datasets: [
        {
          data: numStations,
          backgroundColor: cityColors
        }
      ]
    }
  })
}

// Request data using D3
d3.csv('https://raw.githubusercontent.com/ksens/airdata/main/AQI_all_station2020_12_01T12_00_00Z_aggregate_by_city.csv')
  .then(makeChart);