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
            12.9,0,
            13,12
        ]
    },
    paint: {
        "text-color": "#fff",
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10.99,
            0,
            11,
            1,
            16.49,
            1,
            16.5,
            0
        ]
    }
}

export const pointStyle = {
    id: 'store-point',
    source: 'stores',
    type: 'circle',
    paint: {
        'circle-color': [
            "step",
            ["zoom"],
            "hsl(294, 0%, 100%)",
            22,
            "#90c31e"
        ],
        'circle-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            8.9,
            0,
            11,
            2
        ]
    }
}

export const storeHeatmap = {
    id: 'store-heatmap',
    source: 'stores',
    type: 'heatmap',
    paint: {
        'heatmap-opacity': 0.9,
        'heatmap-color': [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 255, 0)",
            0.1,
            "hsl(225, 98%, 74%)",
            0.3,
            "hsl(180, 76%, 67%)",
            0.5,
            "hsl(120, 74%, 73%)",
            0.7,
            "hsl(60, 73%, 77%)",
            1,
            "hsl(0, 83%, 81%)"
        ],
        'heatmap-weight': 1,
        'heatmap-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            [
              "interpolate",
              ["linear"],
              ["get", "count"],
              1,
              1,
              360,
              2
            ],
            11,
            [
              "interpolate",
              ["linear"],
              ["get", "count"],
              1,
              1,
              360,
              40
            ],
            13,
            [
              "interpolate",
              ["linear"],
              ["get", "count"],
              1,
              2,
              360,
              100
            ]
          ]
    }
}
