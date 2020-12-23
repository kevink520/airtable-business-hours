const express = require('express');
const path = require('path');
const base = require('airtable').base('app5LznoARFjt0MpW');

const app = express();
const dir = path.join(__dirname, 'img');
app.use(express.static(dir));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '.'));

let records;
app.get('/', async (req, res) => {
  if (records) {
    res.render('page', { records });
  } else {
    records = await base('Business Hours')
      .select({ view: 'Grid view' })
      .firstPage();
    res.render('page', { records });
    setTimeout(() => {
      records = null;
    }, 10 * 1000);
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server ready'));
