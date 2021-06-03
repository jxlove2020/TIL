var mapOptions = {
  center: new naver.maps.LatLng(37.3595704, 127.105399),
  mapTypeControl: true, // 지도 형식 (일반-지형도, 위성-겹쳐보기)
  mapTypeControlOptions: {
      style: naver.maps.MapTypeControlStyle.BUTTON,
      position: naver.maps.Position.TOP_RIGHT
  },
  zoom: 10,
  zoomControl: true, // 지도 줌 컨트롤 스타일 지정 ( 버튼 형식 , 위치: 우측상단 )
  zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.RIGHT_CENTER
  }
};

var map = new naver.maps.Map('map', mapOptions);

$.ajax({
  url: "/location",
  type: "GET"
}).done((response) => {
  if(response.message !== "success") return;
  const data = response.data;

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

  // 클러스터링 적용 ( 2개 cluster1, 5개 cluster2, 10개 이상 cluster3 )
  const cluster1 = {
      content: `<div class="cluster1"></div>`,
  }
  const cluster2 = {
      content: `<div class="cluster2"></div>`,
  }
  const cluster3 = {
      content: `<div class="cluster3"></div>`,
  }

  new MarkerClustering({
      minClusterSize : 2,
      maxZoom : 12, // 줌의 최대 레벨
      map : map, // naver 지도 위에 띄움
      markers : markerList, 
      disableClickZoom : false, // 클릭시 줌 기능 활성화
      gridSize: 20, // 클러스터의 영역 ( 평균 값 : 100 )
      icons : [ cluster1, cluster2, cluster3 ],
      indexGernerator: [2, 5, 10], 
      stylingFunction: (clusterMarker, count) => {
          $(clusterMarker.getElement()).find("div:first-child").text(count);
      },
  });
});

// 행정구역 지도 나누기
const tooltip = $(
  `<div style="position:absolute; z-index:1000; padding: 5px 10px; background: white; border: 1px solid black; font-size: 14px; display: none; ponter-events: none"></div>`
);

tooltip.appendTo(map.getPanes().floatPane);

const regionGeoJson = [];

naver.maps.Event.once(map, "init_stylemap", () => {
  $.ajax({
    url: "https://4cfd7339-9efa-4b2c-9498-f2b81c0bb1d9.mock.pstmn.io/region",
  }).done((geojson) =>{
    regionGeoJson.push(JSON.parse(geojson))
    console.log(regionGeoJson)
    startDataLayer();
  });
});

function startDataLayer() {
  map.data.setStyle((feature) => {
      const styleOptions = {
        fillColor: "#ff0000",
        fillOpacity: 0.0001,
        strokeColor: "#ff0000",
        strokeWeight: 2,
        strokeOpacity: 0.4,
      };

      if(feature.getProperty("focus")) {
        styleOptions.fillOpacity = 0.6;
        styleOptions.fillColor = "#0f0";
        styleOptions.strokeColor = "#0f0";
        styleOptions.strokeWeight = 4;
        styleOptions.strokeOpacity = 1;
      }

      return styleOptions;
  });

   // 각 행정구역 표시
   regionGeoJson[0].seoul.forEach((geojson) => {
    map.data.addGeoJson(geojson);
  });
  
  map.data.addListener("click", (e) => {
      let feature = e.feature;
      if(feature.getProperty("focus") !== true){
          feature.setProperty("focus", true);
      } else {
          feature.setProperty("focus", false);
      }
  });

  map.data.addListener("mouseover", (e)=> {
      let feature = e.feature;
      let regionName = feature.getProperty("SIG_KOR_NM");
      tooltip.css({
          display: "block",
          left: e.offset.x,
          top: e.offset.y,
      }).text(regionName);
      map.data.overrideStyle(feature, {
          fillOpacity: 0.6,
          strokeWeight: 4, 
          strokeOpacity: 1,
      });
  });

  map.data.addListener("mouseout", (e) => {
      tooltip.hide().empty();
      map.data.revertStyle();
  })
}