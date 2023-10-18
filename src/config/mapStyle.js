export const storeText = {
    id: 'stores-text',
    source: 'stores',
    type: 'symbol',
    layout: {
        "text-field": [
            "to-string",
            ["get", "count"]
        ],
        "text-size":[
            "interpolate",
            ["linear"],
            ["zoom"],
            12.99,0,
            13,14
        ]
    },
    paint: {
        "text-color": "#111",
        "text-opacity": [
            "step",
            ["zoom"],
            0,
            13, [
                'case',
                ['<', ["to-number",['get', 'count']], 500],
                0,
                1
            ],
            14,1
        ]
    }
}

const colors = ['#c8ffc7', '#4dd4ff','#8292ff'];
export const pointStyle = {
    id: 'store-point',
    source: 'stores',
    type: 'circle',
    paint: {
        'circle-color': [
            'case',
            ['<', ["to-number",['get', 'count']], 500],
            colors[0],
            ['<', ["to-number",['get', 'count']], 750],
            colors[1],
            colors[2]
        ],
        'circle-opacity': [
            "interpolate",
            ["linear"],
            ["zoom"],
            12.99, 0.05,
            13, 0.25,
            15, 0.4
        ],
        'circle-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            6, 5,
            // 9.99, 5,
            10, ["sqrt", ["to-number",['get', 'count']]],
            13, ["/", ["to-number",['get', 'count']], 10]
        ]
    }
}

export const storeHeatmap = {
    id: 'store-heatmap',
    source: 'stores',
    type: 'heatmap',
    paint: {
        'heatmap-opacity': [
            "step",
            ["zoom"],
            0.8,
            15,
            0
          ],
        'heatmap-color': [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 255, 0)",
            0.2,
            "hsl(225, 98%, 74%)",
            0.4,
            "hsl(180, 76%, 67%)",
            0.6,
            "hsl(120, 74%, 73%)",
            0.8,
            "hsl(60, 73%, 77%)",
            1,
            "hsl(0, 83%, 81%)"
        ],
        'heatmap-radius': 10,
        'heatmap-weight': 1,
        'heatmap-intensity': [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            7,
            0.05,
            12,
            0.2
        ]
    }
}


