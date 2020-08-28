//when mouse moves over image, enable lens, trigger zoom function
//when image changes, then we hover over new image, zoom function triggers
document.querySelector('#img-container').addEventListener('mouseover', () => {
    document.querySelector('#lens').style.display = 'block';
    imageZoom('#feature');
});

//when we move mouse out of image, disable lens 
document.querySelector('#img-container').addEventListener('mouseleave', () => {
    document.querySelector('#lens').style.display = 'none';
});

//image zoom in function
const imageZoom = (imgid) => {
    let img = document.querySelector(imgid);
    let lens = document.querySelector('#lens');

    lens.style.backgroundImage = `url( ${img.src} )`; 

    let ratio = 2.5; //how many times to zoom in
    lens.style.backgroundSize = (img.width*ratio) + 'px ' + (img.height*ratio) + 'px';
    
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);

    //for mobile ready:
    img.addEventListener('touchmove', moveLens);

    function moveLens(){
        let position = getCursor();
        //console.log(position);

        //get left and top position: using cursor position - lens width & height / 2
        let positionLeft = position.x - (lens.offsetWidth / 2);
        let positionTop = position.y - (lens.offsetHeight / 2);

        //set lens bounds
        if(positionLeft < 0){
            positionLeft = 0;
        }

        if(positionTop < 0){
            positionTop = 0;
        }
            //lens stays within img bottom border
        if(positionLeft > img.width - lens.offsetWidth){
            positionLeft = img.width - lens.offsetWidth;
        }
            //lens stays within img right border
        if(positionTop > img.height - lens.offsetHeight){
            positionTop = img.height - lens.offsetHeight;
        }

        //set lens left top position based on cursor result
        lens.style.left = positionLeft + 'px';
        lens.style.top = positionTop + 'px';

        //set lens background position and invert
        lens.style.backgroundPosition = '-' + (position.x*ratio) + 'px -' + (position.y*ratio) + 'px';
    }

    function getCursor(){
        //set e to window events and get bounds of image
        let e = window.event;
        let bounds = img.getBoundingClientRect();

        //console.log(e);
        //console.log(bounds);

        //bounds.left is left edge of image element
        let x = e.pageX - bounds.left;
        let y = e.pageY - bounds.top;

        //in case lens and cursor move all together
        //x = x - window.pageXOffset;
        //y = y - window.pageYOffset;

        return {'x': x, 'y': y}
    }
}

imageZoom('#feature');