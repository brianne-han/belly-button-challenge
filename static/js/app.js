const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

// create function for inital data
function init() {

  // d3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // d3 to get names from sample for drop down
  d3.json(url).then((data) => {

    // variable for names
    let names = data.names;

    // add to drop menu
    names.forEach((id) => {

      // console log id values for loop
      console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // first sample
        let sample_one = names[0];

        // console log first sample
        console.log(sample_one);

        // build plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);

      });
    };



// bar chart

// function to build bar chart
function buildBarChart(sample) {

  // d3 to retrieve data
  d3.json(url).then((data) => {

    // retrieve sample data
    let sampleInfo = data.samples;

    // filter samples
    let value = sampleInfo.filter(result => result.id == sample);

    // first index from array
    let valueData = value[0];

    // otu_ids, lables, and sample values
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;

    // console log data
    console.log(otu_ids,otu_labels,sample_values);

    // display top ten in descending order
    let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let xticks = sample_values.slice(0,10).reverse();
    let labels = otu_labels.slice(0,10).reverse();

    // set up trace object
    let trace = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h"
  };

  // set up layout
  let layout = {
    title: "Top 10 OTUs"
};

// plotly to build bar chart
Plotly.newPlot("bar", [trace], layout)
    });
};




// bubble chart

// function for bubble chart
function buildBubbleChart(sample) {

  // d3 to retrieve data
  d3.json(url).then((data) => {

    // retrieve data
    let sampleInfo = data.samples;

    // filter samples
    let value = sampleInfo.filter(result => result.id == sample);

    // first index from array
    let valueData = value[0];

    // otu_ids, lables, and sample values
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;

    // console log data
    console.log(otu_ids,otu_labels,sample_values);

    // set up trace
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
  };

  // set up layout
  let layout = {
    title: "Bacteria Per Sample",
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
};

// plotly to build bubble chart
Plotly.newPlot("bubble", [trace1], layout)
    });
};



// metadata chart

// function for metadata info
function buildMetadata(sample) {

  // d3 to retrieve data
  d3.json(url).then((data) => {

    // retrieve metadata
    let metadata = data.metadata;

    // filter samples
    let value = metadata.filter(result => result.id == sample);

    // console log metadata values
    console.log(value)

    // first index from array
    let valueData = value[0];

    // clear out the metadata
    d3.select("#sample-metadata").html("");

    // add key/value pair to panel
    Object.entries(valueData).forEach(([key,value]) => {

      // console log key/value pair
      console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};


// function to updated dashboard when sample is changed
function optionChanged(value) { 

  // console log values
  console.log(value); 

  // call functions 
  buildMetadata(value);
  buildBarChart(value);
  buildBubbleChart(value);

};

// call the initial function
init();
  