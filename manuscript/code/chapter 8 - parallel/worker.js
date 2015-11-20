"use strict";

importScripts('monteCarlo.js');
importScripts('jstat.min.js');

onmessage = function(e) {
        console.log('Message received from main script');
        
        const parameters = e.data[0]
        
        const calls = generate(5000).callOptionForwardPrices( parameters.forwardStrikePrice, parameters.spot, parameters.volatility, parameters.expiry, parameters.interestRate );
        
        const result = jStat( calls ).mean()
        
        console.log('Posting message back to main script');
        postMessage(result);
        }