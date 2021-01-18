library(readr)
library(jsonlite)
library(ggplot2)
library(dplyr)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")
data <- read_csv('./MinhNhatDo/generated_data/summary_country.csv')
data

tmp_data <- data %>% 
  summarise(total_song = sum(`count_song`), total_album = sum(`count_album`), total_artist = sum(`count_artist`)) 

tmp_1 <- data %>% group_by(year, gender) %>% summarise(count_song=sum(count_song)) 
tmp_1[tmp_1$year > 1950,] %>%
  ggplot(aes(x=year, y=count_song, fill=gender)) +
  geom_bar(stat="identity") +
  theme(legend.position="top") + labs(y = "Number of songs") + ggtitle("Bar plot number of song and year")


write_json(tmp_data,"./MinhNhatDo/summary_total.json")
write_json(data,"./MinhNhatDo/summary_country.json")

