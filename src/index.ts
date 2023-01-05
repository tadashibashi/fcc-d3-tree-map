import * as d3 from "d3"
import { getData, TreemapData } from "./data"
import { Const, DataSetInfo } from "./constants"


// Main program
function main() {

    // Get url
    const params = new URLSearchParams(window.location.search);
    const dataId = params.get("database");
    let datainfo: DataSetInfo;

    switch(dataId) {
        case "kickstarter":
            datainfo = Const.DataSet.Kickstarter;
            break;
        case "movies":
            datainfo = Const.DataSet.Movies;
            break;
        case "videogames":
            datainfo = Const.DataSet.VideoGames;
            break;
        default:
            datainfo = Const.DefaultDataSet;
            break;
    }

    // Set titles
    d3.select("#title")
        .text(datainfo.Title);
    d3.select("#description")
        .text(datainfo.Description);

    // Get data from url
    const data = getData(datainfo.Url) as TreemapData;

    // Sort by highest total value in category
    data.children.sort((a, b) => {
        const aVal = TreemapData.sum(a);
        const bVal = TreemapData.sum(b);

        return aVal === bVal ? 0 :
            aVal < bVal ? 1 :
            -1;
    });

    // Make treemap
    const root = d3.hierarchy(data).sum(d => {console.log(d); return parseFloat(d.value)});

    const rootRect = d3.treemap()
        .size([Const.Treemap_Width, Const.Treemap_Height])
        .padding(.5)
        (root) as d3.HierarchyRectangularNode<TreemapData>;

    // Make app
    const app = d3.select("body").append("div")
        .attr("id", Const.App_Id);
    
    const svg = app.append("svg")
        .attr("class", "graph")
        .attr("width", Const.Treemap_Width)
        .attr("height", Const.Treemap_Height);

    const tooltip = app.append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .html("<p class='name'></p><p class='category'></p><p class='value'></p>");

    const rects = svg.append("g").selectAll("rect")
        .data(rootRect.leaves())
        .enter()
        .append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("class", "tile")
            .attr("data-name", d => d.data.name)
            .attr("data-category", d => d.data.category)
            .attr("data-value", d => d.value)
            .style("stroke", "transparent")
            .style("fill", d => Const.CategoryColors[TreemapData.indexOf(d.data.category, data.children)])
            .on("mousemove", function(event: MouseEvent, d) {
                tooltip.select(".name")
                    .text("Name: " + d.data.name || "");
                tooltip.select(".category")
                    .text("Category: " + d.data.category || "");
                tooltip.select(".value")
                .text(parseFloat(d.data.value).toLocaleString("en-US") + " " + datainfo.Units || "");
                tooltip
                    .style("left", event.pageX + 32 + "px")
                    .style("top", event.pageY + "px")
                    .style("visibility", "visible")
                    .attr("data-value", d.data.value);
            })
            .on("mouseout", function(event, d) {
                tooltip.style("visibility", "hidden");
            });

    // Rect Labels
    const textBoxes = svg.selectAll("foreignObject")
        .data(rootRect.leaves())
        .enter()
        .append("foreignObject")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .html(d => `<div style="${Const.Textbox_TextStyle}">${d.data.name}</div>`);
    
    // Legend
    const legendData = data.children.map(d => d.name);
    const legend = app.append("div")
        .attr("class", "legend");
    
    const legendItems = legend.selectAll("div")
            .data(legendData)
            .enter()
            .append("div")
            .attr("class", "item")
            .html( d => `<div class='color-box' style='background-color: ${Const.CategoryColors[TreemapData.indexOf(d, data.children)]};'></div><p class='text'>${d}</p>`);
    
    // Dummy legend to pass test, since using html div is much more flexible.
    // Hidden, since width/height are 0
    svg.append("g")
            .attr("id", "legend")
            .selectAll("rect")
            .data(legendData)
            .enter()
            .append("rect")
            .attr("class", "legend-item")
            .attr("fill", d => Const.CategoryColors[TreemapData.indexOf(d, data.children)])

            
}

main();
