
"use strict"



//*************************************************************************************
//Format results for CSV file
function setUpCSV(result){
        //Column headers
        var keys = Object.keys(result[0]);
        
        //Data rows
        var cSVFormat = result
                .reduce(
                        function(a,c){
                                return a.concat( [ Object.values(c) ] );
                                }
                        , [ keys ]
                        );
        
        //append link
        document.getElementById('downloadResults').innerHTML = "Download CSV File"; 
        document.getElementById('downloadResults').href = "data:text/csv;charset=utf-8," + escape(d3.csv.formatRows( cSVFormat )); 
        document.getElementById('downloadResults').style.display = 'block';
        
        }

Object.values = obj => Object.keys(obj).map(key => obj[key]);

//
function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var file = evt.dataTransfer.files[0];

	var reader = new FileReader();
	reader.onload = function (event) {
	        var fileData = event.target.result;	
                setUpCSV(
                        processFile( 
                                d3.csv.parse(fileData)
                                )
                        );
		}
	reader.readAsText(file);
        }

function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }

// Setup the dnd listeners.
var dropZone = document.getElementById('dropFile');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

