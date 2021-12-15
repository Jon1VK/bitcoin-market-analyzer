import { numberWithSpaces } from '../../utils/format';
import * as MarketAnalyzer from '../../utils/marketAnalyzer';
import './Cards.css';

function Cards({ prices, volumes }) {
  // Calculate stats about current prices and volumes
  var longestBearishTrend = MarketAnalyzer.longestBearishTrend(prices);
  var highestTradingVolume = MarketAnalyzer.highestTradingVolume(volumes);
  var maximumProfit = MarketAnalyzer.maximumProfit(prices);

  // Depending if there is profit to be made, show different text for bying recommendation
  var buyingRecommendation = maximumProfit.buyDate
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
