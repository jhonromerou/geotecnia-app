
let APIs = {
    unclicc: {
        host: ''
    },

    withPath: (path, apiName) => {
        let host = APIs.unclicc.host
        if (apiName != null) {
            host = this[apiName].host;
        }

        return host + path;
    }
}