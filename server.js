const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const USERNAME = "Abxcb";
const PASSWORD = "AbxcbTop";

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
});

// Local testing only — does NOT send real SMS.
app.post("/api/test", async (req, res) => {
    const { number, amount } = req.body;

    if (!number) {
        return res.status(400).json({
            success: false,
            message: "Target number is required."
        });
    }

    const count = Math.min(Math.max(Number(amount) || 1, 1), 10);

    await new Promise(resolve => setTimeout(resolve, 500));

    res.json({
        success: true,
        mode: "LOCAL TEST",
        number,
        requested: count,
        message: `Simulated ${count} test message(s). No real SMS was sent.`
    });
});

// Serve website
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log("=================================");
    console.log("        ABXCB WEBSITE");
    console.log("=================================");
    console.log(`Website: http://localhost:${PORT}`);
    console.log("Server is running.");
});