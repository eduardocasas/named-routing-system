# Named Routing System
Another named routing system for [express.js](http://expressjs.com/). This system is inspired by [Django's](https://docs.djangoproject.com/en/dev/topics/http/urls/).

## Features

* Prevents url hard-coding
* Clean and user friendly URL Mapping
* Works in both middlewares and templates
* Lightweight module without dependencies

## Install

```
npm install named-routing-system
```

## Usage

**Configuration**

```javascript
// app.js

var urlMapping = require('named-routing-system');
var routing = require('./url');
urlMapping(routing.url_collection, app);
```

**URL generation**

```javascript
// url.js

var home = require('./routes/home');
var user = require('./routes/user');

exports.url_collection = [
    { pattern: '/', view: home.index, name: 'home.index' },
    { pattern: '/user', view: user.collection, name: 'user.collection' },
    { pattern: '/user/:id', view: user.display, name: 'user.display', methods: ['get'] },
    { pattern: '/user/:id', view: user.update, name: 'user.update', methods: ['post'] },
    ...
];
```

**Middleware files**

```javascript
//routes/home.js

exports.index = function(req, res) {
    res.render('home');
};
```

**Template files**

```javascript
//views/home.jade

a(href="#{url('user')}") User Collection
a(href="#{url('user.display', { id: 'user_id' })}") Display User Profile
```
