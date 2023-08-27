<script setup>
import { onMounted } from 'vue';
import { pointStyle, storeHeatmap, storeText } from '../config/mapStyle.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN

const initZoom = 6.5
// const locations_center = {
//     taiwan: [120.84583930116798, 23.933726250100563],
//     taipei : [121.54446120453025, 25.026707127465713]
// }
const getStoreData = async()=>{
    return fetch('/store_20230801.geojson')
    .then(res=>res.json())
    .then(json=>json)
}
onMounted(async() => {
    const mapbData = await getStoreData()
    
    const map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [120.84583930116798, 23.933726250100563],
        zoom: initZoom,
        minZoom: initZoom,
        maxZoom: 20,
        maxBounds: [
            [116.45861701969, 21.667090266774267], // Southwest coordinates
            [122.2881049503439, 25.48137072436738] // Northeast coordinates
        ]
    });
    map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh-Hant'
    }))
    map.on('load', () => {
        map.addSource('stores', { 
            type: 'geojson', 
            data: mapbData
        }).addLayer(pointStyle).addLayer(storeHeatmap).addLayer(storeText)
    })
    // map.on("click", (event) => {
        // console.log( map.getBounds())
        // console.log( map.getCenter())
        // console.log( map.getBearing())
        // console.log( map.getPitch())
        // console.log( map.getZoom())
        // console.log(JSON.stringify(event.lngLat.wrap()))
    // })
})

</script>

<template>
    <div id="mapbox"></div>
</template>