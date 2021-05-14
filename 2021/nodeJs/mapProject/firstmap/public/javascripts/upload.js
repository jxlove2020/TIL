const mapContainer = document.getElementById("map");
const mapOption = {
    center: new daum.maps.LatLng(37.554477, 126.970419),
    level: 3,
};

let map = new daum.maps.Map(mapContainer, mapOption);