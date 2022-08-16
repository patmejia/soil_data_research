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

```

<!-- <!================================================-->
<!-- Start: Styles                                     -->
<!-- <!================================================-->

<style type="text/css">
  :root {
  --color-aware: #408f9f;
  --color-focus: #f69902;
  --color-alert: #ff4800;
  --color-text: #ddd;
  --color-subtext: #bbb;
  --color-border: #ddd;
  --color-shadow: #444;
  --color-background: black;
  }

  @font-face {
    font-family: "Ibmplexmono";
    src: url(fonts/IBMPlexMono_base64.txt) format("truetype");
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
  }
  .markdown-body h1 {
    font-size: 2em;
  }
  .markdown-body h2 {
    font-size: 1.5em;
  }
  .markdown-body h3 {
    font-size: 1.25em;
  }
  .markdown-body h4 {
    font-size: 1em;
  }
  .markdown-body h5 {
    font-size: 0.875em;
    font-family: "Ibmplexmono";
    color: var(--color-aware);
  }
  .markdown-body h6 {
    font-size: 0.85em;
  }
/* ==================================== */
/* <a> tag, links                       */
/* ==================================== */
  .markdown-body a {
    color: var(--color-aware);
    text-decoration: none;
  }
  .markdown-body a:hover {
    text-decoration: underline;
  }


  .markdown-body ol,
  .markdown-body ul {
    padding-left: 2em;
    margin-top: 0;
    margin-bottom: 0;
  }
/* ==================================== */
/* remove line after h1 or #            */
/* ==================================== */
  .markdown-body h1 {
    border-bottom: none;
  }


  .markdown-body ol ol,
  .markdown-body ul ol {
    list-style-type: lower-roman;
  }
  .markdown-body ol ol ol,
  .markdown-body ol ul ol,
  .markdown-body ul ol ol,

  .markdown-body ol ul ul,
  .markdown-body ul ul ul {
    list-style-type: lower-alpha;
  }
  .markdown-body dd {
    margin-left: 0;
  }
  .markdown-body code {
    /* font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace; */
  }
  .markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .markdown-body pre>code {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
    /* font-family: Consolas, " */
    .markdown-body pre {
      background: #f5f5f5;
      border: 300px solid #ccc;
      border-radius: 3px;
      padding: 10px;
    }
  }
      /* align .caption content left */
    .markdown-body .caption {
      text-align: left;
    }

.markdown-body .makes_columns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
}

.markdown-body .makes_columns_container {
  flex-direction: column;
  display: flex;
}


</style>
```

> <img src="images/sandVSsom_screen.png" alt="Soil samples" width="100%">
> <a href="https://youtu.be/QVOx4oFugts">  Image Source</a>

> - The Left samples are 100% sand, 0% clay.
> - The Right samples are illite clay soil samples; thus, they appear brighter in color.
> - The Bottom samples have no organic matter
> - The Top samples have very little organic matter; thus, they appear darker.

# WIP --> Building a Data Pipeline

Because the VSC are long files, we decided to build a data pipeline to stream the data using SQLite:

```sql
=============
=============
```

And we used this SQL to query behind the web server:

```sql
=============
=============
```

Then we connected the database to [PyScript](https://github.com/pyscript/pyscript) and called the soil database with this code:

```python
=============
=============
```

We use [D3](htt`ps://react-d3-library.github.io/) to build this globe based on some modified instructions and added [Uber/h3](https://github.com/uber/h3), a hexagonal grid to partition the globe into hexagons (and a few pentagons).

Here is a link to the JSON file:

D3 plot and PyScript plot
