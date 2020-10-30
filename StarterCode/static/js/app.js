// Part I:   Build Plots Menu: 
//==================================
// retrieve Data and build variables 
//------------------------------------
function buildPlots(sample) {
  //Read samples.json
      d3.json("data/samples.json").then (data =>{
          console.log(data)
          var row = data.samples.filter(object => object.id.toString() === sample)[0];
          var otuID = row.otu_ids;
          console.log(otuID)
          var sampleValues =  row.sample_values.slice(0,10).reverse();
          console.log(sampleValues)
          
          var otuLabels =  row.otu_labels.slice(0,10);
          console.log (otuLabels)

          //sortedByGreekSearch
          var reversedData = (row.otu_ids.slice(0, 10)).reverse();
          var OTU_id = reversedData.map(d => "OTU " + d);
          console.log(`OTU IDs: ${OTU_id}`)
          var otuLabels =  row.otu_labels.slice(0,10);
          console.log(`OTU_labels: ${otuLabels}`)
        
                    
          // 2. Plots:
          //===================================================
          // A- Bar-Plot
          //---------------
          var trace = {
              x: sampleValues, 
              y: OTU_id, 
              text: otuLabels, 
              type:"bar", 
              orientation: "h"
            };
       
          var barTrace = [trace];
  
          // create barLayout variable 
          var barLayout = {
              title: "Top 10 Bacterial Cultures",
              yaxis:{
                  tickmode:"linear",
              },
              margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 30
              }
          };
  
      // create the bar plot
      Plotly.newPlot("bar", barTrace, barLayout);

          // B- Bubble-Plot
          //----------------
          // The bubble chart
          var trace1 = {
              x: row.otu_ids,
              y: row.sample_values,
              mode: "markers",
              marker: {
                  size: row.sample_values,
                  color: row.otu_ids
              },
              text:  row.otu_labels
  
          };
  
          // set the layout for the bubble plot
          var bubbleLayout = {
              xaxis:{title: "OTU ID"},
              height: 600,
              width: 1000
          };
  
          // creating data variable 
          var bubbleTrace = [trace1];
  
      // create the bubble plot
      Plotly.newPlot("bubble", bubbleTrace, bubbleLayout); 
      
      });
}  

//================================================================================
// Part II:   DropDown Menu: 
//==================================
// create the function for the initial data rendering
  // create the function for the initial data rendering
function dropDownMenu() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("data/samples.json").then((data)=> {
          console.log(data)
          var sampleName = data.names;
  
          // get the id data to the dropdwown menu
          sampleName.forEach(function(sample) {
              dropdown.append("option").text(sample).property("value", sample);
          });
  
          // call the functions to display the data and the plots to the page
          buildPlots(sampleName[0]);
          buildTable(sampleName[0]);
      });

  }
  function optionChanged(sampleX) {
    buildPlots(sampleX);
    buildTable(sampleX);
  }
dropDownMenu();
//==================================================================================================
// Part III : collect metadata For demgraphic info panel
//===================================================
// create the function to get the necessary data
function buildTable(sample) {
    // read the json file to get data
        d3.json("data/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var row = metadata.filter(object => object.id.toString() === sample)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
         Object.entries(row).forEach(([key, value]) => {
          demographicInfo.append("h5").text(`${key}: ${value}`);
            });
        });
    }
