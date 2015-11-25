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
                        parameters:     parameters,
                        result:         jStat(callPrices).mean() 
                }
                );
        }