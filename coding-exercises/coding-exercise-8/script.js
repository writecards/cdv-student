//based on tutorial by Curran Helleher https://www.youtube.com/watch?v=Qw6uAg3EO64&ab_channel=CurranKelleher
// big help from mike bostock's projection transistions example https://bl.ocks.org/mbostock/3711652
// and this example by alex macy which is an updated version of bostock's code https://bl.ocks.org/alexmacy/6700d44240d2b6d3ec9767a5a5854e42

let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight;


let viz = d3.select("#container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","BlanchedAlmond")
    ;
let projections = [
    {name: "Mercator", projection: d3.geoMercator()},
    {name: "Orthographic", projection: d3.geoOrthographic()},
    {name: "Gringorten Quincuncial", projection: d3.geoGringortenQuincuncial()},
    {name: "Wiechel", projection: d3.geoWiechel()},
    {name: "Collignon", projection: d3.geoCollignon()},
    
       ]

projections.forEach(function(o){
    o.projection.rotate([0,0]).center([0,0]);
});

let interval = setInterval(loop, 1500),
        i = 0;
        n = projections.length - 1;

let projection = projections[i].projection;
let pathGenerator = d3.geoPath().projection(projection);

let mapData = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(data => {
        //data is in topojson format, need to use topojson library to convert data to geojson
       let countries = topojson.feature(data, data.objects.countries);
        console.log(data.objects);
        
       // let graphGroup = viz.append("g").attr("class", "graphGroup");

        let paths = viz.selectAll("path").data(countries.features);
        paths.enter().append("path")

            .attr("d", pathGenerator)
            .attr("fill", "none")
            .attr("stroke","black")

            .attr("transform","translate(0,100)")
            ;
    });


    let menu = d3.select("#projection-menu").on("change",change);
    
    menu.selectAll("option").data(projections).enter().append("option")
        .text(function(d){
            return d.name
        })
        

    function loop() {
        var j = Math.floor(Math.random() * n);
        menu.property("selectedIndex", i = j + (j >= i));
        update(projections[i]);
      }

    function change() {
        clearInterval(interval);
        update(options[this.selectedIndex]);
      }

    function update(option){
        viz.selectAll("path").transition()
        .duration(700).ease(d3.easeCubic)
        .attrTween("d", projectionTween(projection, projection = option.projection ))
    }

    //this part is from mike bostock. it has some fancy math(?) symbols that help transition from one projection to the next.
    function projectionTween(projection0, projection1) {
        return function(d) {
            var t = 0;
            var projection = d3.geoProjection(project)
                .scale(1)
                .translate([svgWidth / 2, svgHeight / 3]);
            var path = d3.geoPath(projection);
            function project(λ, φ) {
              λ *= 180 / Math.PI, φ *= 180 / Math.PI;
              var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
              return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
            }
            return function(_) {
              t = _;
              return path(d);
            };
          };
    }