# This Movie Review Does Not Exist

Why was it made?

- To create something humorous.
- To explore the capabilities of the latest generative AI, particularly in image creation.
- To enhance the realism of AI-generated content.
- To challenge the assumption that generative AI can effortlessly handle all tasks.

# Starting point

- Utilized Jupyter Notebook for ideation and repetitive tasks.
- Initial prompt involved requesting humorous combinations of actors and movie genres.

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

- Tested Midjourney with a simple prompt, yielding promising results:

```
DVD screen grab from 90s action flick, Robin Williams. --ar 16:9
```

![](robin-williams-test.webp)

- The image is recreation. I remember original result was more witty.

# Generative AI to datasheets

- Initially planned to create 100 fake movies and their reviews.
- Divided the task into manageable chunks due to AI processing time.
- Used _Pandas_, Python library for data management, but encountered issues with CSV generation using GPT.
- Opted for JSON format instead of CSV. GPT inserted arbitrary special characters and spacings that can interfere with parsing. GPT does not know how to remove special chracters from data.

```
# sample .CSV generation(replication)
> Generate create 25 combinations of humorous actors and genres, answer in CSV format.

Robin Williams, Action Flick-Drama Jason Statham, "Drama".
```

- GPT seems to be more consistent with code-like structures. JSON format is used instead of .CSV.

# On being random

- Explored ways to reduce repetitiveness in AI-generated content. It refers the same actor over and over. _Adam Sandler_ is referred more than 3 times in this list. Check out the list here:

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

- Experimented with adjusting the randomness setting (temperature) of GPT.

- Keeping the list of previous iteration does decrease repetitiveness to small degree.
- Most explicit commands did not work, somehow this one command worked:

```
it is okay to include indie artists.
```

- Somehow this command gave too many Indian actors(4 out of 10):

```
it is okay to include international artists.
```

- Generative AI really sucks at generating realistic sounding movie titles. It gave lazy titles 99% of time:

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

- Titles are generally too long, sound too honest. Real movies don't explain everything in the title. Tried explicit commands to remove subheadings. It did not work.

- Discovered that explicit commands yielded mixed results.
- Explored various techniques to improve the quality of AI-generated movie titles.
- Here are the list of commands did not work. It felt like the AI was playing too safe.

```
be creative.
be wacky.
remove subheadings.
don't explain everything in the title.
it is okay to be irrelevant to the movie.
make it sound realistic <- this sometimes worked. but less than 10%.
```

- This command generates somewhat realistic titles, but some titles were too obvious. almost sound like parodies.

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

- This command also did not work. Sometimes AI just ignored by demand and created 5 two word titles and 2 three word titles. It averts short, one word titles.

```
write 3 one word titles, 2 two words titles, 2 three or more words titles with given info.
```

- As a last resort, randomness is increased by using _REAL_ random numbers with python code. It works.

```python
# python
num_words = random.choice([1,2,3])
open_ai.chat(f"give me movie titles, using only {num_words} words.")
```

- Generative AI is excellent at prediction but bad at being random.

# Writing review

- This format was used for the first iteration of writing reviews.

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

- Using a markdown + frontmatter format produced almost 95% perfect machine readable answer.
- Encountered challenges in producing natural-sounding reviews. Intros and endings are especially repetitive. Personally, I don't like to hear words such as _readers_ in writing. This note is added to avoid such phenomenon.

```
- Do not solicit "audiences" or "readers" anything.
- Please do criticize or praise the movie in the end. Don't shy away from discussing its shortcomings.
```

- Added this note, which is also produced by GPT. Asked 'the review does not sound natural, how can I make it sound more natrual?'

```
- Delve into specific elements of the film that stood out, such as standout performances, notable cinematography, or thought-provoking themes.
- Incorporate specific scenes or moments from the movie to illustrate your points.
- Use film terminology.
```

# Generating images

- Midjourney was selected as the preferred tool for image generation. It's the best among its competitors.
- Faced limitations due to the lack of API support for automation: MJ does not support any API. Automation is possible but using a bot is regarded as TOS violation. While creating hundreds of articles using GPT is not that difficult, creating images with MJ is a huge pain. The project has been downsized to 18 cases of reviews and human-picked images.
- Also later realized that human intervention is necessary, both automated or not automated. Generative AI is not consistent, for both text and image.
- Experienced difficulties in creating believable images of famous individuals.
- This is some of the earlier MJ prompt created by GPT that did not work. MJ creates unrecognizable images with such long prompts.

```
> create a midjourney prompt based on the review. make prompts of four separate scenes. the basic template is this: stills from {year of movie released}s {type of movie}, starring {actor name}, {lens type} --ar 16:9

Scene: Lucy (Emma Stone) and Jack (Ryan Gosling) stand outside a dimly lit comedy club, their faces illuminated by the neon lights of the marquee. Lucy clutches a stack of cue cards, her expression a mix of nerves and determination, while Jack flashes a reassuring grin, ready to take on the stage. The bustling energy of 1960s New York City swirls around them, setting the stage for their uproarious comedy debut.
Scene: Inside the cramped confines of a smoky comedy club, Lucy and Jack perform their ill-fated double act, "The Laughing Lovers". Clad in mismatched costumes and armed with an arsenal of slapstick props, the duo launches into a series of hilariously botched routines, eliciting groans and guffaws from the audience in equal measure. As chaos ensues on stage, Lucy and Jack's bond only grows stronger, their infectious laughter ringing out amidst the comedic mayhem.
```

- Adding commands such as "make it simpler" does not work. Continously asking the similar kind of question for multiple times works. This has been made into a pipeline with python.

- Employed face swap techniques for challenging cases. it works great but sometimes also fails at recognizing face. Even face swap is not consistent.

# Webpages

- Developed the website without AI intervention, as the project required clarity and precision.

# Insights

- The unpredictability and cost of using generative AI should be highlighted.
- Acknowledged the importance of prompt engineering in obtaining desired AI responses.
- Noted the usefulness of chain-prompting techniques.
- Emphasized the need for coding skills in creating effective AI pipelines. Especially useful for making chain-prompting pipelines.
- Creating consistent result with generative AI is more difficult than the expectation. always think of failure rate, be aware that some of the results are needed to be thrown away. when making pipelines, wrap the code with try-catch and save every result to machine readable format.
- The end result is super interesting. Some photos look very real. Some articles are fun to read.
- Generative AI is expensive. compared to the amount of money that is used for hosting a web app for a month, more money has been used on gen AI for 1 week of work.

# Note

- Advertisements and collaboration offers are welcome.
- Planned to add more reviews in the future.
