(function () {
    let trigger = document.getElementById("donateModalTrigger");
    let donationModal = document.getElementById("donationModal");
    let closeButton = donationModal.querySelector(".fa-times");
    let donateButton = donationModal.querySelector(".donateButton");

    trigger.addEventListener("click", () => {
        if (donationModal.classList.contains("hidden")) {
            donationModal.classList.remove("hidden");
            donationModal.classList.add("flex");
        }
    });

    closeButton.addEventListener("click", () => {
        donationModal.classList.remove("flex");
        donationModal.classList.add("hidden");
    });

    donateButton.addEventListener("click", () => {
        donationModal.classList.remove("flex");
        donationModal.classList.add("hidden");
    });
})();
