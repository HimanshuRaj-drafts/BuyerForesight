function navAni() {
    var tl = gsap.timeline()

    tl.from(".navlogo", {
        opacity: 0,
        x: -10,
        duration: 1
    })
    tl.from(".navbutton", {
        opacity: 0,
        x: 10,
        duration: .5
    })
    tl.from(".navmenu h4", {
        opacity: 0,
        y: -10,
        stagger: 0.2
    })
}

var tl = gsap.timeline()

tl.from(".card-cont", {
    y: 80,
    opacity: 0,
    scrollTrigger: {
        trigger: ".card-cont",
        scroller: "body",
        start: "top 95%",
        end: "top 50%",
        scrub: 1,
        // markers: { startColor: "green", endColor: "red", fontSize: "12px" }
    }
})

navAni()