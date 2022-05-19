var speedCanvas = document.getElementById("speedChart");

// Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 14;

var dataFirst = {
    label: "Car A - Speed (mph)",
    data: [0, 55, 75, 20, 20, 55, 40],
    lineTension: 0.4,
    borderWidth:2,
    pointRadius: 0,
    fill: false,
    borderColor: '#79D2DE'
    
  };

var dataSecond = {
    label: "Car B - Speed (mph)",
    data: [10, 15, 60, 60, 65, 30, 70],
    lineTension: 0.4,
    borderWidth: 2,
    fill: false,
    pointRadius: 0,
    borderColor: '#00204A'
  };

var speedData = {
  labels: ["15 April", "", "", "", "", "", "30 April"],
 
  datasets: [dataFirst, dataSecond],
  
};



var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  
  options:{

    layout: {
      padding: 5,
  },
    tooltips: {enabled: false},
    hover: {mode: null},
    legend:{display:''},
    scales: {
        xAxes: [{
            gridLines: {
                display:false,
                drawBorder: false,
                
                tickMarkLength: 30,
                
            },

            ticks: {
             
              maxRotation: 0,
              minRotation: 0
          }
          
        
        }],
        yAxes: [{
            gridLines: {
                display:false,
                drawBorder: false,
                tickMarkLength: 30,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 40, //<-- set this
              
           },
           
            angleLines: {
              display: false
            }   
        }]
    }
  }
  
});
// line chart end





	
	

	// doughnut chart start 1

	var canvas = document.getElementById("canvas");
var tooltipcanvas = document.getElementById("tooltip-canvas");

var gradientBlue = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientBlue.addColorStop(0, '#5555FF');
gradientBlue.addColorStop(1, '#9787FF');

var gradientRed = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientRed.addColorStop(0, '#FF55B8');
gradientRed.addColorStop(1, '#FF8787');

var gradientGrey = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientGrey.addColorStop(0, '#888888');
gradientGrey.addColorStop(1, '#AAAAAA');

window.arcSpacing = 0.15;
window.segmentHovered = false;

function textInCenter(value, label) {
  var ctx = tooltipcanvas.getContext('2d');
  ctx.clearRect(0, 0, tooltipcanvas.width, tooltipcanvas.height)
  
	ctx.restore();
    
  // Draw value
  ctx.fillStyle = '#333333';
  ctx.font = '24px sans-serif';
  ctx.textBaseline = 'middle';

  // Define text position
  var textPosition = {
    x: Math.round((tooltipcanvas.width - ctx.measureText(value).width) / 2),
    y: tooltipcanvas.height / 2,
  };

  ctx.fillText(value, textPosition.x, textPosition.y);

  // Draw label
  ctx.fillStyle = '#AAAAAA';
  ctx.font = '8px sans-serif';

  // Define text position
  var labelTextPosition = {
    x: Math.round((tooltipcanvas.width - ctx.measureText(label).width) / 2),
    y: tooltipcanvas.height / 2,
  };

  ctx.fillText(label, labelTextPosition.x, labelTextPosition.y - 20);
  ctx.save();
}

Chart.elements.Arc.prototype.draw = function() {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var sA = vm.startAngle;
  var eA = vm.endAngle;

  ctx.beginPath();
  ctx.arc(vm.x, vm.y, vm.outerRadius, sA + window.arcSpacing, eA - window.arcSpacing);
  ctx.strokeStyle = vm.backgroundColor;
  ctx.lineWidth = vm.borderWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
};

var config = {
    type: 'doughnut',
    data: {
        labels: ['Pink', 'grey', 'Blue'],
        datasets: [
          {
              data: [700, 340, 150],
              backgroundColor: [
				'#00204A',
                '#79D2DE',
                '#EC6666',
              ],
          }
        ]
    },
    options: {
    		cutoutPercentage: 80,
    		elements: {
        	arc: {
          	borderWidth: 12,
          },
        },
        legend: {
        	display: false,
        },
        animation: {
        	onComplete: function(animation) {
          	if (!window.segmentHovered) {
              var value = this.config.data.datasets[0].data.reduce(function(a, b) { 
                return a + b;
              }, 0);
              var label = 'T O T A L';

              textInCenter(value, label);
            }
          },
        },
        tooltips: {
        	enabled: false,
        	custom: function(tooltip) {
          	if (tooltip.body) {
              var line = tooltip.body[0].lines[0],
              	parts = line.split(': ');
              textInCenter(parts[1], parts[0].split('').join(' ').toUpperCase());
              window.segmentHovered = true;
            } else {
            	window.segmentHovered = false;
            }
          },
        },
    },
};

window.chart = new Chart(canvas, config);

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

document.getElementById('reload').addEventListener('click', function() {
	addData(window.chart, 'TEST', 300);
});



