"use strict";

var generate = n =>
        n <= 1 ? 
                [1]
                :
                [1].concat(generate(n-1));


Array.prototype.randomNumbers = function(){
        return this.map( 
                _ => Math.random()
                );
        }

Array.prototype.bMPNumbers = function(){
        return this.map( 
                _ => jStat.normal.sample( 0, 1 )
                );
        }
        
Array.prototype.gBMPForwardPrices = function(spot, volatility, expiry, interestRate){
        return this.map(
                _ =>
                        spot * 
                        Math.exp(
                                (interestRate - 0.5 * Math.pow(volatility, 2) ) * 
                                expiry + 
                                volatility * 
                                Math.sqrt(expiry) * 
                                generate(1).bMPNumbers()
                                )
                )
         }

 Array.prototype.callOptionForwardPrices = function(forwardStrikePrice, spot, volatility, expiry, interestRate){
         return this.map(
                 _ => Math.max( generate(1).gBMPForwardPrices(spot, volatility, expiry, interestRate) - forwardStrikePrice, 0 )
                 )
          }