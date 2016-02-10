'use strict';

function processFile(rows) {

        //open
        return rows.map(function (row) {
                return { openPrice: row['Open'] };
        });

        /*
        //high - low
         return rows
                .map(
                        row =>
                                ( {Range: row['High'] - row['Low']} )
                        );
        */

        //high - low with index
        /*
        return rows
                .map(
                        (row, index) =>
                                ( {Index: index, Range: row['High'] - row['Low']} )
                        );
        */

        //high - low with index count down
        /*
        return rows
                .map(
                        (row, index, array) =>
                                ( {Index: array.length-index, Range: row['High'] - row['Low']} )
                        );
        */
}