require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // allow large base64 screenshots
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts',      require('./routes/posts'));
app.use('/api/checkins',   require('./routes/checkins'));
app.use('/api/ideas',      require('./routes/ideas'));
app.use('/api/overview',   require('./routes/overview'));
app.use('/api/screenshot', require('./routes/screenshot'));
app.use('/api/migrate',    require('./routes/migrate'));

app.get('/health', (req, res) => res.json({ ok: true }));

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`anna.exe server running on http://localhost:${PORT}`));
}

module.exports = app;
