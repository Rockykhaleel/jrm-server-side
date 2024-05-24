const connection = require("./models/db_connection");
const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use("/api/user", require("./routes/user_routes"));

app.use("/api/makatib", require("./routes/user_makatib"));

app.use("/api/masajid", require("./routes/user_masajid"));

app.use("/api/jalsa", require("./routes/user_jalsa"));

app.use("/api/darul", require("./routes/user_darul"));

app.use("/api/lib", require("./routes/user_library"));

app.use("/api/ulama", require("./routes/user_ulama"));

app.use("/api/women", require("./routes/user_womench"));

app.use("/api/masjidcons", require("./routes/user_masjidcons"));

app.use("/api/meeting", require("./routes/user_meeting"));

app.use("/api/competions", require("./routes/user_competions"));

app.use("/api/trips", require("./routes/user_trips"));

app.use("/api/social", require("./routes/user_social"));

app.use("/api/online", require("./routes/user_online"));

app.use("/api/school", require("./routes/user_school"));

app.use("/api/future", require("./routes/user_future"));

app.use("/api/other", require("./routes/user_other"));

app.use("/api/markazcon", require("./routes/user_markazcon"));

app.use("/api/report", require("./routes/user_report"));

app.use("/api/ask", require("./routes/user_suggestions"));

app.use("/api/annual", require("./routes/user_annual"));

app.use("/api/ann", require("./routes/user_AllYears"));

app.use("/api/admin", require("./routes/admin_Dashboard"));

app.use("/api/upload", require("./routes/upload_image"));

app.use("/Uploads", express.static(path.join(__dirname, "./Uploads")));

app.listen("8080", () => {
  console.log("Server Started...");
});
