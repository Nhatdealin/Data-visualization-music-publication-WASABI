library(readr)
library(dplyr)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")

albums <- read_csv('data/wasabi_albums.csv')
artists <- read_csv('data/wasabi_artists.csv')
head(album$dateRelease)
colnames(artists)
filter_albums <- albums %>% 
  select(c("_id", "genre", "id_artist", "length", "name", "publicationDate")) %>%
  filter(publicationDate == 1997 && !is.null(`_id`))


filter_artists <- artists %>% 
  select(c("_id", "genres", "name", "location.country", "gender")) %>%
  filter(!is.null(`_id`)) 

names(filter_artists)[3] = "artist_name"
new_data <- filter_albums %>% left_join(filter_artists, by=c("id_artist"="_id"))
summary(new_data)
