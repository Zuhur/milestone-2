function textAppear() {
    var placesText =  document.getElementsByClassName('places-text');
    var screenPosition = window.innerHeight / 1.3;
    
    for (i of placesText){
        var textPosition = i.getBoundingClientRect().top;
        if (textPosition < screenPosition) {
            i.classList.add('places-text-appear');
        }
    }
    
}

window.addEventListener('scroll', textAppear);