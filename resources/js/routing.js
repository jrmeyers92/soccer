(function () {
    const teams = window.siteTeams || ["girls-jv", "girls-varsity", "boys-jv", "boys-varsity"];
    const pagesNotTeamDependent = ["news", "coaches", "shop", "sponsers"];
    const pill = document.getElementById("pill");
    const teamSelect = document.getElementById("teamSelect");

    const setPill = (team) => {
        let teamTextArray = team.split("-");

        for (let i = 0; i < teamTextArray.length; i++) {
            if (teamTextArray[i] == "jv") {
                teamTextArray[i] = "JV";
            } else {
                teamTextArray[i] =
                    teamTextArray[i].charAt(0).toUpperCase() +
                    teamTextArray[i].slice(1);
            }
        }

        let pillText = teamTextArray.join(" ");
        pill.innerHTML = `<span class="mr-2">${pillText} <i class="fa-solid fa-chevron-down"></i>`;
    };

    // set dropdown item/option to match pathname
    if (teams.includes(window.location.pathname.split("/")[1])) {
        let selectedDiv = teamSelect.querySelector(
            `.${window.location.pathname.split("/")[1]}`,
        );
        selectedDiv.style.color = "#373F51";
        selectedDiv.querySelector("div").classList.remove("hidden");

        setPill(window.location.pathname.split("/")[1]);
    } else if (window.localStorage.getItem("team")) {
        let selectedDiv = teamSelect.querySelector(
            `.${window.localStorage.getItem("team")}`,
        );
        if (selectedDiv) {
            selectedDiv.style.color = "#373F51";
            selectedDiv.querySelector("div").classList.remove("hidden");
            setPill(window.localStorage.getItem("team"));
        }
    }

    // show and hide selectors when pill pressed
    pill.addEventListener("click", () => {
        if (teamSelect.classList.contains("hidden")) {
            teamSelect.classList.remove("hidden");
        } else {
            teamSelect.classList.add("hidden");
        }
    });

    // reroute page if land on homepage with no team path
    if (window.location.pathname === "/") {
        let schedulePath;
        if (window.localStorage.getItem("team")) {
            if (localStorage.getItem("scheduleWidgetValue")) {
                let scheduleWidgetValue = window.localStorage.getItem(
                    "scheduleWidgetValue",
                );

                schedulePath = scheduleWidgetValue == "upcoming" ? "u" : "r";

                window.location.href = `${window.location.origin}/${localStorage.getItem(
                    "team",
                )}/${schedulePath}`;
            } else {
                window.location.href = `${window.location.origin}/${localStorage.getItem(
                    "team",
                )}/u`;
            }
        } else {
            window.location.href = `${window.location.origin}/${teams[0]}/u`;
        }
    }

    // routing for pill selector change
    teamSelect.addEventListener("click", (e) => {
        const team = e.target.closest("[data-team]")?.dataset.team;
        if (!team) return;

        window.localStorage.setItem("team", team);
        let pathArray = window.location.pathname.split("/");

        if (!pagesNotTeamDependent.includes(pathArray[1])) {
            pathArray[1] = team;
            let finishedPath = pathArray.join("/");
            window.location.href = `${window.location.origin}${finishedPath}`;
        } else {
            setPill(team);
            teamSelect.classList.add("hidden");
            let selectedTeamDiv = teamSelect.querySelector(`.${team}`);

            let teamOptions = document.querySelectorAll(".teamSelectItem");
            teamOptions.forEach((item) => {
                item.style.color = "black";
                item.querySelector("div").classList.add("hidden");
            });

            selectedTeamDiv.style.color = "#373F51";
            selectedTeamDiv.querySelector("div").classList.remove("hidden");
        }
    });

    // event listener when schedule widget buttons are pushed
    let scheduleSelectorBtns = document.querySelectorAll(
        ".scheduleSelectorBtn",
    );
    scheduleSelectorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let value = btn.id;
            let schedulePath = value == "upcoming" ? "u" : "r";
            localStorage.setItem("scheduleWidgetValue", value);
            let pathArray = window.location.pathname.split("/");
            let team = pathArray[1];
            window.location.href = `${window.location.origin}/${team}/${schedulePath}`;
        });
    });
})();
