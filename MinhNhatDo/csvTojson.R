library(readr)
library(jsonlite)
library(dplyr)


setwd("~/Workspaces/DSAI/Data-visualization-MDSAI")
data <- read_csv('./MinhNhatDo/summary_country.csv')
data
tmp_data <- data %>%  summarise(total_song = sum(`count_song`),total_album = sum(`count_album`),total_artist = sum(`count_artist`))
write_json(tmp_data,"./MinhNhatDo/summary_total.json")
write_json(data,"./MinhNhatDo/summary_country.json")

