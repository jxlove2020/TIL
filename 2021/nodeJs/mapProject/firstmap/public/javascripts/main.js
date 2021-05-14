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

let markerList = [];
let infowindowList = [];

// 다시 한번 함수를 호출하는 이유는 
// for 문이 돌면서 함수를 실행해버리면 안되기 때문에 
// 마커가 클릭되었을 때 실행되게 하려고 
const getClickHandler = (i) => () => {
    const marker = markerList[i];
    const infowindow = infowindowList[i];

    if ( infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
}

// 지도 클릭시 인포윈도우 창 닫기
const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
}

// data 에 있는 정보를 하나씩 마커표시, 인포윈도우 표시
for (let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    let marker = new naver.maps.Marker({
        map: map,
        position: latlng,
        // 마커생성
        icon: {
            content: `<div class='marker'></div>`,
            anchor: new naver.maps.Point(7.5, 7.5), // 마커의 1/2 크기로 지정
        },
    });

    const content = `
        <div class="infowindow_wrap">
            <div class="infowindow_title">${target.title}</div>
            <div class="infowindow_address">${target.address}</div>
        </div>
    `;
    const infowindow = new naver.maps.InfoWindow({
        content: content,
        backgroundColor: "#00ff0000",
        borderColor: "#00ff0000",
        anchorSize: new naver.maps.Size(0,0),  // 말풍선 꼬리표 제거
    });

    markerList.push(marker);
    infowindowList.push(infowindow);    
}

// 각 마커에 대한 클릭 이벤트, 지도 클릭시 인포윈도우창 닫기 이벤트
for(let i = 0, ii = markerList.length; i < ii; i++) {
    naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
    naver.maps.Event.addListener(map, "click", getClickMap(i));
}