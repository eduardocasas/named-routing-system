var routes = function(urlCollection, app) {

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
    app.locals.url = function(name) {
        for (var i in urlCollection) {
            var url = urlCollection[i];
            if (url.name === name ) {
            var urlBase = url.pattern.split(':');
                return urlBase[0].toString();
            }
        };
    };

};

module.exports = exports = routes;