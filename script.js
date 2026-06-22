// Attendance state
let totalCount = 0;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

let attendees = [];

const MAX_ATTENDEES = 50;

// Load from localStorage (extra credit ✅)
function loadData() {
  const savedTotal = localStorage.getItem("totalCount");
  const savedTeams = localStorage.getItem("teamCounts");
  const savedList = localStorage.getItem("attendees");

  if (savedTotal) totalCount = parseInt(savedTotal);
  if (savedTeams) teamCounts = JSON.parse(savedTeams);
  if (savedList) attendees = JSON.parse(savedList);

  updateUI();
  renderAttendeeList();
}

// Save to localStorage (extra credit ✅)
function saveData() {
  localStorage.setItem("totalCount", totalCount);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));
}

// Update UI counts + progress bar
function updateUI() {
  document.getElementById("attendeeCount").innerText = totalCount;

  document.getElementById("waterCount").innerText = teamCounts.water;
  document.getElementById("zeroCount").innerText = teamCounts.zero;
  document.getElementById("powerCount").innerText = teamCounts.power;

  // Progress bar
  const progressPercent = (totalCount / MAX_ATTENDEES) * 100;
  document.getElementById("progressBar").style.width = progressPercent + "%";
}

// Greeting message
function showGreeting(name, team) {
  const greeting = document.getElementById("greeting");

  const teamNames = {
    water: "Team Water Wise 🌊",
    zero: "Team Net Zero 🌿",
    power: "Team Renewables ⚡",
  };

  greeting.innerText = `✅ Welcome, ${name}! You’ve checked in for ${teamNames[team]}.`;
}

// Celebration message (extra credit ✅)
function checkCelebration() {
  if (totalCount >= MAX_ATTENDEES) {
    // Find winning team
    let winningTeam = Object.keys(teamCounts).reduce((a, b) =>
      teamCounts[a] > teamCounts[b] ? a : b
    );

    const teamNames = {
      water: "Team Water Wise 🌊",
      zero: "Team Net Zero 🌿",
      power: "Team Renewables ⚡",
    };

    document.getElementById("greeting").innerText =
      `🎉 Goal reached! ${teamNames[winningTeam]} wins with the most attendees!`;
  }
}

// Render attendee list (extra credit ✅)
function renderAttendeeList() {
  let listContainer = document.getElementById("attendeeList");

  if (!listContainer) {
    listContainer = document.createElement("div");
    listContainer.id = "attendeeList";
    listContainer.style.marginTop = "20px";

    const container = document.querySelector(".container");
    container.appendChild(listContainer);
  }

  listContainer.innerHTML = "<h3>Attendees</h3>";

  attendees.forEach((attendee) => {
    const item = document.createElement("p");

    const teamNames = {
      water: "🌊 Water Wise",
      zero: "🌿 Net Zero",
      power: "⚡ Renewables",
    };

    item.innerText = `${attendee.name} — ${teamNames[attendee.team]}`;
    listContainer.appendChild(item);
  });
}

// Handle form submit
document.getElementById("checkInForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("attendeeName");
  const teamSelect = document.getElementById("teamSelect");

  const name = nameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) return;

  // Update counts
  totalCount++;
  teamCounts[team]++;

  // Save attendee
  attendees.push({ name, team });

  // Update UI
  showGreeting(name, team);
  updateUI();
  renderAttendeeList();
  checkCelebration();
  saveData();

  // Reset form
  nameInput.value = "";
  teamSelect.selectedIndex = 0;
});

// Initial load
loadData();
