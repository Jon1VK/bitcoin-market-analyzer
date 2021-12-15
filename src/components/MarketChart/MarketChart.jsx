import './MarketChart.css';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import config from './config';

function MarketChart({ prices, volumes }) {
  // Reference for the canvas html element
  var canvasRef = useRef();
  // Reference for current chart instance
  var chartRef = useRef();

  // On mount init chart instance
  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current, config);
    chartRef.current.options.maintainAspectRatio = false;
    // On unmount destroy current chart instance
    return () => chartRef.current.destroy();
  }, []);

  // Update chart datasets when prices or volumes are updated
  useEffect(() => {
    chartRef.current.data.datasets[0].data = prices;
    chartRef.current.data.datasets[1].data = volumes;
    chartRef.current.update();
  }, [prices, volumes]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default MarketChart;
