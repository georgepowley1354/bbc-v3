/* Fix script: removes duplicate CSS links and fixes script load order in all 5 pages */
const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/georg/my-project';

const pages = [
  'krismidcity-index.html',
  'krismidcity-menu.html',
  'krismidcity-events.html',
  'krismidcity-gallery.html',
  'krismidcity-about.html'
];

pages.forEach(function(name) {
  var html = fs.readFileSync(path.join(BASE, name), 'utf8');

  // 1. Remove duplicate kris-shared.css link (keep only first)
  var cssLink = '<link rel="stylesheet" href="kris-shared.css">';
  var firstIdx = html.indexOf(cssLink);
  if (firstIdx !== -1) {
    var after = html.indexOf(cssLink, firstIdx + cssLink.length);
    while (after !== -1) {
      html = html.slice(0, after) + html.slice(after + cssLink.length).replace(/^\n/, '');
      after = html.indexOf(cssLink, firstIdx + cssLink.length);
    }
  }

  // 2. Fix script ordering: ensure kris-data.js and kris-admin.js load FIRST
  // Find all <script src="kris-data.js"> and <script src="kris-admin.js"> tags (may be duplicated)
  var dataTag = '<script src="kris-data.js"></script>';
  var adminTag = '<script src="kris-admin.js"></script>';
  var sharedBlock = '  <script src="kris-data.js"></script>\n  <script src="kris-admin.js"></script>';

  // Remove ALL occurrences of these script tags
  html = html.split(dataTag).join('');
  html = html.split(adminTag).join('');
  // Remove any double blank lines left behind
  html = html.replace(/\n\n\n+/g, '\n\n');

  // 3. Re-insert the shared scripts block RIGHT BEFORE the first render script
  // Find the first <script> block that references KMCData
  var firstKMCScript = html.indexOf('<script>\n  (function(){');
  if (firstKMCScript === -1) firstKMCScript = html.indexOf('<script>\n(function(){');

  if (firstKMCScript !== -1) {
    html = html.slice(0, firstKMCScript) + sharedBlock + '\n' + html.slice(firstKMCScript);
  } else {
    // Fallback: inject before </body>
    html = html.replace('</body>', sharedBlock + '\n</body>');
  }

  // 4. Remove duplicate announcement scripts (keep last one, which runs after data.js)
  var annScript = '<script>\n  (function(){\n    var bar = document.getElementById(\'kmc-ann-bar\');\n    if (!bar || typeof KMCData === \'undefined\') return;\n    var anns = KMCData.get(\'announcements\').filter(function(a){ return a.active; });\n    if (anns.length) { bar.textContent = anns[0].text; }\n  })();\n  </script>';
  // Count occurrences
  var annCount = (html.match(/<script>\s*\(function\(\)\{\s*var bar = document\.getElementById\('kmc-ann-bar'\)/g) || []).length;
  if (annCount > 1) {
    // Remove all occurrences, then add one at the end before </body>
    html = html.replace(/<script>\s*\(function\(\)\{\s*var bar = document\.getElementById\('kmc-ann-bar'\);[\s\S]*?\}\)\(\);\s*<\/script>/g, '');
    html = html.replace('</body>',
      '  <script>\n  (function(){\n    var bar = document.getElementById(\'kmc-ann-bar\');\n    if (!bar || typeof KMCData === \'undefined\') return;\n    var anns = KMCData.get(\'announcements\').filter(function(a){ return a.active; });\n    if (anns.length) { bar.textContent = anns[0].text; }\n  })();\n  </script>\n</body>');
  }

  fs.writeFileSync(path.join(BASE, name), html, 'utf8');
  console.log('Fixed: ' + name);
});
