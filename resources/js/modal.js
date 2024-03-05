(function () {
    const trigger = document.getElementById("donateModalTrigger");
    const donationModal = document.getElementById("donationModal");
    const closeButton = donationModal.querySelector(
        "#donationModalCloseButton",
    );
    const donateButton = donationModal.querySelector(".donateButton");

    const showModal = () => {
        donationModal.classList.remove("opacity-0");
        donationModal.classList.remove("pointer-events-none");
    };

    const hideModal = () => {
        donationModal.classList.add("opacity-0");
        donationModal.classList.add("pointer-events-none");
    };

    trigger.addEventListener("click", (e) => {
        if (donationModal.classList.contains("opacity-0")) {
            showModal();
        }
    });

    closeButton.addEventListener("click", () => {
        hideModal();
    });

    donateButton.addEventListener("click", () => {
        hideModal();
    });
})();
