require('dotenv').config();
const express = require('express');

const app = express();
app.use(require('cors')());
app.use(express.json({ limit: '50mb' }));

app.use('/api/posts',      require('./routes/posts'));
app.use('/api/checkins',   require('./routes/checkins'));
app.use('/api/ideas',      require('./routes/ideas'));
app.use('/api/overview',   require('./routes/overview'));
app.use('/api/screenshot', require('./routes/screenshot'));

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`anna.exe backend running on :${PORT}`));
