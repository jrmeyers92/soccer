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
        console.log(pillText);
        pill.innerText = pillText;
    };

    // set dropdown selector to match pathname
    if (teams.includes(window.location.pathname.split("/")[1])) {
        let selectedDiv = teamSelect.querySelector(
            `.${window.location.pathname.split("/")[1]}`
        );
        selectedDiv.style.color = "#00A3F7";
        selectedDiv.querySelector("div").classList.remove("hidden");

        setPill(window.location.pathname.split("/")[1]);
    }

    // show and hide selectors when pill pressed
    pill.addEventListener("click", () => {
        if (teamSelect.classList.contains("hidden")) {
            teamSelect.classList.remove("hidden");
        } else {
            teamSelect.classList.add("hidden");
        }
    });

    if (window.location.href == "http://soccer.test/") {
        let schedulePath;
        if (window.localStorage.getItem("team")) {
            if (localStorage.getItem("scheduleWidgetValue")) {
                let scheduleWidgetValue = window.localStorage.getItem(
                    "scheduleWidgetValue"
                );

                schedulePath = scheduleWidgetValue == "Upcoming" ? "u" : "r";

                window.location.href = `http://soccer.test/${localStorage.getItem(
                    "team"
                )}/${schedulePath}`;
            } else {
                window.location.href = `http://soccer.test/${localStorage.getItem(
                    "team"
                )}/u`;
            }
        } else {
            window.location.href = "http://soccer.test/boys-jv/u";
        }
    }

    // set selector for pages that are team independent
    if (
        pagesNotTeamDependent.includes(window.location.pathname.split("/")[1])
    ) {
        if (localStorage.getItem("team")) {
            setPill(window.localStorage.getItem("team"));
        }
    }

    // routing for pill selector change
    teamSelect.addEventListener("click", (e) => {
        window.localStorage.setItem("team", e.target.dataset.team);
        let pathArray = window.location.pathname.split("/");

        if (!pagesNotTeamDependent.includes(pathArray[1])) {
            console.log(pathArray);
            pathArray[1] = e.target.dataset.team;
            let finishedPath = pathArray.join("/");
            console.log(finishedPath);
            window.location.href = `http://soccer.test${finishedPath}`;
        }
    });

    // event listener when schedule widget buttons are pushed
    let scheduleSelectorBtns = document.querySelectorAll(
        ".scheduleSelectorBtn"
    );
    console.log(scheduleSelectorBtns);
    scheduleSelectorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let value = btn.id;
            let schedulePath = value == "upcoming" ? "u" : "r";
            console.log(schedulePath);
            localStorage.setItem("scheduleWidgetValue", value);
            let pathArray = window.location.pathname.split("/");
            let team = pathArray[1];
            window.location.href = `http://soccer.test/${team}/${schedulePath}`;
        });
    });
})();
