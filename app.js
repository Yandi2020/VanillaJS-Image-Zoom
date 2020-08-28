document.querySelector('#img-container').addEventListener('mouseover', () => {
    document.querySelector('#lens').style.display = 'block';
    imageZoom('#feature');
});

document.querySelector('#img-container').addEventListener('mouseleave', () => {
    document.querySelector('#lens').style.display = 'none';
});

const imageZoom = (imgid) => {
    let img = document.querySelector(imgid);
    let lens = document.querySelector('#lens');

    lens.style.backgroundImage = `url( ${img.src} )`; 

    let ratio = 2.5; 
    lens.style.backgroundSize = (img.width*ratio) + 'px ' + (img.height*ratio) + 'px';
    
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('touchmove', moveLens);

    function moveLens(){
        let position = getCursor();
        let positionLeft = position.x - (lens.offsetWidth / 2);
        let positionTop = position.y - (lens.offsetHeight / 2);

        if(positionLeft < 0){
            positionLeft = 0;
        }
        if(positionTop < 0){
            positionTop = 0;
        }
        if(positionLeft > img.width - lens.offsetWidth){
            positionLeft = img.width - lens.offsetWidth;
        }
        if(positionTop > img.height - lens.offsetHeight){
            positionTop = img.height - lens.offsetHeight;
        }

        lens.style.left = positionLeft + 'px';
        lens.style.top = positionTop + 'px';
        lens.style.backgroundPosition = '-' + (position.x*ratio) + 'px -' + (position.y*ratio) + 'px';
    }

    function getCursor(){
        let e = window.event;
        let bounds = img.getBoundingClientRect();
        let x = e.pageX - bounds.left;
        let y = e.pageY - bounds.top;
        return {'x': x, 'y': y}
    }
}

imageZoom('#feature');