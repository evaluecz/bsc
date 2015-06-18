exports.config = {

    capabilities: {
        'browserName': 'chrome' 
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },

    specs: [
        'addNote-spec.js'
    ],

    seleniumAddress: 'http://localhost:4444/wd/hub',

};