class Blog {
    constructor() {
        this.registerEvents();
        // 데이터를 추가할 때 중복을 제거
        this.likedSet = new Set();
    }
    
    registerEvents() {
        const startBtn = document.querySelector(".start");
        const dataURL = "https://api.hnpwa.com/v0/news/1.json";
        const blogList = document.querySelector(".blogList > ul");
        
        startBtn.addEventListener("click", () => {
            this.setInitData(dataURL);
        })

        blogList.addEventListener("click", ({target}) => {
            const targetClassName = target.className
            // console.log(targetClassName)
            
            // classname 이 like 라면 내 좋아요 목록에 새로운 블로그 제목을 추가한다.
            if(targetClassName !== "like" && targetClassName !=="unlike") return;

            // 좋아요의 이전 형제 노드의 textContent 가 제목
            const postTitle = target.previousElementSibling.textContent;
            // console.log('선택한 블로그 제목', postTitle);

            // 좋아요 취소를 클릭한 경우에 좋아요로 다시 변경하고 좋아요 목록을 제거 하고 좋아요 목록 뷰를 렌더링
            if(targetClassName == "unlike") {
                target.className = "like";
                target.innerText = "좋아요";

                this.likedSet.delete(postTitle);
            } else {                
                // 좋아요 된 목록 (div) 의 클래스를 like 에서 unlike로 변경
                target.className = "unlike";
                target.innerText = "좋아요 취소";
                
                // 내 좋아요 목록에 추가
                this.likedSet.add(postTitle);
            }

            // 내 좋아요 목록 뷰에 추가
            this.updateLikedList();
        });
    }

    updateLikedList() {
        const ul = document.querySelector(".likeList > ul");
        let likedSum = "";

        // li 태그에 좋아요 리스트를 넣고 한번의 innerHtml을 사용
        this.likedSet.forEach((v)=>{
            likedSum += `<li>${v}</li>`;
            ul.innerHTML = likedSum
        })
    }

    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts);
    }

    // 콜백함수 사용 fn
    getData(dataURL, fn) {
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            const list = JSON.parse(oReq.responseText);
            fn(list)

            // console.log(list)

            // list.forEach(element => {
            //     console.log(element.title);                
            // });
        });

        oReq.open('GET', dataURL);
        oReq.send();
    }

    insertPosts(list) {
        const ul = document.querySelector(".blogList > ul");
        list.forEach((v)=>{
            ul.innerHTML += `
            <li>
                <a href="${v.url}">${v.title}</a>
                <div class="like">좋아요</div>
            </li>
            `;
        })
    }
}

export default Blog;