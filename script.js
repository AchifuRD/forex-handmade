let balance = 0;
let intervalId;
let customStartupMessage = "Welcome to the future of trading.";
let users = new Map();
let currentUser = '';
const ADMIN_PASS = "1234"; // Change this password!

// Admin panel access
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        const pass = prompt("Enter admin password:");
        if (pass === ADMIN_PASS) {
            createAdminPanel();
        } else if (pass !== null) {
            alert("Invalid password!");
        }
    }
});

document.getElementById('setMsgBtn').onclick = setStartupMessage;
document.getElementById('startTrialBtn').onclick = startTrial;
document.getElementById('tradeBtn').onclick = () => trade(false);
document.getElementById('vipBtn').onclick = vipScam;
document.getElementById('logoutBtn').onclick = logout;
document.getElementById('sendMsgBtn').onclick = sendMessage;

function setStartupMessage() {
  const msg = document.getElementById("startupMessage").value.trim();
  if (msg) {
    customStartupMessage = msg;
  }
}

function startTrial() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    alert("Please enter your name first!");
    return;
  }

  currentUser = name;
  users.set(name, {
      joinTime: new Date().toLocaleString(),
      balance: 0
  });
  updateUserList();

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("tradingArea").style.display = "block";

  document.getElementById("message").innerText = `${customStartupMessage}`;

  // Auto gain every 3 seconds
  intervalId = setInterval(() => {
    trade(true);
  }, 3000);
}

function trade(auto = false) {
  const gains = [
    50000, 100000, 250000, 500000, 999999,
    1000000, 2000000, 5000000, 9999999, 10000000
  ];
  const gain = gains[Math.floor(Math.random() * gains.length)];

  balance += gain;
  document.getElementById("balance").innerText = balance.toLocaleString();

  const messages = [
    `🚀 +$${gain.toLocaleString()} Profit!`,
    `🤖 AI bot just made genius move.`,
    `Elon Musk copied your strategy.`,
    `🚨 Market crash? Nah, you profit.`,
    `BTC just exploded again.`,
    `You're trending on Reddit.`,
    `Your broker is shocked.`,
    `💸 Another win!`
  ];

  document.getElementById("message").innerText = messages[Math.floor(Math.random() * messages.length)];

  // Update user balance in tracking
  if (users.has(currentUser)) {
      let userData = users.get(currentUser);
      userData.balance = balance;
      users.set(currentUser, userData);
      updateUserList();
  }

  if (!auto) playSound();
}

function playSound() {
  const audio = document.getElementById("cashSound");
  audio.currentTime = 0;
  audio.play();
}

function sendMessage() {
  const msg = document.getElementById("customMessage").value;
  if (!msg) {
    alert("Please write a message first.");
    return;
  }

  document.getElementById("message").innerText = msg;
  playSound();
}

function vipScam() {
  alert("💎 VIP Membership: Pay $1 to unlock Infinite Profits.\n\n[Payment gateway coming soon...] 😎");
}

function logout() {
  clearInterval(intervalId);
  alert("🚨 FBI WARNING: Unauthorized access detected. Shutting down...");
  document.getElementById("tradingArea").style.display = "none";
  document.getElementById("loginScreen").style.display = "block";
  balance = 0;
  document.getElementById("balance").innerText = "0";
  document.getElementById("message").innerText = "";
  users.delete(currentUser);
  updateUserList();
  currentUser = '';
}

function createAdminPanel() {
    let existingPanel = document.getElementById('adminPanel');
    if (existingPanel) {
        existingPanel.remove();
    }

    const panel = document.createElement('div');
    panel.id = 'adminPanel';
    panel.className = 'box floating-admin';
    panel.innerHTML = `
        <div style="text-align:right">
            <button onclick="this.parentElement.parentElement.remove()" style="width:auto;padding:5px">×</button>
        </div>
        <h2>🕵️‍♂️ Admin Panel</h2>
        <div id="activeUsers">Active Users: ${users.size}</div>
        <div id="userList" style="max-height:200px;overflow-y:auto;margin:10px 0;"></div>
        <input type="text" id="startupMessage" placeholder="Set startup message">
        <button onclick="setStartupMessage()" id="setMsgBtn">Set Message</button>
        <textarea id="customMessage" placeholder="Send custom message"></textarea>
        <button onclick="sendMessage()" id="sendMsgBtn">Send Message</button>
    `;
    
    document.body.appendChild(panel);
    updateUserList();
}

function updateUserList() {
    const userListDiv = document.getElementById('userList');
    if (!userListDiv) return;
    
    let listHTML = '';
    users.forEach((data, name) => {
        listHTML += `
            <div style="border-bottom:1px solid #0f0;padding:5px;margin:5px 0;">
                <strong>${name}</strong><br>
                Balance: $${data.balance.toLocaleString()}<br>
                Joined: ${data.joinTime}
            </div>
        `;
    });
    userListDiv.innerHTML = listHTML || 'No active users';
}
