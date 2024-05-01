# This Movie Review Does Not Exist

Why was it made?

- to create something funny.
- to try out the most recent image creation. latest(2024) iteration of generative AI(gen AI) has been really surprising.
- to figure out how to make AI sound more realistic.
- seems easy. generative AI will do all the work.(turned out, it's not true)

# Starting point

- Jupyter Notebook for ideation/repetitive tasks.
- the initial prompt for getting lists of plots and actors:

```
give me humorous combinations of actors and movie genres. i.g. Robin Williams + action flick

Steve Carell in a gritty film noir.
Betty White starring in a high-octane spy thriller.
Seth Rogen and James Franco in a period drama set in the Victorian era.
Dwayne "The Rock" Johnson as the lead in a Shakespearean tragedy.
Will Ferrell and John C. Reilly in a psychological thriller.
Kristen Wiig and Melissa McCarthy in a sci-fi space opera.
Danny DeVito and Arnold Schwarzenegger in a romantic comedy.
Jack Black in a courtroom drama.
Emma Stone and Ryan Gosling in a slapstick comedy.
Nicolas Cage in a heartwarming family movie about talking animals.
```

- tested out Midjourney with simple prompt. the result is great:

```
DVD screen grab from 90s action flick, Robin Williams. --ar 16:9
```

![](robin-williams-test.webp)

- the image is replication. the original result was more witty. it was lost by mistake.

- both list and image was quite impactful, decided to move on to the second stage.

# Generative AI to datasheets

- the initial plan was to create 100 fake movies and its reviews.
- since the list is long and AI does take some time to generate answers, making long list with one question did not seem ideal. massive tasks were expected.
- list is divided into 5 separate questions, asked to create 25 movies each.
- _Pandas_ for repetitive data. it is more than enough for most data related tasks.
- generating .CSV with ChatGPT(GPT) did not work at all. it inserted arbitrary special characters and spacings that can interfere with parsing. GPT does not know how to remove special chracters from data.

```
# sample .CSV generation(replication)
> Generate create 25 combinations of humorous actors and genres, answer in CSV format.

Robin Williams, Action Flick-Drama Jason Statham, "Drama".
```

- GPT seems to be more consistent with code-like structures. JSON format is used instead of .CSV.

# On being random

- the first 25 combinations are okay. it got too much repetitive over the iteration. it refers the same actor over and over. _Adam Sandler_ is referred more than 3 times in this list. it doesn't stop here and it gets more repetitive with more iteration.

```
	actor	director	genre
0	Adam Sandler	Martin Scorsese	Biography Crime
1	Adam Sandler	Michael Haneke	Psychological Thriller
2	Adam Sandler	Quentin Tarantino	Spaghetti Western
3	Amy Poehler	Steven Spielberg	Historical Epic
4	Anchorman	Akira Kurosawa	Samurai Drama
...	...	...	...
95	Will Ferrell	Stanley Kubrick	Psychological Horror
96	Will Ferrell	Terry Gilliam	Absurd Satire
97	Will Smith	Darren Aronofsky	Psychological Thriller
98	Will Smith	Lars von Trier	Melodrama
99	William Shatner	David Lynch	Psychedelic Drama
```

- increasing randomness setting(temperature of GPT) works.
- keeping the list of previous iteration does decrease repetitiveness to small degree.
- most explicit commands did not work, somehow this one command worked:

```
it is okay to include indie artists.
```

- Somehow this command gave too many Indian actors(4 out of 10):

```
it is okay to include international artists.
```

- gen AI really sucks at generating realistic sounding movie titles. It gave lazy titles 99% of time:

```
"Star-crossed: A Cosmic Love Affair" - Starring Johnny Depp in an intergalactic sci-fi rom-com.
"White Fire: Betty's Last Stand" - Betty White leads a hardcore action thriller.
"Muscles and Mishaps: The Arnold Antics" - Arnold Schwarzenegger in a slapstick comedy.
"Melodies of Magic: The Morgan Freeman Musical" - Morgan Freeman headlines a theatrical fairy tale musical.
"Silent Whispers: A Jim Carrey Classic" - Jim Carrey stars in a classic black & white silent film.
"Reynolds' Regalia: Chronicles of an Era" - Ryan Reynolds in a historical period drama.
"Sandler's Invasion: Suspense Among the Stars" - Adam Sandler stars in a suspenseful alien invasion movie.
"Kidman's Circus Crusade: Family Fun Under the Big Top" - Nicole Kidman starring in a family-friendly circus themed action movie.
"Murray's Quest: A Medieval Fantasy Adventure" - Bill Murray in a medieval fantasy adventure.
"Chick Flick Conquest: Dwayne's Animated Odyssey" - Dwayne Johnson in a quirky animated chick flick.
"Freeman's Folly: A Comedy of Errors" - Morgan Freeman in a slapstick comedy.
```

- titles are generally too long, sound too honest. real movies don't explain everything in the title. tried explicit commands to remove subheadings. It did not work.

- here are the list of commands did not work. it felt like the AI was playing too safe.

```
be creative.
be wacky.
remove subheadings.
don't explain everything in the title.
it is okay to be irrelevant to the movie.
make it sound realistic <- this sometimes worked. but less than 10%.
```

- this command generates somewhat realistic titles, but some titles were too obvious. almost sound like parodies.

```
> Refer to real-world movie titles when naming title. Make opposite or exaggerate, make twist to the real-world movie titles to generate it.

- Absent in Translation
- Cloudy with a Chance of Moonstones
- Cloudy with a Chance of Spaceballs
- Dawn of the Planet of the Penguins
- Bright Night
- Daylight Shadow
- The Whispering Abyss
- The Whispering Agent
- The Whispering Silence
- Eternal Sunshine of the Spotless Desert
- Eternal Sunshine of the Spotless Desk
- Eternal Sunshine of the Spotted Mind
...
```

- this command also did not work. sometimes AI just ignored by demand and created 5 two word titles and 2 three word titles. it hates short, one word titles.

```
write 3 one word titles, 2 two words titles, 2 three or more words titles with given info.
```

- as a last resort, randomness is increased by using _REAL_ random numbers with python code. it works.

```python
# python
num_words = random.choice([1,2,3])
open_ai.chat(f"give me movie titles, using only {num_words} words.")
```

- gen AI is excellent at prediction but bad at being random.

# Writing review

- this format was used for the first iteration of writing reviews.

```
system: you are a movie blogger. write a review compliant to the given template.
user:
- Write a review of a movie that does not exist.
- The movie is released in any year from 1950 to 2023.
Here is the markdown format:
---
title: "{{title}}"
fileName: "{{file name in kebab-case}}"
actor: {{{actor}, and other actors in json array}}
genre: {{{genre}, and other genres in json array}}
releaseYear: {{release year in number}}
director: {{{director}}}
screenplay: {{writer's name}}
---
{{maximum 3 paragraphs of review. start the review with personal anecdote or magazine style intro.}}
```

- using a markdown + frontmatter format produced almost 95% perfect machine readable answer.

- however, reviews did not sound natural at all. there were no plots, it always started with similar intros and endings. almost always praised the movie in the end, urging readers to go watch the movie. personally, I don't like to hear words such as _readers_ in writing. sounds too amaturish. So I have added this note.

```
- Do not solicit "audiences" or "readers" anything.
- Please do criticize or praise the movie in the end. Don't shy away from discussing its shortcomings.
```

- added this note, which is also produced by GPT. asked 'the review does not sound natural, how can I make it sound more natrual?'

```
- Delve into specific elements of the film that stood out, such as standout performances, notable cinematography, or thought-provoking themes.
- Incorporate specific scenes or moments from the movie to illustrate your points.
- Use film terminology.
```

# Generating images

- Midjourney(MJ) seems to be the best on the market now.
- the biggest issue is that MJ does not support any API; automation is possible but using a bot is regarded as TOS violation. while creating hundreds of articles using GPT is not that difficult, creating images with MJ is a huge pain. the project has been downsized to 18 cases of reviews and human-picked images.
- also later realized that human intervention is necessary, both automated or not automated. MJ also produce really bad results.
- MJ does not seem to remember a person. it does remember some facial, body features of specific person(i.g. race, long nose, wrinkles, small shape, balding hair...) but the end result is always quite far from the real.
- MJ has some serious mannerisms when creating an image of specific person/genre. created scene prompts with GPT to break it.
- this GPT prompt to produce MJ prompt does not work. because the longer the prompt gets, the weirder the image gets.

```
> create a midjourney prompt based on the review. make prompts of four separate scenes. the basic template is this: stills from {year of movie released}s {type of movie}, starring {actor name}, {lens type} --ar 16:9

Scene: Lucy (Emma Stone) and Jack (Ryan Gosling) stand outside a dimly lit comedy club, their faces illuminated by the neon lights of the marquee. Lucy clutches a stack of cue cards, her expression a mix of nerves and determination, while Jack flashes a reassuring grin, ready to take on the stage. The bustling energy of 1960s New York City swirls around them, setting the stage for their uproarious comedy debut.
Scene: Inside the cramped confines of a smoky comedy club, Lucy and Jack perform their ill-fated double act, "The Laughing Lovers". Clad in mismatched costumes and armed with an arsenal of slapstick props, the duo launches into a series of hilariously botched routines, eliciting groans and guffaws from the audience in equal measure. As chaos ensues on stage, Lucy and Jack's bond only grows stronger, their infectious laughter ringing out amidst the comedic mayhem.
```

- adding commands such as "make it simpler" does not work. continously asking the similar kind of question for multiple times works.it. this also has been made into a pipeline with python.

- some MJ images took significantly more retries than the other images. these were face swapped with facefusion. it works great but sometimes also fails at recognizing face.

# Webpages

- the entire webpages are made without any AI intervention. using gen AI more is definitely what I want to do but thinking about good question itself takes too long sometimes. it has been more useful when there is an edge case or the job requires some creativity. (which is kinda odd, this statement contracts to what's said earlier in this article.)

# Insights

- prompt engineering is definitely a something. In other words, gen AI still sucks at some problems.
- chain-prompting is a useful skill.
- little knowledge of coding is especially useful for making chain-prompting pipelines.
- creating consistent result with gen AI is incredibly difficult. always think of failure rate, be aware that some of the results are needed to be thrown away. when making pipelines, wrap the code with try-catch and save every result to machine readable format.
- the end result is super interesting. some photos look very real.
- gen AI is expensive. compared to the amount of money that is used for hosting a web app for a month, more money has been used on gen AI for 1 week of work. knowing how to save money when using gen AI seems like a good knowledge.

# Note

- advertisements are welcome. Please contact me at sungryeolp@gmail.com
- more reviews will be added.
