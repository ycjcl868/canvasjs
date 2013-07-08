# CanvasJS

CanvasJS is an easy to use JavaScript & HTML5 Charts library built on Canvas element. It runs across devices including iPhone, iPad, Android, Windows Phone, Microsoft Surface, Desktops, etc. This allows you to create rich dashboards that work on all the devices without compromising on maintainability or functionality of your web application. CanvasJS comes with beautiful themes and is over 10x faster than conventional Flash and SVG Charts – resulting in lightweight, beautiful and responsive dashboards.

## Disclaimer

I am not the owner of the repository, The original can be found at [http://canvasjs.com](http://canvasjs.com). It was released as [CC](http://creativecommons.org/licenses/by-nc/3.0/deed.en_US) for personal use and it needs to be licensed under commerical use - see terms [here](http://canvasjs.com/license-canvasjs/). This repository only addresses issues of code quality and leaking globals in the hope that the author pulls it and merges it with thier upstream.

## Issues

This repo represents code quality fixes, including nearly 100 JSHINT issues, ranging from unused variables, missing or surplus semi colons, confusing code, bugs in tooltip colour implementations and the correction and removal of 10 global variables that were leaked inadvertently:
```
// globals fixed
["currentTheme","prop","type","fontSize","decimalSeparator","digitGroupSeparator","i","textBlock","text","labelEffectiveWidth","color"]
```

This version also exports itself as an AMD module if RequireJS or similar loader is available.

Additionally, a `.jshintrc` that passes has been added with reasonable directives and `use strict` is enforced.

In spite of all the fixes, the lack of functional tests I have means I cannot guarantee this version has not broken functionality I was not aware of or chart types I have not personally used. It seems to work fine with line/sline/area chart and the likes, which is what I needed.

I am *NOT* going to be supporting this so use at your own risk. It does seem very fast for the actual rendering.