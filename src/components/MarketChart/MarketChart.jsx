import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import config from './config';

function MarketChart({ pricesByDate, volumesByDate }) {
  const canvasRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current, config);
    return () => chartRef.current.destroy();
  }, []);

  useEffect(() => {
    chartRef.current.data.datasets[0].data = pricesByDate;
    chartRef.current.data.datasets[1].data = volumesByDate;
    chartRef.current.update();
  }, [pricesByDate, volumesByDate]);

  return (
    <div>
      <canvas ref={canvasRef} height="100"></canvas>
    </div>
  );
}

export default MarketChart;
