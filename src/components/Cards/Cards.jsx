import { numberWithSpaces } from '../../utils/format';
import * as MarketAnalyzer from '../../utils/marketAnalyzer';
import './Cards.css';

function Cards({ prices, volumes }) {
  const longestBearishTrend = MarketAnalyzer.longestBearishTrend(prices);
  const highestTradingVolume = MarketAnalyzer.highestTradingVolume(volumes);
  const maximumProfit = MarketAnalyzer.maximumProfit(prices);

  const buyingRecommendation = maximumProfit.buyDate
    ? `If bought on ${maximumProfit.buyDate} and sold
      on ${maximumProfit.sellDate}`
    : `Bitcoins should not be bought on the selected date range`;

  return (
    <div className="cards">
      <div className="card">
        <h3 className="card-title">Longest bearish trend</h3>
        <p className="card-focal">{longestBearishTrend.trendLength} days</p>
        <p>
          {longestBearishTrend.startDate} - {longestBearishTrend.endDate}
        </p>
      </div>
      <div className="card">
        <h3 className="card-title">Highest trading volume</h3>
        <p className="card-focal">
          {numberWithSpaces(highestTradingVolume.volume.toFixed(0))} €
        </p>
        <p>{highestTradingVolume.date}</p>
      </div>
      <div className="card">
        <h3 className="card-title">Maximum profit</h3>
        <p className="card-focal">
          {numberWithSpaces(maximumProfit.profit.toFixed(2))} € / BTC
        </p>
        <p>{buyingRecommendation}</p>
      </div>
    </div>
  );
}

export default Cards;
