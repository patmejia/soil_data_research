#####################################################################
#This file explores the trips_collection of sample_training database#
#####################################################################

#install the mongolite package
install.packages("mongolite")

# import it into our file
library(mongolite)

# This is the connection_string. You can get the exact url from your mongodb cluster screen
connection_string = 'mongodb+srv://<username>:<pwd>@<cluster-name>.mongodb.net/sample_training'

# get the data by specifying the database name, collection and connection url
trips_collection = mongo(collection="trips", db="sample_training", url=connection_string)

# Get the count to verify if the collection is loaded
trips_collection$count()

# Get the first 5 longest rides
trips_collection$find(sort = '{"tripduration" : -1}' , limit = 5)

# Get any one document by iterating through the cursor
trips_collection$iterate()$one()

# How many subscribers took trips of duration > 500 seconds and returned to same station where they started?
query = trips_collection$find('{"usertype":"Subscriber","tripduration":{"$gt":500},"$expr": {"$eq": ["$start station name","$end station name"]}}')

# View the number of rows returned
nrow(query)

# Which usertype is more - customer or subscriber?

# Install these for plotting
install.packages("tidyverse", dependencies=T)
install.packages("lubridate")
install.packages("ggplot2")

library(tidyverse)
library(lubridate)
library(ggplot2)

# Query to get the count of users of each type
user_types = trips_collection$aggregate('[{"$group":{"_id":"$usertype", "Count": {"$sum":1}}}]')

# To use ggplot, convert the results into dataframe
df <- as.data.frame(user_types)

# Plot the bar
ggplot(df,aes(x=reorder(`_id`,Count),y=Count))+
  geom_bar(stat="identity",color='yellow',fill='#FFC300')+geom_text(aes(label = Count), color = "red") +coord_flip()+xlab("User 
  sType")


soilspec4gg.init()
