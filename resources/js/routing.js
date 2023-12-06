(function() {

    console.log('this ran')

    const teams = ["girls-jv", "girls-varsity", "boys-jv", "boys-varsity"]
    const pagesNotTeamDependent = ["news", "coaches","shop" ]


    // set dropdown selector to match pathname
    if (teams.includes(window.location.pathname.split("/")[1])) {
        document.getElementById('teamSelector').value = window.location.pathname.split("/")[1];
    }


    // re-reoute of of "/" to value saved in localstorage or default to boys-jv
    if (window.location.href == "https://sticky-ocean-axgkzko5bv.ploi.ing/") {
        if (localStorage.getItem("team")) {
            document.getElementById('teamSelector').value = localStorage.getItem('team')

            if (localStorage.getItem("scheduleWidgetValue")) {
                let scheduleWidgetValue = localStorage.getItem('scheduleWidgetValue');
                let schedulePath = scheduleWidgetValue= "upcoming" ? "u" : "r";

                window.location.href=`https://sticky-ocean-axgkzko5bv.ploi.ing/${localStorage.getItem("team")}/${schedulePath}`;

            } else {
                window.location.href=`https://sticky-ocean-axgkzko5bv.ploi.ing/${localStorage.getItem("team")}/u`;
            }
        } else {
            window.location.href = "https://sticky-ocean-axgkzko5bv.ploi.ing/boys-jv/u";
        }
    }


    // set selector for pages that are team independent
    if (pagesNotTeamDependent.includes(window.location.pathname.split("/")[1])) {
        if (localStorage.getItem("team")) {
            document.getElementById('teamSelector').value = localStorage.getItem('team')
        }
    }


    document.getElementById('teamSelector').addEventListener('change', (e) => {
        window.localStorage.setItem("team", e.target.value);
        let pathArray = window.location.pathname.split('/')
        
        if (pagesNotTeamDependent.includes(pathArray[1])) {
            localStorage.setItem('team', e.target.value)

        } else {
            pathArray[1] = e.target.value;
            let finishedPath = pathArray.join('/');
            window.location.href = `https://sticky-ocean-axgkzko5bv.ploi.ing${finishedPath}`
        }
    })


    // event listener when schedule widget buttons are pushed
    let scheduleSelectorBtns = document.querySelectorAll('.scheduleSelectorBtn');
    scheduleSelectorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let value = btn.id;
            let schedulePath = value == "upcoming" ? "u" : "r";
            console.log(schedulePath)
            localStorage.setItem('scheduleWidgetValue', value);
            let pathArray = window.location.pathname.split('/')
            let team = pathArray[1]
            window.location.href=`https://sticky-ocean-axgkzko5bv.ploi.ing/${team}/${schedulePath}`
        })
    })

})();