document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const rulesSection = document.getElementById("rules");
    const registrationSection = document.getElementById("registration");
    const dashboardSection = document.getElementById("dashboard");

    // Handle registration form submission
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Save user data to local storage
        localStorage.setItem("userName", document.getElementById("name").value);
        localStorage.setItem("userEmail", document.getElementById("email").value);
        localStorage.setItem("userPhone", document.getElementById("phone").value);
        localStorage.setItem("userTeam", document.getElementById("team").value);

        // Transition to rules section
        registrationSection.classList.add("hidden");
        rulesSection.classList.remove("hidden");
    });

    // Handle navigation to dashboard
    window.navigateToDashboard = function () {
        rulesSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        renderTasks(); // Load tasks dynamically
    };

    // Render tasks
    function renderTasks() {
        const tasks = [
    { id: 1, question: 'Hexadecimal String: CTF{48656c6c6f576f726c64}', answer: 'Hello', type: 'hex' },
    { id: 2, question: 'Base64 Encoded String: CTF{U29sdmVUaGlz}', answer: 'Solve', type: 'base64' },
    { id: 3, question: 'Binary Format: CTF{01001000_01000101}', answer: 'Hello', type: 'binary' },
    { id: 4, question: 'Reversed String: CTF{drowssap}', answer: 'password', type: 'reverse' },
    { id: 5, question: 'Combination of Text and Numbers: CTF{Fl4gHunt123}', answer: 'Fl4gHunt123', type: 'combination' },
    { id: 6, question: 'Leetspeak Flag: CTF{fl4g_1s_1337}', answer: 'flag_is_1337', type: 'leetspeak' },
    { id: 7, question: 'Coordinates or Location-Based Flag: CTF{37.7749_N_122.4194_W}', answer: '37.7749_N_122.4194_W', type: 'coordinates' },
    { id: 8, question: 'Hashed String: CTF{5d41402abc4b2a76b9719d911017c592}', answer: 'hello', type: 'hash' },
    { id: 9, question: 'Custom Format: CTF{Find_The_Missing_Links}', answer: 'Find_The_Missing_Links', type: 'custom' },
    { id: 10, question: 'QR Code Flag: CTF{scanned_successfully}', answer: 'scanned_successfully', type: 'qr' }
        ];
        const tasksContainer = document.getElementById("tasks-container");
        tasks.forEach((task) => {
            const taskDiv = document.createElement("div");
            taskDiv.innerHTML = `
                <p>Question ${task.id}: ${task.question}</p>
                <input type="text" id="task-${task.id}" placeholder="Enter answer">
                <button onclick="checkAnswer(${task.id}, '${task.answer}')">Check Answer</button>
                <p id="task-${task.id}-status"></p>
            `;
            tasksContainer.appendChild(taskDiv);
        });
    }

    let score = 0;
    let answeredQuestions = new Set();

    // Check answers
    window.checkAnswer = function (taskId, correctAnswer) {
        const userAnswer = document.getElementById(`task-${taskId}`).value.trim();
        const status = document.getElementById(`task-${taskId}-status`);

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase() && !answeredQuestions.has(taskId)) {
            answeredQuestions.add(taskId);
            score++;
            status.textContent = "Correct!";
            status.style.color = "green";
        } else {
            status.textContent = "Try again!";
            status.style.color = "red";
        }

        document.getElementById("score").textContent = score;
        document.getElementById("submit-btn").disabled = answeredQuestions.size === 0;
    };

    // Export results to CSV
    window.submitAndExport = function () {
        const csvContent = `Name,Email,Phone,Team,Score\n${localStorage.getItem("userName")},${localStorage.getItem("userEmail")},${localStorage.getItem("userPhone")},${localStorage.getItem("userTeam")},${score}`;
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "results.csv";
        link.click();
    };
});
