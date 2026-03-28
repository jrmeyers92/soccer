(function () {
    const athletics = window.siteAthletics || { sports: [], teams: [] };
    const allSports = athletics.sports || [];
    const allTeams = athletics.teams || [];
    const allSportSlugs = allSports.map(s => s.slug);

    // Build sport → [team slugs] mapping
    const teamsBySport = {};
    allSportSlugs.forEach(s => { teamsBySport[s] = []; });
    allTeams.forEach(t => {
        if (!teamsBySport[t.sport]) teamsBySport[t.sport] = [];
        teamsBySport[t.sport].push(t.slug);
    });

    const pagesNotTeamDependent = ["news", "shop", "sponsers"];
    const pathParts = window.location.pathname.split("/");
    // pathParts: ["", sport, team, section]
    const urlSport = pathParts[1];
    const urlTeam = pathParts[2];
    const urlSection = pathParts[3];

    const sportPill = document.getElementById("sportPill");
    const sportSelect = document.getElementById("sportSelect");
    const teamPill = document.getElementById("pill");
    const teamSelect = document.getElementById("teamSelect");

    // Determine active sport & team from URL first, then localStorage, then first available
    const activeSport = allSportSlugs.includes(urlSport)
        ? urlSport
        : (localStorage.getItem("sport") || allSportSlugs[0]);

    const teamsForActiveSport = teamsBySport[activeSport] || [];
    const activeTeam = (teamsForActiveSport.includes(urlTeam) ? urlTeam : null)
        || localStorage.getItem("team")
        || teamsForActiveSport[0]
        || "";

    // Homepage redirect
    if (window.location.pathname === "/") {
        const savedSport = localStorage.getItem("sport") || allSportSlugs[0];
        const savedTeams = teamsBySport[savedSport] || [];
        const savedTeam = localStorage.getItem("team") || savedTeams[0] || "";
        const savedSection = localStorage.getItem("scheduleWidgetValue") === "results" ? "r" : "u";
        if (savedSport && savedTeam) {
            window.location.href = `${window.location.origin}/${savedSport}/${savedTeam}/${savedSection}`;
        }
        return;
    }

    // Update sport pill display text
    const setSportPill = (sportSlug) => {
        const sport = allSports.find(s => s.slug === sportSlug);
        if (sport && sportPill) {
            sportPill.innerHTML = `${sport.display} <i class="fa-solid fa-chevron-down ml-2"></i>`;
        }
    };

    // Update team pill display text
    const setTeamPill = (sportSlug, teamSlug) => {
        const team = allTeams.find(t => t.slug === teamSlug && t.sport === sportSlug);
        if (team && teamPill) {
            teamPill.innerHTML = `${team.display} <i class="fa-solid fa-chevron-down ml-2"></i>`;
        }
    };

    // Show only teams belonging to the given sport in the team dropdown
    const filterTeamDropdown = (sportSlug) => {
        document.querySelectorAll(".teamSelectItem").forEach(item => {
            item.classList.toggle("hidden", item.dataset.sport !== sportSlug);
        });
    };

    // Mark the active sport option in dropdown
    const markActiveSport = (sportSlug) => {
        document.querySelectorAll(".sportSelectItem").forEach(item => {
            const check = item.querySelector("div");
            if (check) check.classList.add("hidden");
            item.style.color = "";
        });
        const activeItem = sportSelect?.querySelector(`.sport-${sportSlug}`);
        if (activeItem) {
            activeItem.style.color = "#373F51";
            activeItem.querySelector("div")?.classList.remove("hidden");
        }
    };

    // Mark the active team option in dropdown
    const markActiveTeam = (sportSlug, teamSlug) => {
        document.querySelectorAll(".teamSelectItem").forEach(item => {
            const check = item.querySelector("div");
            if (check) check.classList.add("hidden");
            item.style.color = "";
        });
        const activeItem = teamSelect?.querySelector(`.${teamSlug}-${sportSlug}`);
        if (activeItem) {
            activeItem.style.color = "#373F51";
            activeItem.querySelector("div")?.classList.remove("hidden");
        }
    };

    // Set section nav links (Schedule, Roster, Stats, Coaches) with correct sport/team
    document.querySelectorAll(".teamSectionLink").forEach(link => {
        const section = link.dataset.section;
        link.href = `${window.location.origin}/${activeSport}/${activeTeam}/${section}`;
    });

    // Initialise UI state
    setSportPill(activeSport);
    setTeamPill(activeSport, activeTeam);
    filterTeamDropdown(activeSport);
    markActiveSport(activeSport);
    markActiveTeam(activeSport, activeTeam);

    // Toggle sport dropdown
    sportPill?.addEventListener("click", (e) => {
        e.stopPropagation();
        sportSelect?.classList.toggle("hidden");
        teamSelect?.classList.add("hidden");
    });

    // Toggle team dropdown
    teamPill?.addEventListener("click", (e) => {
        e.stopPropagation();
        teamSelect?.classList.toggle("hidden");
        sportSelect?.classList.add("hidden");
    });

    // Close both dropdowns on outside click
    document.addEventListener("click", () => {
        sportSelect?.classList.add("hidden");
        teamSelect?.classList.add("hidden");
    });

    // Sport selection
    sportSelect?.addEventListener("click", (e) => {
        const sport = e.target.closest("[data-sport]")?.dataset.sport;
        if (!sport) return;
        const firstTeam = (teamsBySport[sport] || [])[0] || "";
        localStorage.setItem("sport", sport);
        localStorage.setItem("team", firstTeam);
        window.location.href = `${window.location.origin}/${sport}/${firstTeam}/u`;
    });

    // Team selection
    teamSelect?.addEventListener("click", (e) => {
        const team = e.target.closest("[data-team]")?.dataset.team;
        if (!team) return;
        localStorage.setItem("team", team);
        if (!pagesNotTeamDependent.includes(pathParts[1])) {
            const section = urlSection || "u";
            window.location.href = `${window.location.origin}/${activeSport}/${team}/${section}`;
        } else {
            setTeamPill(activeSport, team);
            markActiveTeam(activeSport, team);
            filterTeamDropdown(activeSport);
            teamSelect.classList.add("hidden");
        }
    });

    // Schedule widget upcoming / results toggle
    document.querySelectorAll(".scheduleSelectorBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const section = btn.id === "upcoming" ? "u" : "r";
            localStorage.setItem("scheduleWidgetValue", btn.id === "upcoming" ? "upcoming" : "results");
            window.location.href = `${window.location.origin}/${activeSport}/${activeTeam}/${section}`;
        });
    });
})();
