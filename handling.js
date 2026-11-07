const stages = [

    {
        name: "Check-In",
        location: "Registration Counter",
        next: "Security Screening",
        progress: 16,
        description:
            "Baggage has been registered and associated with flight AI 203."
    },

    {
        name: "Security Screening",
        location: "Security Zone A",
        next: "Sorting Area",
        progress: 33,
        description:
            "Baggage is undergoing security screening before entering the sorting system."
    },

    {
        name: "Sorting",
        location: "Automated Sorting Hub",
        next: "Conveyor Network",
        progress: 50,
        description:
            "The bag is being sorted according to its flight and destination."
    },

    {
        name: "Conveyor Movement",
        location: "Conveyor Line 04",
        next: "Aircraft Loading Zone",
        progress: 66,
        description:
            "Baggage is moving through the airport conveyor network."
    },

    {
        name: "Loading",
        location: "Loading Bay 03",
        next: "Aircraft AI-203",
        progress: 83,
        description:
            "The baggage has reached the loading zone and is being transferred toward the aircraft."
    },

    {
        name: "Aircraft",
        location: "Aircraft AI-203",
        next: "Journey Complete",
        progress: 100,
        description:
            "Baggage has completed the airport handling workflow."
    }

];


let currentStage = 0;


/* =========================
   START JOURNEY
========================= */

function startSimulation() {

    currentStage = 0;

    updateDisplay();

    addLog(
        "Journey started",
        "Bag BG-20481 entered the baggage handling workflow."
    );
}


/* =========================
   NEXT STAGE
========================= */

function nextStage() {

    if (currentStage < stages.length - 1) {

        currentStage++;

        updateDisplay();

        addLog(
            stages[currentStage].name,
            "Bag BG-20481 moved to " +
            stages[currentStage].location + "."
        );

    } else {

        addLog(
            "Journey completed",
            "Bag BG-20481 has completed all handling stages."
        );

    }

}


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay() {

    const stage = stages[currentStage];

    document.getElementById("progressText").textContent =
        stage.progress + "%";

    document.getElementById("progressFill").style.width =
        stage.progress + "%";

    document.getElementById("currentStage").textContent =
        stage.name;

    document.getElementById("nextStage").textContent =
        "Next: " + stage.next;

    document.getElementById("location").textContent =
        stage.location;

    document.getElementById("currentTitle").textContent =
        stage.name;

    document.getElementById("currentDescription").textContent =
        stage.description;

    document.getElementById("currentLocation").textContent =
        stage.location;


    /* MOVE BAG ICON */

    const bag = document.getElementById("bagMarker");

    const positions = [
        "5%",
        "21%",
        "37%",
        "53%",
        "69%",
        "85%"
    ];

    bag.style.left = positions[currentStage];


    /* CHECKPOINT STATES */

    const checkpoints =
        document.querySelectorAll(".checkpoint");

    checkpoints.forEach((checkpoint, index) => {

        checkpoint.classList.remove("active");
        checkpoint.classList.remove("completed");

        if (index < currentStage) {

            checkpoint.classList.add("completed");

        }

        if (index === currentStage) {

            checkpoint.classList.add("active");

        }

    });

}


/* =========================
   ACTIVITY LOG
========================= */

function addLog(title, description) {

    const log =
        document.getElementById("activityLog");

    const item =
        document.createElement("div");

    item.className = "log-item";

    item.innerHTML = `

        <span class="log-dot"></span>

        <div>
            <strong>${title}</strong>

            <p>${description}</p>
        </div>

        <time>NOW</time>

    `;

    log.prepend(item);

}


/* =========================
   RESET
========================= */

function resetSimulation() {

    currentStage = 0;

    updateDisplay();

    document.getElementById("activityLog").innerHTML = `

        <div class="log-item">

            <span class="log-dot"></span>

            <div>

                <strong>System reset</strong>

                <p>
                    Baggage BG-20481 returned to the
                    registration stage.
                </p>

            </div>

            <time>NOW</time>

        </div>

    `;

}


/* INITIAL LOAD */

updateDisplay();