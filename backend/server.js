const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());

app.get("/steam-community", async (req, res) => {
    try {
        const { name } = req.query;
        const response = await axios.get(`https://steamcommunity.com/actions/SearchApps/${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error trying to get appid from steam-community: " + error });
    }
});

app.get("/steam-store", async (req, res) => {
    try {
        const { appid } = req.query;
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error trying to get gameData from steam-store: " + error });
    }
});

const frontendPath = path.join(__dirname, "../frontend/dist/indie-world/browser");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));