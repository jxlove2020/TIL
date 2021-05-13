var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);

// 위도 lat, 경도 lng
const data = [
    {
        title: "용산역",
        address: "용산",
        lat: 37.53012240639658,
        lng: 126.96486336816633
    },{
        title: "서울역",
        address: "서울",
        lat: 37.556049396187376,
        lng: 126.97233592634124
    }
];

// data 에 있는 정보를 하나씩 마커표시
for (let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    let marker = new naver.maps.Marker({
        map: map,
        position: latlng
    })
}