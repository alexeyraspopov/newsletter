rollup --format cjs --config rollup.config.js modules/Newsletter.js > newsletter.js
rollup --format es --config rollup.config.js modules/Newsletter.js > newsletter.module.js
cp typings/newsletter.js.flow newsletter.js.flow
