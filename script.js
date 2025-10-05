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
        y: "20%",

    })

    pl.from(".square-cont .square", {
        y: "30%",
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".square-cont .square ",
            scroller: "#main",
            start: "-150% 30%",
            end: "50% 80%",
            // markers: { startColor: "green", endColor: "red", fontSize: "12px" },
            scrub: 1,
        }
    })

}
function coroani() {

    const track = document.querySelector('.carousel-track');
    let slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    let currentIndex = 1;

    // Clone first & last slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    track.appendChild(firstClone);
    track.prepend(lastClone);

    // Refresh slides array (with clones)
    slides = Array.from(track.children);

    // ✅ Function: get exact pixel offset for any slide
    function getSlideOffset(index) {
        return slides[index].offsetLeft - slides[0].offsetLeft;
    }

    // ✅ Function: apply the transform smoothly
    function moveToSlide() {
        track.style.transition = 'transform 0.6s ease-in-out';
        track.style.transform = `translateX(-${getSlideOffset(currentIndex)}px)`;
    }

    // ✅ Set initial slide position
    function goToInitial() {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${getSlideOffset(currentIndex)}px)`;
    }
    goToInitial();

    // ✅ Handle next & prev buttons
    nextButton.addEventListener('click', () => {
        if (currentIndex >= slides.length - 1) return;
        currentIndex++;
        moveToSlide();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex--;
        moveToSlide();
    });

    // ✅ Handle infinite loop reset (no flicker)
    track.addEventListener('transitionend', () => {
        if (slides[currentIndex].classList.contains('clone')) {
            track.style.transition = 'none';
            if (currentIndex === slides.length - 1) {
                currentIndex = 1;
            } else if (currentIndex === 0) {
                currentIndex = slides.length - 2;
            }
            track.style.transform = `translateX(-${getSlideOffset(currentIndex)}px)`;
        }
    });

    // ✅ Handle browser resize (realigns slides)
    window.addEventListener('resize', () => {
        goToInitial();
    });

    // ===== DOT NAVIGATION =====
    const dotsContainer = document.querySelector('.carousel-dots');
    const realSlidesCount = slides.length - 2; // exclude clones
    let dots = [];

    // Create dots
    for (let i = 0; i < realSlidesCount; i++) {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
            currentIndex = i + 1; // offset for clone at start
            moveToSlide();
            updateDots();
        });
    }

    // Update dot styles
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        const realIndex = currentIndex - 1;
        if (realIndex >= 0 && realIndex < dots.length) {
            dots[realIndex].classList.add('active');
        } else if (currentIndex === 0) {
            dots[dots.length - 1].classList.add('active');
        } else if (currentIndex === slides.length - 1) {
            dots[0].classList.add('active');
        }
    }



    // Update dots after every transition
    track.addEventListener('transitionend', updateDots);

}

locomo()
navAni()
counters()
sclTig()
coroani()
