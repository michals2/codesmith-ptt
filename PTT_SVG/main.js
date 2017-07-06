
/*
file:///Users/Luke/Desktop/ac-d3/PTT/bubble-chart-v1_canvas-ex/index.html
*/

const l = console.log

$(function () {

    let videoID = 0;
    const base = d3.select("#vis")
        .style("margin", "20px")

    const svg = base.append("svg")
        .attr("width", 750)
        .attr("height", 750)
        .style("border", "1px solid #000000");

    // const dataContainer = svg.append("g")
    //     .classed('data', true)

    function drawCustom(data) {

        const scaleX = d3.scaleLinear()
            .range([0, 600])
            .domain([1, 5]);

        const scaleY = d3.scaleLinear()
            .range([0, 600])
            .domain([1, 5]);

        const scaleSquare = d3.scaleLinear()
            .range([50, 150])
            .domain([1, 3]);

        const dataBinding = svg.selectAll("g")
            .data(data, (d) => d);

        dataBinding.enter()   //adding
            .append("foreignObject")
            .classed("bubble", true)
            .attr("x", (d) => scaleX(d.x))
            .attr("y", (d) => scaleY(d.y))
            .attr("width", (d) => scaleSquare(d.sideLength))
            .attr("height", (d) => scaleSquare(d.sideLength));

        const elements = svg.selectAll("foreignObject");

        // loop over each data-node
        elements.each(function (d, i) {

            // l('d --> ', d)

            const node = d3.select(this);
            const x = node.attr("x");
            const y = node.attr("y");
            const width = node.attr("width");
            const height = node.attr("height");
            const src = d.src;
            const fps = 30;
            const id = 'video' + videoID;
            // const videoStore = d3.select('#video-store');
            // l('videoStore -->', videoStore);

            elements.append('xhtml:video')
                .attr('id', id)
                .attr('src', src)
                .attr('loop', '')
                .attr('autoplay', '')
                // .style('display', 'none')
                .attr('top', x)
                .attr('left', y)
                .attr('width', width)
                .attr('height', height)

            videoID += 1;

            var currVid = document.getElementById(id);

            svg.append(currVid)

            // setInterval(() => {
            //     context.drawImage(currVid, x, y, width, height);
            // }, 1000 / fps)
        })
    }


    const srcArr = [
        'http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv',
        'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-85.mp4',
        'https://upload.wikimedia.org/wikipedia/commons/f/f9/STS-132_Liftoff_Space_Shuttle_Atlantis.ogv',
        'https://upload.wikimedia.org/wikipedia/commons/0/04/Play_fight_of_polar_bears_edit_1.ogv',
        'https://upload.wikimedia.org/wikipedia/commons/9/9c/Enallagma_cyathigerum_2.ogv',
    ]

    const RowArr = function (row, sideLength) {
        return [
            { x: 1, y: row, 'sideLength': sideLength, src: srcArr[0] },
            { x: 2, y: row, 'sideLength': sideLength, src: srcArr[1] },
            { x: 3, y: row, 'sideLength': sideLength, src: srcArr[2] },
            { x: 4, y: row, 'sideLength': sideLength, src: srcArr[3] },
            { x: 5, y: row, 'sideLength': sideLength, src: srcArr[4] }
        ]
    }

    function createDataArr(rows, sideLength) {
        const dataArr = [];
        for (let i = 1; i <= rows; i++) {
            dataArr.push(...RowArr(i, sideLength))
        }
        l('dataArr --> ', dataArr)
        return dataArr;
    }

    const rows = 5;               //[1,5]
    const sideLength = 2;         //[1,3]
    const dataArr = createDataArr(rows, sideLength)

    drawCustom(dataArr);


});
