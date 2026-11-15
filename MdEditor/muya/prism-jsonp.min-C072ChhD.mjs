// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-jsonp.min.js
Prism.languages.jsonp = Prism.languages.extend("json", { punctuation: /[{}[\]();,.]/ }), Prism.languages.insertBefore("jsonp", "punctuation", { function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/ });
