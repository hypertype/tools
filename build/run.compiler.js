module.exports = function runCompiler(compiler) {
    if (process.argv.filter(t => /watch/.test(t))){
        compiler.watch({}, (err, stats) => {
            const info = stats.toJson("minimal");
            if (info.errors.length) {
                console.error(info.errors);
                // Handle errors here
            }
            if (info.warnings.length) {
                console.warn(...info.warnings)
            }
            console.log(stats.toString())
            // Done processing
        })
    }else{
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                // Handle errors here
            }
            // Done processing
        })
    }
};