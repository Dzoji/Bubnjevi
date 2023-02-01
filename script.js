// Selektovanje HTML elementa za crash ride cymbal
let crashRide = document.querySelector('#crash-ride');

// Selektovanje HTML elementa za hi-hat top cymbal
let hiHatTop = document.querySelector('#hihat-top');

// Funkcija za animaciju crash ili ride cymbala
const animateCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)';
}

// Funkcija za animaciju zatvorenog hi-hat cymbala
const animateHiHatClosed = () => {
    hiHatTop.style.top = '171px';
}

// Događaj slušač za događaj keydown na tastaturi
window.addEventListener("keydown", (event) => {
    let code = event.keyCode;
    let keyElement = document.querySelector(`div[data-key="${code}"]`);

    // Ukoliko element ne postoji, završi funkciju
    if (!keyElement) return;
        
    let audio = document.querySelector(`audio[data-key="${code}"]`);
    audio.currentTime = 0;
    audio.play();

    switch(code) {
        // Ukoliko je pritisnuta tipka E ili R
        case 69:
        case 82:
            // Pozovi funkciju za animaciju crash ili ride cymbala
            animateCrashOrRide();
            break;
        // Ukoliko je pritisnuta tipka K ili I
        case 75:
        case 73:
            // Pozovi funkciju za animaciju zatvorenog hi-hat cymbala
            animateHiHatClosed();
            break;
    }

    // Dodaj klasu "playing" elementu
    keyElement.classList.add('playing');
});

// Funkcija za uklanjanje transition efekta za crash ride cymbal
const removeCrashRideTransition = e => {
    if (e.propertyName !== 'transform') return;
    e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
}

// Funkcija za uklanjanje transition efekta za hi-hat top cymbal
const removeHiHatTopTransition = e => {
    if (e.propertyName !== 'top') return;
    e.target.style.top = '166px';
}

// Funkcija za uklanjanje transition efekta za svaku drum tipku
const removeKeyTransition = e => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

// Selektovanje svih HTML elemenata sa klasom "key"
let drumKeys = document.querySelectorAll('.key');

// Za svaki element selektovan sa klasom "key", dodaj dogadjaj "transitionend"
drumKeys.forEach(key => {
    // Kada se dogadjaj "transitionend" desi, pozovi funkciju "removeKeyTransition"
    key.addEventListener("transitionend", removeKeyTransition)
    });
    
    // Dodaj dogadjaj "transitionend" na element selektovan sa ID-em "crash-ride"
    crashRide.addEventListener("transitionend", removeCrashRideTransition);
    
    // Dodaj dogadjaj "transitionend" na element selektovan sa ID-em "hihat-top"
    hiHatTop.addEventListener("transitionend", removeHiHatTopTransition);