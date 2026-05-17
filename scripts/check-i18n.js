const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'hooks', 'useTranslation.js');
let src = fs.readFileSync(file, 'utf8');
const start = src.indexOf('const dict =');
if (start === -1) {
  console.error('dict not found');
  process.exit(1);
}
src = src.slice(start);
const endMarker = '\n\nexport function useTranslation';
const end = src.indexOf(endMarker);
if (end === -1) {
  console.error('end marker not found');
  process.exit(1);
}
let dictText = src.slice(0, end);
// Convert to module export
const wrapped = dictText.replace(/^const dict =/, 'module.exports =');
// write temp file
const tmp = path.join(__dirname, 'tmp-dict.js');
fs.writeFileSync(tmp, wrapped, 'utf8');
const dict = require(tmp);
fs.unlinkSync(tmp);
const langs = Object.keys(dict);
const allKeys = new Set();
langs.forEach(l => Object.keys(dict[l]).forEach(k => allKeys.add(k)));
const report = {};
langs.forEach(l => {
  report[l] = {
    missing: [],
    extra: [],
  };
});
const all = Array.from(allKeys).sort();
langs.forEach(l => {
  const keys = new Set(Object.keys(dict[l]));
  all.forEach(k => {
    if (!keys.has(k)) report[l].missing.push(k);
  });
  keys.forEach(k => {
    if (!allKeys.has(k)) report[l].extra.push(k);
  });
});
console.log('Languages:', langs.join(', '));
all.forEach(k => {
  const present = langs.map(l => (dict[l][k] ? '✔' : '✖')).join(' ');
  console.log(k.padEnd(40), present);
});
console.log('\nSummary per language:');
console.log(JSON.stringify(report, null, 2));
