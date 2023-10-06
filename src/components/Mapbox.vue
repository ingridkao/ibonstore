<script setup>
import { ref, onMounted } from 'vue';
import { pointStyle, storeHeatmap, storeText } from '../config/mapStyle.js';
// import MapboxPopup from '@/components/MapboxPopup.vue'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN

const initZoom = 7.033
// const locations_center = {
//     taiwan: [120.84583930116798, 23.933726250100563],
//     taipei : [121.54446120453025, 25.026707127465713]
// }
const getStoreData = async()=>{
    return fetch('/store_20231006.geojson')
    .then(res=>res.json())
    .then(json=>json)
}
// const MapboxPopup = ref(null)
let mapBoxObj = null
onMounted(async() => {
    const mapbData = await getStoreData()
    
    mapBoxObj = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [120.10156754505073,23.663542673161032],
        zoom: initZoom,
        minZoom: initZoom-0.5,
        maxZoom: 20,
        // maxBounds: [
        //     [117.65352289999197, 21.446710798203327], // Southwest coordinates
        //     [122.71793936470891, 26.896122097064662] // Northeast coordinates
        // ]
    });
    mapBoxObj.addControl(new MapboxLanguage({
        defaultLanguage: 'zh-Hant'
    }))
    mapBoxObj.on('load', () => {
        mapBoxObj.addSource('stores', { 
            type: 'geojson', 
            data: mapbData
        }).addLayer(pointStyle).addLayer(storeHeatmap).addLayer(storeText)
    })
    mapBoxObj.on("click", (event) => {
        console.log( mapBoxObj.getBounds())
        // console.log( mapBoxObj.getCenter())
        // console.log( mapBoxObj.getBearing())
        // console.log( mapBoxObj.getPitch())
        console.log( mapBoxObj.getZoom())
        // console.log(JSON.stringify(event.lngLat.wrap()))
    })

    //store-heatmap圖層點擊事件
    //https://stackoverflow.com/questions/74736819/adding-custom-html-inside-mapbox-gl-js-popup-on-click-event
    mapBoxObj.on("click", "store-heatmap", (event) => {
        mapBoxObj.getCanvas().style.cursor = 'pointer'
        const feature = event.features?.at(0);
        const coordinates = (
            feature?.geometry
        )?.coordinates.slice()
        const properties = (
            feature?.properties
        )
        const popup = new mapboxgl.Popup({offset: [0, -15]})
            .setLngLat(coordinates)
            .setHTML(
              `<div class="popupBox">
                <h6>${properties.store_name}</h6>
                <p>商店代號:${properties.store_id}</p>
                <p>商店區域: ${properties.zo_name}</p>
                <p>商店地址: ${properties.address}</p>
                <p>出單數量: ${properties.count}</p>
               </div>`
            ).addTo(mapBoxObj);
    })
})
const empty = ref(true)
const hideEmpty = () => {
    // https://docs.mapbox.com/mapbox-gl-js/example/timeline-animation/
    // https://docs.mapbox.com/help/tutorials/show-changes-over-time/
    empty.value = !empty.value;
    const filter = empty.value ? null: ['>', 'count', 0];
    if (mapBoxObj.getLayer('stores-text')) { mapBoxObj.setFilter('stores-text', filter)}
    if (mapBoxObj.getLayer('store-point')) { mapBoxObj.setFilter('store-point', filter)}
    if (mapBoxObj.getLayer('store-heatmap')) { mapBoxObj.setFilter('store-heatmap', filter)}
    // mapBoxObj.setFilter('stores', filter? ["has", "count"]: null)
    // .setPaintProperty('stores', 'fill-opacity', (filter? 0.5: 0.7)) 
}
const toggle = ref(true)
const toggleLayer = () => {
    toggle.value = !toggle.value;
    mapBoxObj.setLayoutProperty('stores-text', 'visibility', ((toggle.value)? 'visible': 'none'))
    .setLayoutProperty('store-point', 'visibility', ((toggle.value)? 'visible': 'none'))
    .setLayoutProperty('store-heatmap', 'visibility', ((toggle.value)? 'visible': 'none'));
}
</script>

<template>
    <button @click="hideEmpty">{{ empty? '開啟': '關閉' }}count=0</button>
    <button @click="toggleLayer">{{ toggle? '開啟': '關閉' }}點位圖層</button>
    <div id="mapbox"></div>
</template>