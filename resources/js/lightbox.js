(function () {
    if (document.getElementById("lightbox")) {
        console.log("ran");
        const lightbox = document.createElement("div");
        lightbox.id = "lightboxElement";
        document.body.appendChild(lightbox);

        let images = document.querySelectorAll("#lightbox img");
        images.forEach((imgage) => {
            imgage.addEventListener("click", () => {
                lightbox.style.display = "flex";
                const img = document.createElement("img");
                img.src = imgage.src;

                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }

                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target !== e.currentTarget) return;
            lightbox.style.display = "none";
        });
    }
})();
