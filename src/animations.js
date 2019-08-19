function loadAnimation() {
    const tl = new TimelineMax()
    const startSlider = document.querySelector('.slider')
    const quiz = document.querySelector('.quiz')

    //first question fades in
    tl.fromTo(quiz, .2, { opacity: 0 }, { opacity: 1 }, .1)
        //background switch
        .fromTo(startSlider, .8, { y: "0" }, { y: "-100%", ease: Power2.easeInOut })
}

function finalScoreAnimation() {
    const scoreDiv = document.querySelector('.score-container')
    const tl = new TimelineMax()
    tl.from(scoreDiv, 1, { scale: 0.5 }, 0);
}
export { loadAnimation, finalScoreAnimation } 