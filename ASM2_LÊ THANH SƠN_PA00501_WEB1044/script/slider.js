const hinh = [
    'secondSlider.webp',
    'firstSlider.webp',
    'thirdSlider.webp',
];

// Slider
let i = 0;
function prev(){
    i--;
    if(i<0) i = hinh.length -1;
    document.getElementById('img').src = `img/${hinh[i]}`;
}

function next(){
    i++;
    if(i==hinh.length) i = 0;
    document.getElementById('img').src = `img/${hinh[i]}`;
}
//auto chạy
setInterval(next,5000);