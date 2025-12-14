"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files from the "public" folder
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
// Optional: explicit redirect from "/" to "login.html"
app.get('/', (req, res) => {
    res.redirect('/login.html');
});
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
