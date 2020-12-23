library(readr)
library(dplyr)
library(data.table)
library(ggplot2)
library(stringr)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")
f <- function(x, pos){
  subset(x,select=c())
  return(x %>% select(c()))
}
# country_code <- read_csv("./data/country-codes.csv")
# country <- read_csv('./data/country.csv')
# country_code <- country_code %>% left_join(country, by=c("ISO 3166"="Alpha-2 code")) %>%
#   rename(code_2=`ISO 3166`, code=`Alpha-3 code`, name=`English short name lower case`)
# write.csv(country_code, "./data/country_code.csv", row.names=FALSE)
albums <- fread('data/wasabi_albums.csv', select=c("_id", "genre", "id_artist", "length", "name", "country", "publicationDate"))
artists <- read_csv('data/wasabi_artists.csv')
songs <- fread('data/wasabi_songs.csv', header=TRUE, 
               select=c("_id", "id_album", "name", "language", "publicationDateAlbum"), 
               verbose=TRUE, blank.lines.skip=T)

filter_artists <- artists %>% 
  select(c("_id", "genres", "name", "location.country", "gender", "lifeSpan.begin")) %>%
  filter(!is.null(`_id`) & !is.na(location.country) & !is.na(lifeSpan.begin)) 

names(filter_artists)[3] = "artist_name"
names(filter_artists)[4] = "country"
names(filter_artists)[6] = "begin"
filter_artists$begin = substring(filter_artists$begin, 0 , 4)
filter_artists %>% filter(!is.na(begin))
filter_artists$begin <- as.numeric(filter_artists$begin)
albums <- albums %>% 
  filter(country != "") %>% filter(!is.na(country) & !is.na(publicationDate))

names(albums)[7] = "year"
albums$year <- as.numeric(albums$year)


new_artist <- filter_artists %>% group_by(country, begin) %>% summarise(count_artist = n_distinct(`_id`))
new_artist$begin <- as.numeric(new_artist$begin)

new_album <- albums %>% group_by(country, year) %>% summarise(count_album = n_distinct(`_id`))

new_data <- songs %>% inner_join(albums, by=c("id_album"="_id"))
summary(new_data)

new_data$publicationDateAlbum <- as.numeric(new_data$publicationDateAlbum)


new_data <- filter(new_data, !is.na(publicationDateAlbum))
data <- new_data %>% 
  group_by(country,publicationDateAlbum) %>% 
  summarise(count_song = n_distinct(`_id`))
data

country <- read_csv('./data/country_code.csv')

data <- data %>% left_join(country, by=c("country"="FIPS 10-4")) %>%
  select(c('code', 'name', 'code_2', 'count_song', 'publicationDateAlbum'))


data <- data %>% 
  left_join(new_album, by=c("country"= "country", "publicationDateAlbum" = "year")) %>%
  left_join(new_artist, by=c("name"="country", "publicationDateAlbum"="begin"))
names(data)[6] = "year"
data[is.na(data$count_artist),]$count_artist = 0
write.csv(data, "./MinhNhatDo/summary_country.csv", row.names=FALSE)

data <- read_csv('./MinhNhatDo/summary_country.csv')
hist(data$count_song)



data <- data %>% group_by(country) %>% summarise(count = sum(`count`)) 
plotdata %>% ggplot() + geom_point(aes(x=publicationDateAlbum, y=count, col=country)) + ggtitle("Plot scatter date and count song publication")



require(maps)
require(viridis)
theme_set(
  theme_void()
)

download.file("http://thematicmapping.org/downloads/TM_WORLD_BORDERS_SIMPL-0.3.zip" , destfile="data/world_shape_file.zip")
system("unzip data/world_shape_file.zip")
install.packages("rgdal")
library(rgdal)
world_spdf <- readOGR( 
  dsn= paste0(getwd(),"/data/world_shape_file/") , 
  layer="TM_WORLD_BORDERS_SIMPL-0.3",
  verbose=FALSE
)

world_spdf@data <- left_join(world_spdf@data, data, by = c("FIPS"="country"))

library(leaflet)

library(RColorBrewer)
mybins <- c(0, 10, 20, 50 , 100, 500, 1000, 5000, 10000, 30000, 50000, 100000,Inf)
world_spdf@data$count[is.na(world_spdf@data$count)] = 0
mypalette <- colorBin(palette="YlOrBr", domain=world_spdf@data$count, na.color="transparent", bins=mybins)

# Prepare the text for tooltips:
mytext <- paste(
  "Country: ", world_spdf@data$NAME,"<br/>", 
  "Area: ", world_spdf@data$AREA, "<br/>", 
  "Number of songs: ", world_spdf@data$count, 2, 
  sep="") %>%
  lapply(htmltools::HTML)

# Final Map
m <- leaflet(world_spdf) %>% 
  addTiles()  %>% 
  setView( lat=10, lng=0 , zoom=2) %>%
  addPolygons( 
    fillColor = ~mypalette(count), 
    stroke=TRUE, 
    fillOpacity = 0.9, 
    color="white", 
    weight=0.3,
    label = mytext,
    labelOptions = labelOptions( 
      style = list("font-weight" = "normal", padding = "3px 8px"), 
      textsize = "13px", 
      direction = "auto"
    )
  ) %>%
  addLegend( pal=mypalette, values=~count, opacity=0.9, title = "Number of song's publication", position = "bottomleft" )

m  


library(htmlwidgets)
dir = getwd()
saveWidget(m, file="./choroplethLeaflet5.html")
