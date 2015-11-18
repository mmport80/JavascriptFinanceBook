onmessage = function(e) {
        console.log('Message received from main script');
        var workerResult = e.data[0];
        console.log('Posting message back to main script');
        postMessage(workerResult);
        }