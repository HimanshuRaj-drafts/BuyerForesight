function locomo() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
        smartphone: { smooth: true }
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }

    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}
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
function counters() {

    document.addEventListener("DOMContentLoaded", () => {
        const section = document.getElementById('counters-section');
        const counters = section.querySelectorAll('.count');

        // Counting function
        function startCounting(counter) {
            const target = +counter.getAttribute('data-target');
            const duration = 800; // total animation time in ms
            const frameRate = 60;  // frames per second
            let current = 0;
            const increment = target / (duration / (1000 / frameRate));

            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);

                    // ✅ Add "+" only if this element has data-plus="true"
                    if (counter.dataset.plus === "true") {
                        counter.textContent = Math.floor(current) + "+";
                    }
                    else if (counter.dataset.plus === "mill") {
                        counter.textContent = Math.floor(current) + "M";
                    }
                    else {
                        counter.textContent = Math.floor(current) + "%"
                    }
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 1000 / frameRate);
        }


        // ✅ Use Intersection Observer to trigger when section enters viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(startCounting);
                    observer.unobserve(section); // run only once
                }
            });
        }, { threshold: 0.2 }); // 0.3 = 20% of section visible

        observer.observe(section);
    });

    gsap.from(".counters-container .counter-box", {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".counters-container .counter-box",
            scroller: "#main",
            start: "top 100%",
            end: "top 50%",
            scrub: 1,
            // markers: { startColor: "green", endColor: "red", fontSize: "12px" }
        }
    })
}
function sclTig() {

    gsap.from(".card-cont .card", {
        y: 100,
        opacity: 0,
        stagger: 0.4,
        scrollTrigger: {
            trigger: ".card-cont .card",
            scroller: "#main",
            start: "top 95%",
            end: "top 50%",
            scrub: 1,
            // markers: { startColor: "green", endColor: "red", fontSize: "12px" }
        }
    })

    var pl = gsap.timeline()

    pl.from(".p4heading", {
        y:"20%",

    })

    pl.from(".square", {
        y: "30%",
        opacity: 0,
        scrollTrigger: {
            trigger: ".square",
            scroller: "#main",
            start: "-150% 30%",
            end:"50% 80%",
            markers: { startColor: "green", endColor: "red", fontSize: "12px" },
            scrub:1
        }
    })

}


locomo()
navAni()
counters()
sclTig()

