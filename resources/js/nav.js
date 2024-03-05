let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let upperNavHeight = document.getElementById("upperNav").offsetHeight;
    let lowerNav = document.getElementById("lowerNav");
    console.log(upperNav);
    let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scroll down
        document.getElementById("navbar").style.top = `-${upperNavHeight}px`; // Adjust as needed
        lowerNav.style.backgroundColor = "#DCC137";
    } else {
        // Scroll up
        document.getElementById("navbar").style.top = "0";
        lowerNav.style.backgroundColor = "white";
    }

    lastScrollTop = currentScroll;
});
