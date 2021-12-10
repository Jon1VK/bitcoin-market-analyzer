const config = {
  data: {
    datasets: [
      {
        label: 'Price',
        type: 'line',
        backgroundColor: 'rgb(242, 169, 0)',
        borderColor: 'rgb(77, 77, 78)',
        pointRadius: '0',
        segment: {
          borderColor: (ctx) =>
            ctx.p0.parsed.y < ctx.p1.parsed.y
              ? 'rgb(0, 255, 0)'
              : 'rgb(255, 0, 0)',
        },
      },
      {
        label: 'Volume',
        backgroundColor: 'rgb(242, 169, 0, 0.3)',
        hoverBackgroundColor: 'rgb(242, 169, 0)',
        type: 'bar',
        yAxisID: 'y2',
      },
    ],
  },
  options: {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
      },
      y2: {
        type: 'linear',
        position: 'right',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

export default config;
