let products = [
    {
        name: '농구공',
        price: 100000,
        seller: '조이',
        imageUrl: '../images/products/basketball1.jpeg'
    },
    {
        name: '축구공',
        price: 50000,
        seller: '메이',
        imageUrl: '../images/products/soccerball1.jpg'
    },
    {
        name: '키보드',
        price: 100000,
        seller: '로이',
        imageUrl: '../images/products/keyboard1.jpg'
    }
];

let productsHtml = [];
for ( let i = 0; i < products.length; i++){
    let product = products[i]
    productsHtml = productsHtml + '<div class="product-card">'
    +'<img class="product-img" src="' +product.imageUrl+ '" alt="농구공">'
    +'<div class="product-contents">'
    +'<span class="product-name">'+product.name+'</span>'
    +'<span class="product-price">'+product.price+'원</span>'
    +'<div class="product-seller">'
    +'<img class="product-avatar" src="./images/icons/avatar.png" alt="avatar" />'
    +'<span>'+product.seller+'</span>'
    +'</div>'
    +'</div>'
    +'</div>';
}


document.querySelector('#product-list').innerHTML = productsHtml