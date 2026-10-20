import { getWeek } from "https://unpkg.com/date-fns@3.3.1/getWeek.mjs";

const weekDay = document.querySelector("#weekday");
const weekNr = document.querySelector("#week-nr");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const sl = document.querySelectorAll("iframe");

let prevI = 0;
setInterval(() => {
    const now = new Date();
    weekDay.innerText = now.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", weekday: "long" });
    weekNr.innerText = getWeek(now, { weekStartsOn: 1 });
    date.innerText = now.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", day: "numeric", month: "long", year: "numeric" });
    time.innerText = now.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", hour: "numeric", minute: "numeric", second: "numeric" });

    const i = Math.floor(now.getSeconds() / 10) % sl.length;
    function update() {
        sl[prevI].style.visibility = "hidden";
        sl[i].style.visibility = "visible";
        prevI = i;
    }
    if (prevI != i) {
        if (document.startViewTransition)
            document.startViewTransition(update);
        else {
            update();
        }
    }
}, 1000);
