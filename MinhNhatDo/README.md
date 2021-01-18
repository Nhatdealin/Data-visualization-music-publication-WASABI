# Data-visualization-MDSAI

![Dashboard visualization](./dashboard.png)

### Project's target
This project will give users an overview of the general statistics about the current music market. With an intelligent presentation, this project will help users interact directly on the map to gain insights, the concentration of the world music market by color and timelines of the number of songs for each country.
- Show to users the distribution of songs by country via interactive map
- Show to users the summary statistic of the number of music publication and artist via some filters
- Show to users the timelines of the song number in a specific country for many years


## WASABI Song Corpus dataset
This repository contains the files of the current version of the WASABI Song Corpus, the models we have built on it as well as updates.

### Abstract
The WASABI Song Corpus is a large corpus of songs enriched with metadata extracted from music databases on the Web, and resulting from the processing of song lyrics and from audio analysis. 

More specifically, given that lyrics encode an important part of the semantics of a song, we focus here on the description of the methods we proposed to extract relevant information from the lyrics, such as their **structure segmentation**, their **topics**, the **explicitness** of the lyrics content, the **salient passages** of a song and the **emotions** conveyed. 

The corpus contains 1.73M songs with lyrics (1.41M unique lyrics)  annotated at different levels with the output of the above mentioned methods. Such corpus labels and the provided methods can be exploited by music search engines and music professionals (e.g. journalists, radio presenters) to better handle large collections of lyrics, allowing an intelligent browsing, categorization and segmentation recommendation of songs.


### Interactive explorer
The dataset can be explored using the [WASABI Interactive Navigator](https://wasabi.i3s.unice.fr). Beware that certain copyrighted data (ex: full length lyrics or full track audio files) are not accessible if you are not a member of the Wasabi project.

### Overview
- The WASABI Song Corpus consists of CSV files containing the songs, the artists and the albums.
  - [2.1M songs](https://mega.nz/#!GUhzBagS!dkWiRhRKCzTpbWtWcUvoD3Rrhleq50krvvg6n0SaI-w)
  - [77k artists](https://mega.nz/#!jUojAQjb!lV6K3U49l0xzw7XzL5zXKQscSI8hntrO_FVp8luH4zE)
  - [208k albums](https://mega.nz/#!ScwnlarS!V59gnQY_oDOFzBplIok7nMnAC2QUq7UpbgmpDjLAWWQ)
- Natural Language Processing Annotations
  - [Self-similarity matrices (line- and segment level) for 1.73M lyrics](https://mega.nz/#!HR5R3ACA!wV9zqtQSxziZCdXwu3gApnrTIPyH2hMAgGUYJEqmlmk)
  - [50k lyrics summaries](https://mega.nz/#!SdpxTS4I!SdbzMWvZO9fKkIF1OkHZ5lPH6v5w0HvK-GeztBV1T-g)
  - [Topic predictions for 1.73M lyrics (inludes topic model)](https://mega.nz/#!CUpl0KKJ!tLlL1eMKjX94ZJvpaO7w7HFtozpKDlyruVwRt2z-9G4)
- Additional annotations provided
  - [LastFM social tags](https://mega.nz/#!WQx1ka7K!9PfU3K7q6JkqkfMdrirS5IRsMbEJVV1FWBEmoUGK5ME)
  - [LastFM emotion tags](https://mega.nz/#!KN5jwYpZ!GFEc04t87ylJYILQQzjMaeZNg0_DoBnYeo0dvxLoLg4)
- NLP Models
  - [Explicit lyrics classifier trained on 438k lyrics](https://mega.nz/#!ndx3zQ4I!K6Qq6Bvf9NXWHejPvMyxwTUJGn-U8K6auuN0gCktcmU)
  - [LDA topic model trained on 1.05M lyrics](https://mega.nz/#!KFhh2AyC!-OaAifvACt3CAo-Pl-D14LIOb6Gx4ReJzjmqY7StwCY)
