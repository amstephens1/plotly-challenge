
function pullData(id){

    d3.json("data/samples.json").then((data) => {
        console.log(data)

        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(demo => demo.id.toString()=== id)[0];

        var demoInfo = d3.select('#sample-metadata');

        demoInfo.html("");

        Object.entries(result).forEach((key)=>{
            demoInfo.append("h6").text(key[0] + ": " + key[1] + "\n");
        });

    });
}

function buildPlot(id) {

    d3.json("data/samples.json").then((data) => {
        console.log(data)

        var samples = data.samples.filter(s =>s.id.toString() === id)[0];

        console.log(samples);
        
        var sample_values = samples.sample_values.slice(0,10).reverse();

        console.log(sample_values);

        var topOtuIdValue = (samples.otu_ids.slice(0,10)).reverse();

        console.log(topOtuIdValue);
        
        var topOtu = topOtuIdValue.map(d=> "OTU " + d);

        console.log(topOtu);
        
        var labels = samples.otu_labels.slice(0,10);

        console.log(labels);
        
        var trace = {
            x: sample_values,
            y: topOtu,
            text: labels,
            type: "bar",
            orientation: 'h'
        };

        var data = [trace]

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 80,
                r: 50,
                t: 40,
                b: 20
            }
        };

        Plotly.newPlot("bar", data, layout);

        var bubbleTrace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var bubbledata = [bubbleTrace]

        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bubble", bubbledata, layout);

    });
}

function optionChanged(id) {
    pullData(id);
    buildPlot(id);
}

function init() {
    
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        pullData(data.names[0]);
        buildPlot(data.names[0]);
    });
}

init();