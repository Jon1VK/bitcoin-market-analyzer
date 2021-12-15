# Bitcoin Market Analyzer

Bitcoin Market Analyzer is a web app that allows it's users to analyze prices
and trading volumes of Bitcoin in the given date range.

App shows some stats calculated from the market data for the selected date
range. In bigger devices there is also a chart in the app to visualize the
change in prices and volumes for the selected date range.

## Live App

<https://jon1vk.github.io/bitcoin-market-analyzer>

## Tools

The app was developed with Create React App for easy set up and deployment.

React frontend library was used to easily create and manage different components
of the app. React also handles state managament of the app and also re-renders
components when app state is updated.

CoinGecko API is used to fetch Bitcoin market data.

Chart.js was used to implement the chart for visualizing the market data.

## Installation

To install the app for local development first run `npm install` and then
`npm start` to start the development server.
