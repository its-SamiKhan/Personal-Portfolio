const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The regex needs to find things like:
// <div class="skill-box" data-aos="fade-right" data-aos-delay="300">
// and replace with:
// <div data-aos="fade-right" data-aos-delay="300"><div class="skill-box">
// But wait, we also have to add a closing </div> at the end of the element.
// This is easily done using a simple HTML parser like cheerio or jsdom.
// Since we don't have them installed guaranteed, let's use exact string replacements!

console.log("Starting replacements");
