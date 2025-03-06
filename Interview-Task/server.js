const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

const soldCells = [2, 14, 159, 265,333,355,1000,3,5,7];

app.get('/api/sold-cells', (req, res) => {
  res.json(soldCells);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor: http://localhost:${PORT}`);
});
