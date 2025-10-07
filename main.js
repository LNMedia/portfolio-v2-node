const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 4000;

// Ordner-Struktur
const logsDir = path.join(__dirname, 'logs');
const certificatesDir = path.join(__dirname, 'resources/docs/certificates');
const galleryDir = path.join(__dirname, 'resources/images/gallery');

// Statische Dateien bereitstellen
app.use('/db', express.static(path.join(__dirname, 'database')));
app.use('/styles', express.static(path.join(__dirname, 'resources/stylesheets')));
app.use('/scripts', express.static(path.join(__dirname, 'resources/scripts')));
app.use('/content', express.static(path.join(__dirname, 'resources/content')));
app.use('/docs', express.static(path.join(__dirname, 'resources/docs')));
app.use('/images', express.static(path.join(__dirname, 'resources/images')));

// Helper-Funktion: Deutscher Zeitstempel
function getGermanTimestamp(){return new Date().toLocaleString("de-DE",{timeZone:"Europe/Berlin",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(",","")}

// Statistik aktualisieren
function updateStatistics(e,t,r,i,s){let l=s.getFullYear(),a=path.join(logsDir,`statistics-${l}.log`),n={total:0,referrers:{},devices:{},browsers:{},daily:{},monthly:{}};if(fs.existsSync(a))try{n=JSON.parse(fs.readFileSync(a,"utf8"))}catch(o){console.error("Fehler beim Parsen der Statistikdatei:",o)}let c=s.toISOString().split("T")[0],y=s.toISOString().substring(0,7);n.total++,n.referrers[e]=(n.referrers[e]||0)+1,n.devices[r]=(n.devices[r]||0)+1,n.browsers[i]=(n.browsers[i]||0)+1,n.daily[c]=(n.daily[c]||0)+1,n.monthly[y]=(n.monthly[y]||0)+1,fs.writeFileSync(a,JSON.stringify(n,null,2))}

// Alte Logs aufräumen (älter als 6 Monate)
function cleanupOldLogs(){let e=new Date;fs.readdir(logsDir,(n,r)=>{if(n)return console.error("Fehler beim Lesen des Logs-Verzeichnisses:",n);r.forEach(n=>{if(/^user-access-\d{2}-\d{4}\.log$/.test(n)){let[r,t]=n.match(/\d+/g).map(Number),l=new Date(t,r-1),s=(e.getFullYear()-l.getFullYear())*12+e.getMonth()-l.getMonth();s>6&&fs.unlink(path.join(logsDir,n),()=>{})}})})}

// Dashboard anzeigen
app.get("/dashboard", (req, res) => {
  const filePath = path.join(logsDir, `statistics-${new Date().getFullYear()}.log`);
  if (!fs.existsSync(filePath)) return res.send("<h1 style='color: #eee; background: #121212; padding: 2rem;'>Keine Statistiken gefunden.</h1>");

  const stats = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const mostUsed = (obj) =>
    Object.entries(obj).reduce((a, b) => (a[1] > b[1] ? a : b), ["-", 0])[0];

  const dailyLabels = Object.keys(stats.daily).map(date => `'${date}'`).join(",");
  const dailyData = Object.values(stats.daily).join(",");

  const monthlyLabels = Object.keys(stats.monthly).map(month => `'${month}'`).join(",");
  const monthlyData = Object.values(stats.monthly).join(",");

  const referrerTable = Object.entries(stats.referrers)
    .sort((a, b) => b[1] - a[1])
    .map(([ref, count]) => `<tr><td>${ref}</td><td>${count}</td></tr>`)
    .join("");

  const html = `
  <!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="UTF-8">
    <title>Andreas Reimann | Statistik</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #121212;
        color: #e0e0e0;
      }
      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #ffffff;
      }
      .stat-container {
        background: #1e1e1e;
        padding: 1.5rem;
        border-radius: 12px;
        max-width: 1000px;
        margin: auto;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
      }
      .stat {
        margin: 1rem 0;
        font-size: 1.1rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        background-color: #2a2a2a;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .stat-label {
        font-weight: 600;
        color: #bbbbbb;
      }
      .stat-value {
        color: #ffffff;
      }
      .chart-box {
        margin-top: 2rem;
      }
      table {
        width: 100%;
        margin-top: 2rem;
        border-collapse: collapse;
        background-color: #1e1e1e;
        color: #e0e0e0;
      }
      table th, table td {
        padding: 0.75rem;
        border-bottom: 1px solid #333;
        text-align: left;
      }
      table th {
        background-color: #2a2a2a;
      }
      footer {
        margin-top: 3rem;
        text-align: center;
        color: #666;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <div class="stat-container">
      <h1>📊 Website Statistik</h1>

      <div class="stat">
        <span class="stat-label">Total User Access:</span>
        <span class="stat-value">${stats.total}</span>
      </div>

      <div class="stat">
        <span class="stat-label">Most Used Referrer:</span>
        <span class="stat-value">${mostUsed(stats.referrers)}</span>
      </div>

      <div class="stat">
        <span class="stat-label">Most Used Device:</span>
        <span class="stat-value">${mostUsed(stats.devices)}</span>
      </div>

      <div class="stat">
        <span class="stat-label">Most Used Browser:</span>
        <span class="stat-value">${mostUsed(stats.browsers)}</span>
      </div>

      <div class="stat">
        <span class="stat-label">Average Daily Access:</span>
        <span class="stat-value">${(stats.total / Object.keys(stats.daily).length).toFixed(2)}</span>
      </div>

      <div class="stat">
        <span class="stat-label">Average Monthly Access:</span>
        <span class="stat-value">${(stats.total / Object.keys(stats.monthly).length).toFixed(2)}</span>
      </div>

      <div class="chart-box">
        <canvas id="dailyChart" height="100"></canvas>
      </div>
      <div class="chart-box">
        <canvas id="monthlyChart" height="100"></canvas>
      </div>

      <h2>Live Referrer-Tabelle</h2>
      <table>
        <thead>
          <tr><th>Referrer</th><th>Anzahl</th></tr>
        </thead>
        <tbody>
          ${referrerTable}
        </tbody>
      </table>
    </div>

    <footer>© 2025 Andreas Reimann</footer>

    <script>
      const dailyCtx = document.getElementById('dailyChart').getContext('2d');
      const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');

      new Chart(dailyCtx, {
        type: 'line',
        data: {
          labels: [${dailyLabels}],
          datasets: [{
            label: 'Tägliche Zugriffe',
            data: [${dailyData}],
            borderColor: '#4fc3f7',
            backgroundColor: 'rgba(79, 195, 247, 0.1)',
            fill: true
          }]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: '#e0e0e0' } } }, scales: { x: { ticks: { color: '#aaa' } }, y: { ticks: { color: '#aaa' } } } }
      });

      new Chart(monthlyCtx, {
        type: 'bar',
        data: {
          labels: [${monthlyLabels}],
          datasets: [{
            label: 'Monatliche Zugriffe',
            data: [${monthlyData}],
            backgroundColor: '#81c784'
          }]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: '#e0e0e0' } } }, scales: { x: { ticks: { color: '#aaa' } }, y: { ticks: { color: '#aaa' } } } }
      });
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

// API: Bildergalerie
app.get("/get-images",(e,s)=>{fs.readdir(galleryDir,(e,i)=>{if(e)return s.status(500).send("Fehler beim Lesen des Verzeichnisses");let t=i.filter(e=>/\.(jpg|jpeg|png|gif|webp)$/i.test(e));s.json(t)})});

// API: Zertifikate
app.get("/get-certificates",(e,t)=>{fs.readdir(certificatesDir,(e,r)=>{if(e)return t.status(500).send("Serverfehler");let i=r.filter(e=>/\.(jpg|jpeg|png|webp)$/i.test(e));t.json(i)})});

// Logging & Interface-Ausgabe
app.get("*",(e,r)=>{fs.existsSync(logsDir)||fs.mkdirSync(logsDir);let t=new Date,n=path.join(logsDir,`user-access-${String(t.getMonth()+1).padStart(2,"0")}-${t.getFullYear()}.log`);e.headers["x-forwarded-for"]||e.socket.remoteAddress;let s=e.get("Referer")||"Direct Access",i=e.get("User-Agent")||"Unknown",o=/mobile/i.test(i)?"Mobile":"Desktop",a=i.match(/(Firefox|Chrome|Safari|Opera|Edg|Brave)/i),c=a?a[0]:"Unknown",d=`[\${getGermanTimestamp()}] \${ip} accessed website
Referrer: \${referrer}
User-Agent: \${userAgent}

`;fs.appendFile(n,d,e=>{e&&console.error("Fehler beim Schreiben des Logs:",e)}),updateStatistics(s,i,o,c,t),cleanupOldLogs(),r.sendFile(path.join(__dirname,"interface.html"))});

// Cache-Header deaktivieren
app.use((e,a,o)=>{a.setHeader("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),o()});

app.listen(port,()=>{console.log(`Online on http://localhost:${port}`)});
