library(readr)
library(dplyr)
library(data.table)
library(ggplot2)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")
f <- function(x, pos){
  subset(x,select=c())
  return(x %>% select(c()))
}
albums <- fread('data/wasabi_albums.csv', select=c("_id", "genre", "id_artist", "length", "name", "country"))
artists <- read_csv('data/wasabi_artists.csv')
songs <- fread('data/wasabi_songs.csv', header=TRUE, 
               select=c("_id", "id_album", "name", "language", "publicationDateAlbum"), 
               verbose=TRUE, blank.lines.skip=T)
head(album$dateRelease)
colnames(artists)
filter_albums <- albums %>% 
  select() %>%
  filter(publicationDate == 1997 && !is.null(`_id`))


filter_artists <- artists %>% 
  select(c("_id", "genres", "name", "location.country", "gender")) %>%
  filter(!is.null(`_id`)) 

names(filter_artists)[3] = "artist_name"
new_data <- songs %>% left_join(albums, by=c("id_album"="_id"))
summary(new_data)

new_data$publicationDateAlbum <- as.numeric(new_data$publicationDateAlbum)
data <- new_data %>% 
  filter(country != "") %>% 
  group_by(country,publicationDateAlbum) %>% 
  summarise(count = n_distinct(`_id`))
data
data %>% filter(count > 50) %>% ggplot() + geom_point(aes(x=publicationDateAlbum, y=count, col=country)) + ggtitle("Plot scatter date and count song publication")
