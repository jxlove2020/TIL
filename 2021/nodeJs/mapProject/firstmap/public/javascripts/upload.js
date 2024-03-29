const mapContainer = document.getElementById("map");
const mapOption = {
  center: new daum.maps.LatLng(37.554477, 126.970419),
  level: 3,
};

let map = new daum.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new daum.maps.services.Geocoder();
// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);
// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, "idle", function () {
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    var infoDiv = document.getElementById("centerAddr");

    for (var i = 0; i < result.length; i++) {
      // 행정동의 region_type 값은 'H' 이므로
      if (result[i].region_type === "H") {
        infoDiv.innerHTML = result[i].address_name;
        break;
      }
    }
  }
}

// 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, "center_changed", function () {
  // 지도의  레벨을 얻어옵니다
  var level = map.getLevel();

  // 지도의 중심좌표를 얻어옵니다
  var latlng = map.getCenter();

  var message = "<p>지도 레벨은 " + level + " 이고</p>";
  message +=
    "<p>중심 좌표는 위도 " +
    latlng.getLat() +
    ", 경도 " +
    latlng.getLng() +
    "입니다</p>";

  // var resultDiv = document.getElementById('result');
  // resultDiv.innerHTML = message;

  console.log(message);
});

// 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, "bounds_changed", function () {
  // 지도 영역정보를 얻어옵니다
  var bounds = map.getBounds();

  // 영역정보의 남서쪽 정보를 얻어옵니다
  var swLatlng = bounds.getSouthWest();

  // 영역정보의 북동쪽 정보를 얻어옵니다
  var neLatlng = bounds.getNorthEast();

  var message =
    "<p>영역좌표는 남서쪽 위도, 경도는  " + swLatlng.toString() + "이고 <br>";
  message += "북동쪽 위도, 경도는  " + neLatlng.toString() + "입니다 </p>";

  // var resultDiv = document.getElementById('result');
  // resultDiv.innerHTML = message;
  console.log(message);
});

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

  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
  if (status === daum.maps.services.Status.OK) {
    // console.log(data);
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    displayPagination(pagination);
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

  for (let i = 0; i < data.length; i++) {
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
    const itemStr = `<div class="info_title">${place_name}</div><span>${address_name}</span>`;

    el.innerHTML = itemStr;
    el.className = "item";

    daum.maps.event.addListener(marker, "click", function () {
      displayInfowindow(marker, place_name, address_name, lat, lng);
    });

    daum.maps.event.addListener(map, "click", function () {
      infowindow.close();
    });

    el.onclick = function () {
      displayInfowindow(marker, place_name, address_name, lat, lng);
    };

    listEl.appendChild(el);
  }
  map.setBounds(bounds);
}

function displayInfowindow(marker, title, address, lat, lng) {
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
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

function removeMarker() {
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].setMap(null);
  }
  markerList = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

function onSubmit(title, address, lat, lng) {
  // 서버에 요청을 보낼수 있도록 jQuery 의 ajax 사용
  $.ajax({
    url: "/location",
    data: { title, address, lat, lng },
    type: "POST",
  })
    .done(response => {
      console.log("데이터 요청 성공");
      alert("데이터 요청 성공");
    })
    .fail(response => {
      console.log("데이터 요청 실패");
      alert("데이터 요청 실패");
    });
}

// 지도 타입 정보를 가지고 있을 객체입니다
// map.addOverlayMapTypeId 함수로 추가된 지도 타입은
// 가장 나중에 추가된 지도 타입이 가장 앞에 표시됩니다
// 이 예제에서는 지도 타입을 추가할 때 지적편집도, 지형정보, 교통정보, 자전거도로 정보 순으로 추가하므로
// 자전거 도로 정보가 가장 앞에 표시됩니다
let mapTypes = {
  terrain: kakao.maps.MapTypeId.TERRAIN,
  traffic: kakao.maps.MapTypeId.TRAFFIC,
  bicycle: kakao.maps.MapTypeId.BICYCLE,
  useDistrict: kakao.maps.MapTypeId.USE_DISTRICT,
};

// 체크 박스를 선택하면 호출되는 함수입니다
function setOverlayMapTypeId() {
  let chkTerrain = document.getElementById("chkTerrain"),
    chkTraffic = document.getElementById("chkTraffic"),
    chkBicycle = document.getElementById("chkBicycle"),
    chkUseDistrict = document.getElementById("chkUseDistrict");

  // 지도 타입을 제거합니다
  for (let type in mapTypes) {
    map.removeOverlayMapTypeId(mapTypes[type]);
  }

  // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
  if (chkUseDistrict.checked) {
    map.addOverlayMapTypeId(mapTypes.useDistrict);
  }

  // 지형정보 체크박스가 체크되어있으면 지도에 지형정보 지도타입을 추가합니다
  if (chkTerrain.checked) {
    map.addOverlayMapTypeId(mapTypes.terrain);
  }

  // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
  if (chkTraffic.checked) {
    map.addOverlayMapTypeId(mapTypes.traffic);
  }

  // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
  if (chkBicycle.checked) {
    map.addOverlayMapTypeId(mapTypes.bicycle);
  }
}
