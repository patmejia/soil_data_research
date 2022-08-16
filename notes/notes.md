```sh
brew install r
```

### Step 2: install [RStudio](https://www.rstudio.com/products/rstudio/download/#download)

### Step 3: install [mongolite](https://jeroen.github.io/mongolite/index.html#install-mongolite-in-r)

![rstudio](/images/rstudio_install_package.png)

## cert error

![cert_error](/images/cert_error.png)

## using mMongoDb in r

[How to Use R with MongoDB](https://www.mongodb.com/languages/mongodb-and-r-example)

```R
connection_string = 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/sample_training'
trips_collection = mongo(collection="trips", db="sample_training", url=connection_string)
```

## fixing the cert error with options

```R
trips_collection = mongo(collection="soillab", url=connection_string, options = ssl_options(weak_cert_validation = T))
```

## queries are not working

```R
> trips_collection$count('{}')
Error: not authorized on test to execute command { aggregate: "soillab", cursor: {}, pipeline: [ { $match: {} }, { $group: { _id: 1, n: { $sum: 1 } } } ], $db: "test", lsid: { id: UUID("b1e14775-e7f2-4a2e-9ee5-e58507553e73") } }
> trips_collection$info()
Error: not authorized on test to execute command { serverStatus: 1, $db: "test", lsid: { id: UUID("b1e14775-e7f2-4a2e-9ee5-e58507553e73") } }
> trips_collection$info({})
Error in trips_collection$info({ : unused argument ({
})
> trips_collection$find({limit=10})
Error: argument must be bson or json.
> trips_collection$find(limit=10)
Error: not authorized on test to execute command { find: "soillab", filter: {}, projection: { _id: 0 }, sort: {}, skip: 0, limit: 10, noCursorTimeout: false, $db: "test", lsid: { id: UUID("b1e14775-e7f2-4a2e-9ee5-e58507553e73") } }
>
```

## Studio 3T for Connecting to MongoDB

1. [3T](https://studio3t.com)

![connection string](/images/mongoconn.png)

Install mongoDB:

```
npm install mongodb
```

Verify version:

```
npm list mongodb
```

Step 1: Connect to MongoDB

```
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
```

Step 2: Retrive a list of databases

Step 3:Printing the results to your console

---

---

# Keywords

1. KCl extractable
1. labile soil
1. RMSE (Root Mean Squared Error)
   ML | Mathematical explanation of RMSE and R-squared errorhttps://www.geeksforgeeks.org › ml-mathematical-expl...
   Jun 6, 2022 — RMSE: Root Mean Square Error is the measure of how well a regression line fits the data points. RMSE can also be construed as Standard ...
1. Feature selection

---

---

1. [mongodb](https://soilspectroscopy.github.io/ossl-manual/index.html#ossl-mongodb)

# Tools and Libraries

---

---

# nodejs mongodb certificate error

```
/Users/dev/code/soil_data_research/node_modules/mongodb/lib/utils.js:419
                    throw error;
                    ^

MongoServerSelectionError: certificate has expired
    at Timeout._onTimeout (/Users/dev/code/soil_data_research/node_modules/mongodb/lib/sdam/topology.js:293:38)
    at listOnTimeout (node:internal/timers:564:17)
    at process.processTimers (node:internal/timers:507:7) {
  reason: TopologyDescription {
    type: 'Unknown',
```

# NOTES FOR UPDATING MY RESUME:

Environment, operations, ananitics and mathemacis

# NOTE for code

```
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
  .markdown-body>*:first-child {
    margin-top: 0 !important;
  }
  .markdown-body>*:last-child {
    margin-bottom: 0 !important;
  }
  .markdown-body a {
    color: #00e;
    text-decoration: none;
  }
  .markdown-body a:hover {
    text-decoration: underline;
  }
  .markdown-body hr {
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .markdown-body hr:before {
    display: table;
    content: "";
  }
  .markdown-body hr:after {
    display: table;
    clear: both;
    content: "";
  }
  .markdown-body img {
    max-width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    display: block;
  }
  .markdown-body figure {
    margin: 0;
  }
  .markdown-body figure img {
    margin: 0;
  }
  .markdown-body figure figcaption {
    font-size: 0.9em;
    margin: 0;
  }
  .markdown-body code {
    font-size: 1em;
    margin: 0;
  }
  .markdown-body code:before,
  .markdown-body code:after {
    content: "";
  }
  .markdown-body kbd {
    font-size: 1em;
    padding: 0.2em 0.4em;
    margin: 0;
    /* font-family: monospace; */
    box-sizing: border-box;
  }
  .markdown-body kbd kbd {
    padding: 0;
    font-size: 1em;
    font-weight: bold;
  }
  .markdown-body blockquote {
    margin: 0;
  }
  .markdown-body blockquote *:last-child {
    margin-bottom: 0;
  }
```
