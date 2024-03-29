(function () {
    const teams = ["girls-jv", "girls-varsity", "boys-jv", "boys-varsity"];
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
        selectedDiv.style.color = "#373F51";
        selectedDiv.querySelector("div").classList.remove("hidden");
        setPill(window.localStorage.getItem("team"));
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
    if (window.location.href == "https://soccerwebsitedemo.com/") {
        let schedulePath;
        if (window.localStorage.getItem("team")) {
            if (localStorage.getItem("scheduleWidgetValue")) {
                let scheduleWidgetValue = window.localStorage.getItem(
                    "scheduleWidgetValue",
                );

                schedulePath = scheduleWidgetValue == "upcoming" ? "u" : "r";

                window.location.href = `https://soccerwebsitedemo.com/${localStorage.getItem(
                    "team",
                )}/${schedulePath}`;
            } else {
                window.location.href = `https://soccerwebsitedemo.com/${localStorage.getItem(
                    "team",
                )}/u`;
            }
        } else {
            window.location.href = "https://soccerwebsitedemo.com/boys-jv/u";
        }
    }

    // routing for pill selector change
    teamSelect.addEventListener("click", (e) => {
        window.localStorage.setItem("team", e.target.dataset.team);
        let pathArray = window.location.pathname.split("/");

        if (!pagesNotTeamDependent.includes(pathArray[1])) {
            pathArray[1] = e.target.dataset.team;
            let finishedPath = pathArray.join("/");
            window.location.href = `https://soccerwebsitedemo.com${finishedPath}`;
        } else {
            setPill(e.target.dataset.team);
            console.log(e.target.dataset.team);
            teamSelect.classList.add("hidden");
            let selectedTeamDiv = teamSelect.querySelector(
                `.${e.target.dataset.team}`,
            );

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
            console.log(schedulePath);
            localStorage.setItem("scheduleWidgetValue", value);
            let pathArray = window.location.pathname.split("/");
            let team = pathArray[1];
            window.location.href = `https://soccerwebsitedemo.com/${team}/${schedulePath}`;
        });
    });
})();
