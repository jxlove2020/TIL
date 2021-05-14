const mapContainer = document.getElementById("map");
const mapOption = {
    center: new daum.maps.LatLng(37.554477, 126.970419),
    level: 3,
};

let map = new daum.maps.Map(mapContainer, mapOption);

let infowindow = new daum.maps.InfoWindow({
    zIndex: 1,
});

// 몇 번째 마커가 들어가게 될지
let markerList = [];

// 키워드 검색할 수 있게하는 코드 
let ps = new daum.maps.services.Places();

searchPlaces();

function searchPlaces() {
    let keyword = $("#keyword").val();
    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status) {
    if (status === daum.maps.services.Status.OK) {
        // console.log(data);
        displayPlaces(data);
    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
    } else if (status === daum.maps.services.Status.ERROR) {
        alert("검색 결과중 오류가 발생하였습니다.");
        return;
    }
}

function displayPlaces(data) {
    let listEl = document.getElementById("placesList");
    // 지도 검색시 해당지점 영역 보여주게 하는 것 - 초기화
    let bounds = new daum.maps.LatLngBounds();

    // 검색결과 초기화 
    removeAllChildNodes(listEl);
    removeMarker();

    for (let i=0; i<data.length; i++) {
        let lat = data[i].y;
        let lng = data[i].x;
        let address_name = data[i]["address_name"];
        let place_name = data[i]["place_name"];
        const placePosition = new daum.maps.LatLng(lat, lng);
        // 자동으로 영역 계산
        bounds.extend(placePosition);
        let marker = new daum.maps.Marker({
            position: placePosition,
        });

        // 마커를 지도에 표시
        marker.setMap(map);
        // 마커리스트에 추가
        markerList.push(marker);

        // 결과값을 리스트 형태로 만들어줌
        const el = document.createElement("div");
        const itemStr =`<div class="info_title">${place_name}</div><span>${address_name}</span>`

        el.innerHTML = itemStr;
        el.className = "item";

        daum.maps.event.addListener(marker, "click", function(){
            displayInfowindow(marker, place_name, address_name, lat, lng);
        });

        daum.maps.event.addListener(map, "click", function(){
            infowindow.close();
        });
        
        el.onclick = function() {
            displayInfowindow(marker, place_name, address_name, lat, lng);
        };
        
        listEl.appendChild(el);
    }
    map.setBounds(bounds);
}

function displayInfowindow (marker, title, address, lat, lng) {
    let content = `
        <div style="padding: 25px;">
            ${title}<br>
            ${address}<br>
            <button onClick="onSubmit('${title}','${address}',${lat},${lng});">등록</button>
        </div>
    `;
    // 해당위치 불러오기
    map.panTo(marker.getPosition());
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

function removeAllChildNodes(el) {
    while(el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function removeMarker() {
    for(let i=0; i<markerList.length; i++){
        markerList[i].setMap(null);
    }
    markerList = [];
}

function onSubmit(title, address, lat, lng) {
    // 서버에 요청을 보낼수 있도록 jQuery 의 ajax 사용
    $.ajax({
        url : "/location",
        data: {title, address, lat, lng},
        type: "POST",
    }).done((response) => {
        console.log("데이터 요청 성공");
        alert("데이터 요청 성공");
    }).fail((response) => {
        console.log("데이터 요청 실패");
        alert("데이터 요청 실패");
    })
}