({
    appDir: "client",
    baseUrl: "",
    dir: "build",
    modules: [
        {
            name: "main"
        }
    ],
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: true,
        max_line_length: 1000,
        //Custom value supported by r.js but done differently
        //in uglifyjs directly:
        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
        no_mangle: true
    },
})