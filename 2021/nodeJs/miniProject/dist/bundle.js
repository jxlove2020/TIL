(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}new(function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.registerEvents(),this.likedSet=new Set}var n,i;return n=t,(i=[{key:"registerEvents",value:function(){var e=this,t=document.querySelector(".start"),n=document.querySelector(".blogList > ul");t.addEventListener("click",(function(){e.setInitData("https://api.hnpwa.com/v0/news/1.json")})),n.addEventListener("click",(function(t){var n=t.target,i=n.className;if("like"===i||"unlike"===i){var a=n.previousElementSibling.textContent;"unlike"==i?(n.className="like",n.innerText="좋아요",e.likedSet.delete(a)):(n.className="unlike",n.innerText="좋아요 취소",e.likedSet.add(a)),e.updateLikedList()}}))}},{key:"updateLikedList",value:function(){var e=document.querySelector(".likeList > ul"),t="";this.likedSet.forEach((function(n){t+="<li>".concat(n,"</li>"),e.innerHTML=t}))}},{key:"setInitData",value:function(e){this.getData(e,this.insertPosts)}},{key:"getData",value:function(e,t){var n=new XMLHttpRequest;n.addEventListener("load",(function(){var e=JSON.parse(n.responseText);t(e)})),n.open("GET",e),n.send()}},{key:"insertPosts",value:function(e){var t=document.querySelector(".blogList > ul");e.forEach((function(e){t.innerHTML+='\n            <li>\n                <a href="'.concat(e.url,'">').concat(e.title,'</a>\n                <div class="like">좋아요</div>\n            </li>\n            ')}))}}])&&e(n.prototype,i),t}())})();