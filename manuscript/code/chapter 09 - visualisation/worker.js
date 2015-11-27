"use strict";

importScripts('monteCarlo.js');
importScripts('jstat.min.js');

onmessage = function(e) {
        const parameters = e.data[0];
        
        const callPrices = generate(5000)
                .callOptionForwardPrices( 
                        parameters.forwardStrikePrice, 
                        parameters.spot, 
                        parameters.volatility, 
                        parameters.expiry, 
                        parameters.interestRate 
                        );
        
        postMessage(
                {
                        forwardStrikePrice:     parameters.forwardStrikePrice, 
                        spot:                   parameters.spot, 
                        volatility:             parameters.volatility, 
                        expiry:                 parameters.expiry, 
                        interestRate:           parameters.interestRate,
                        result:                 jStat(callPrices).mean() 
                }
                );
        }