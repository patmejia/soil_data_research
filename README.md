# Soil Data Research

# Hackers News Article On Soil Data
1. [Hackers News](https://news.ycombinator.com/item?id=32293359)
1. [Open Soil Spectral Library
](https://soilspectroscopy.github.io/ossl-manual/)
1. [NIFA Invests Over $7 Million in Big Data, Artificial Intelligence, and Other Cyberinformatics Research](https://www.nifa.usda.gov/about-nifa/press-releases/nifa-invests-over-7-million-big-data-artificial-intelligence-other)
1. [mongodb](https://soilspectroscopy.github.io/ossl-manual/index.html#ossl-mongodb)


# Tools and Libraries
## Install Base R on osx
```sh
brew install r
```
## install RStudio
1. [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
## install monogolite
1. [mongolite](https://jeroen.github.io/mongolite/index.html#install-mongolite-in-r)
![rstudio](images/rstudio_install_package.png)
## cert error
![cert_error](images/cert_error.png)
## using mongodb in r
[How to Use R with MongoDB](https://www.mongodb.com/languages/mongodb-and-r-example)
```R
connection_string = 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/sample_training'
trips_collection = mongo(collection="trips", db="sample_training", url=connection_string)
```
## Studio 3T for Connecting to MongoDB
1. [3T](https://studio3t.com)
- SheetsJS
- article
- MongoDB
- Connect MongoDB with JS

![connection string](./mongoconn.png)

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
