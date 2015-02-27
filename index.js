module.exports = function(urlCollection, app) {

    for (var i in urlCollection) {
        var url = urlCollection[i];
        if (!url.methods || url.methods.length === 0) {
            app.get(url.pattern, url.view);
        } else {
            for (var i in url.methods) {
                switch (url.methods[i]) {
                    case 'get':
                        app.get(url.pattern, url.view);
                        break;
                    case 'post':
                        app.post(url.pattern, url.view);
                        break;
                    case 'put':
                        app.put(url.pattern, url.view);
                        break;
                    case 'delete':
                        app.delete(url.pattern, url.view);
                        break;
                    case 'all':
                        app.all(url.pattern, url.view);
                        break;
                }
            }
        }
    };
    app.locals.url = function(name, parameters) {
        var baseUrl;
        var urlParameters;
        for (var i in urlCollection) {
            var url = urlCollection[i];
            if (url.name === name ) {
                urlParameters = url.pattern.split(':');
                baseUrl = urlParameters[0].toString();
                break;
            }
        };
        if (parameters == undefined) {
            return baseUrl;
        } else {
            urlParameters.shift();
            var collection = [];
            for (var i in urlParameters) {
                var slugs = urlParameters[i].split('/');
                collection.push(parameters[slugs[0]]);
                slugs.shift();
                for (var i in slugs) {
                    collection.push(slugs[i]);
                }
            }
            return baseUrl+collection.join('/').replace('//', '/');
        }
    };

};