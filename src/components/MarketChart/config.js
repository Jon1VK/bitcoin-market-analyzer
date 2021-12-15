import { Tooltip } from 'chart.js';

// Custom tooltip positioner
Tooltip.positioners.bottom = function (items) {
  const chart = this._chart;
  const pos = Tooltip.positioners.average(items);

  return pos
    ? {
        x: pos.x,
        y: chart.chartArea.bottom,
      }
    : false;
};

// Configuration of the chart, check chart.js docs
const config = {
  data: {
    datasets: [
      {
        label: 'Price',
        type: 'line',
        backgroundColor: 'rgb(242, 169, 0)',
        borderColor: 'rgb(242, 169, 0)',
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
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        hoverBackgroundColor: 'rgb(0, 0, 0, 0.6)',
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
      x: {
        ticks: {
          autoSkipPadding: 12,
          maxRotation: 30,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Price [€ / BTC]',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Volume [€]',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily price and trading volume of Bitcoin',
        color: 'black',
        font: {
          family: '"Ubuntu", sans-serif',
          weight: 'bold',
          size: 18,
        },
      },
      tooltip: {
        position: 'bottom',
        xAlign: 'center',
        yAlign: 'bottom',
        usePointStyle: true,
        caretPadding: 4,
        callbacks: {
          label: (item) => `${item.dataset.label} ${item.formattedValue} €`,
          labelPointStyle: () => ({
            pointStyle: 'circle',
          }),
        },
      },
    },
    elements: {
      point: {
        hoverRadius: '6',
      },
    },
  },
};

export default config;
