install.packages("rjson")
library(rjson)
library(jsonlite)
wasabi <- fromJSON(txt="C:/Users/user/Downloads/wasabi-artist.json")
df <- data.frame(matrix(unlist(wasabi), nrow=77492, ncol = 53),stringsAsFactors=FALSE)
names(df)[6]="gender"
names(df)[2]="disambiguation"
names(df)[1]="_id"
names(df)[7]="genres"
names(df)[14]="country"

library(tidyverse)
ndf= df %>% 
  select(c("_id", "genres", "gender", "disambiguation", "country")) 

ndf$gender <- as.character(ndf$gender)
ndf$gender[ndf$gender==""] <- NA
ndf$gender <- as.factor(ndf$gender)

ndf$disambiguation <- as.character(ndf$disambiguation)
ndf$disambiguation[ndf$disambiguation==""] <- NA
ndf$disambiguation <- as.factor(ndf$disambiguation)

ndf$genres <- as.character(ndf$genres)
ndf$genres[ndf$genres=="[]"] <- NA
ndf$genres <- as.factor(ndf$genres)

summary(ndf)
ndf['type_of_artist'] <- NA

ndf$type_of_artist[grepl("Band|band|bands|Bands", ndf$disambiguation)] <- 'Band'
ndf$type_of_artist[grepl("Duet|duet|duets|Duets", ndf$disambiguation)] <- 'Duet'
ndf$type_of_artist[grepl("artist|Artist|Artists|artists", ndf$disambiguation)] <- 'Artist'
ndf$type_of_artist[grepl("Male", ndf$gender)] <- 'Male artist'
ndf$type_of_artist[grepl("Female", ndf$gender)] <- 'Female artist'
ndf$type_of_artist[grepl("Other", ndf$gender)] <- 'Unknown artist'
ndf$type_of_artist[is.na(ndf$type_of_artist)] <- 'Unknown '
table(ndf$type_of_artist)
table(ndf$genres)
table(ndf$country)
ndf %>%
  ggplot(aes(country,type_of_artist)) +
  geom_jitter(aes(col=type_of_artist))+
  theme(axis.text.x = element_blank())

top_countries=sort(table(ndf$country),decreasing=TRUE)[1:10]
top_genres=sort(table(ndf$genres),decreasing=TRUE)[1:10]
