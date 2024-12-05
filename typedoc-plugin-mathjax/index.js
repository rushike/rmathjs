const { Application, JSX, Renderer } = require("typedoc");
const fs = require("fs");
const path = require("path");



module.exports.load = function load(app) {
    
    app.renderer.hooks.on("head.end", () => {
        const sc =
            JSX.createElement(
                "script", 
                { id:"MathJax-script",  src:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"},
            )
        return  JSX.createElement(JSX.Fragment, null, [sc]);
    });

    /**
     * This copies the sc.js file to doc assets dir,which will be then used 
     * by html generated to align equation left
     */
    app.renderer.on(Renderer.EVENT_END, (context) => {
        const jsDir = "typedoc-plugin-mathjax";
        const jsFileName = "sc.js"; 

        const jsFilePath = path.join(jsDir, jsFileName);

        const outputDir = context.outputDirectory;
        const destPath = path.join(outputDir, "assets", jsFileName);

        if (fs.existsSync(jsFilePath)) {
          fs.copyFileSync(jsFilePath, destPath);
          app.logger.info(`[typedoc-plugin-mathjax] Copied ${jsFilePath} to output.`);
        } else {
          app.logger.warn(`[typedoc-plugin-mathjax] not found at ${jsFilePath}.`);
        }
      });

    app.renderer.hooks.on("body.end", () => {
        const st =JSX.createElement(
            "script", 
            { id:"MathJax-script",  src:"./../assets/sc.js"},
        );
        return st;
    });
}