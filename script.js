var tl = gsap.timeline()

tl.from(".navlogo", {
    opacity:0,
    x:-10,
    duration:1
})
tl.from(".navbutton",{
    opacity:0,
    x:10,   
    duration:.5
})
tl.from(".navmenu h4",{
    opacity:0,
    y:-10,
    stagger:0.2
})
