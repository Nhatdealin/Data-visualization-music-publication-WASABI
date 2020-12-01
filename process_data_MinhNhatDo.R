library(readr)
library(dplyr)
library(data.table)
library(ggplot2)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")
f <- function(x, pos){
  subset(x,select=c())
  return(x %>% select(c()))
}
country <- read_csv('data/country.csv')
albums <- fread('data/wasabi_albums.csv', select=c("_id", "genre", "id_artist", "length", "name", "country"))
artists <- read_csv('data/wasabi_artists.csv')
songs <- fread('data/wasabi_songs.csv', header=TRUE, 
               select=c("_id", "id_album", "name", "language", "publicationDateAlbum"), 
               verbose=TRUE, blank.lines.skip=T)
head(album$dateRelease)
colnames(artists)
filter_artists <- artists %>% 
  select(c("_id", "genres", "name", "location.country", "gender")) %>%
  filter(!is.null(`_id`)) 

names(filter_artists)[3] = "artist_name"
albums <- albums %>% 
  filter(country != "") %>% 
  left_join(country, by=c("country"="Code")) %>%
  select(-country) %>%
  rename(country=Name) %>% filter(!is.na(country))
new_data <- songs %>% inner_join(albums, by=c("id_album"="_id"))
summary(new_data)

new_data$publicationDateAlbum <- as.numeric(new_data$publicationDateAlbum)
new_data <- filter(new_data, !is.na(publicationDateAlbum))
data <- new_data %>% 
  group_by(country,publicationDateAlbum) %>% 
  summarise(count = n_distinct(`_id`))
data
write.csv(data, "./song_count_by_country_date.csv", row.names=FALSE)
data %>% ggplot() + geom_point(aes(x=publicationDateAlbum, y=count, col=country)) + ggtitle("Plot scatter date and count song publication")
