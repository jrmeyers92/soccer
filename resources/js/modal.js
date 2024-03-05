(function () {
    let trigger = document.getElementById("donateModalTrigger");
    let donationModal = document.getElementById("donationModal");
    let closeButton = donationModal.querySelector(".fa-times");
    let donateButton = donationModal.querySelector(".donateButton");

    trigger.addEventListener("click", () => {
        if (donationModal.classList.contains("opacity-0")) {
            donationModal.classList.remove("opacity-0");
            donationModal.classList.remove("pointer-events-none");
            // donationModal.classList.add("flex");
        }
    });

    closeButton.addEventListener("click", () => {
        // donationModal.classList.remove("flex");
        donationModal.classList.add("opacity-0");
        donationModal.classList.add("pointer-events-none");
    });

    donateButton.addEventListener("click", () => {
        // donationModal.classList.remove("flex");
        donationModal.classList.add("opacity-0");
        donationModal.classList.add("pointer-events-none");
    });
})();
