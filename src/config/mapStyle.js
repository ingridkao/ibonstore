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
            13.49,0,
            13.5,14
        ]
    },
    paint: {
        "text-color": "#111",
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13.49,
            0,
            13.5,
            1
        ]
    }
}

const colors = ['#cacadd', '#7c9cfe', '#6bebeb', '#87ed87', '#efef9a', '#f7a6a6'];
export const pointStyle = {
    id: 'store-point',
    source: 'stores',
    type: 'circle',
    paint: {
        'circle-color': [
            'case',
            ['<', ["to-number",['get', 'count']], 500],
            colors[2],
            // ['all', ['>=', ["to-number",['get', 'count']], 100], ['<', ["to-number",['get', 'count']], 200]],
            // colors[2],
            colors[3]
            // colors[4]
        ],
        'circle-opacity': [
            "interpolate",
            ["linear"],
            ["zoom"],
            10.49,
            0,
            10.5,
            0.25,
            12,
            0.5
        ],
        'circle-radius': [
            "step",
            ["zoom"],
            0,
            10,
            [
                'case',
                ['<', ["to-number",['get', 'count']], 50],
                15,
                // ["sqrt", ["to-number",['get', 'count']]]
                ["/", ["to-number",['get', 'count']], 15]
            ],
            13,
            [
                'case',
                ['<', ["to-number",['get', 'count']], 50],
                10,
                ["/", ["to-number",['get', 'count']], 10]
            ]
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
