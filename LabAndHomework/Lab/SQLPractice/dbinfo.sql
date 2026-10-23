DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `authorId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `dod` date DEFAULT NULL,
  `gender` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `profession` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `portrait` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `biography` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `authors` (`authorId`, `firstName`, `lastName`, `dob`, `dod`, `gender`, `profession`, `country`, `portrait`, `biography`) VALUES
(1,	'Albert',	'Einstein',	'1879-03-14',	'1955-04-18',	'M',	'Theoretical physicist',	'Germany',	'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/900px-Albert_Einstein_Head.jpg',	'Albert Einstein was born at Ulm, in Württemberg, Germany, on March 14, 1879. In 1901, after gaining his diploma, he acquired Swiss citizenship and, as he was unable to find a teaching post, he accepted a position as technical assistant in the Swiss Patent Office. In 1905 he obtained his doctor’s degree. Einstein always appeared to have a clear view of the problems of physics and the determination to solve them. He had a strategy of his own and was able to visualize the main stages on the way to '),
(2,	'Agatha',	'Christie',	'1890-09-15',	'1976-01-12',	'F',	'Writer',	'United Kingdom',	'http://www.gstatic.com/tv/thumb/persons/323/323_v9_ba.jpg',	'Dame Agatha Mary Clarissa Christie, Lady Mallowan, DBE was an English writer. She is known for her 66 detective novels and 14 short story collections, particularly those revolving around her fictional detectives Hercule Poirot and Miss Marple.'),
(3,	'Marie',	'Curie',	'1867-11-07',	'1934-07-04',	'F',	'Physicist',	'Poland',	'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',	'Marie Curie was a French-Polish physicist and chemist famous for her work researching radioactivity.'),
(4,	'Abraham',	'Lincoln',	'1809-02-12',	'1865-04-15',	'M',	'US President',	'USA',	'https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg',	'Abraham Lincoln was the 16th president of the United States and is regarded as one of America\'s greatest heroes due to his role as savior of the Union and emancipator of slaves. His rise from humble beginnings to achieving the highest office in the land is a remarkable story. '),
(5,	'Mohandas',	'Gandhi',	'1869-10-02',	'1948-01-30',	'M',	'Indian lawyer',	'India',	'https://upload.wikimedia.org/wikipedia/commons/d/d1/Portrait_Gandhi.jpg',	'Gandhi was a anti-colonial nationalist, and political ethicist, who believed in nonviolent  resistance which lead to a successful campaign for India\'s independence from the British rule in August, 1947.'),
(6,	'Helen',	'Keller',	'1880-06-27',	'1968-01-30',	'F',	'Author',	'USA',	'https://upload.wikimedia.org/wikipedia/commons/3/3e/Helen_Keller_circa_1920_-_restored.jpg',	'Helen Adams Keller (June 27, 1880 – June 1, 1968) was an American author, political activist, and lecturer. She was the first deaf-blind person to earn a Bachelor of Arts degree. The story of Keller and her teacher, Anne Sullivan, was made famous by Keller\'s autobiography, The Story of My Life, and its adaptations for film and stage, The Miracle Worker. Her birthplace in West Tuscumbia, Alabama, is now a museum and sponsors an annual \"Helen Keller Day.\" Her June 27 birthday is commemorated as He'),
(7,	'Benjamin',	'Franklin',	'1706-01-17',	'1790-06-16',	'M',	'Scientist',	'USA',	'https://upload.wikimedia.org/wikipedia/commons/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg',	'Benjamin Franklin was America’s scientist, inventor, politician, philanthropist and business man. He is best known as one of our Founding Fathers and the only one who signed all three documents that freed America from Britain: The Declaration of Independence. The American Constitution and The Treaty of Paris.');

DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `quoteId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `quote` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `authorId` smallint(6) NOT NULL,
  `category` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `likes` int(11) DEFAULT NULL,
  PRIMARY KEY (`quoteId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `quotes` (`quoteId`, `quote`, `authorId`, `category`, `likes`) VALUES
(1,	'Try not to become a man of success, but rather try to become a man of value.',	1,	'Inspirational',	19),
(2,	'Life is like riding a bicycle. To keep your balance you must keep moving.',	1,	'Motivational',	20),
(3,	'You cannot hope to build a better world without improving the individuals. To that end, each of us must work for his own improvement and, at the same time, share a general responsibility for all human',	3,	'Life',	100),
(4,	'Never memorize something that you can look up.',	1,	'Life',	130),
(5,	'Stay away from negative people they have a problem for every solution',	1,	'Inspirational',	45),
(6,	'In a gentle way you can shake the world',	5,	'Inspirational',	27),
(7,	'The future depends on what you do today.',	5,	'Inspirational',	84),
(8,	'A man is but the product of his thoughts; what he thinks, he becomes.',	2,	'Wisdom',	45),
(11,	'Those who deny freedom to others, deserve it not for themselves; and, under a just God, can not long retain it.',	4,	'Freedom',	156),
(12,	'Non-cooperation with evil is as much a duty as is cooperation with good.',	5,	'Moral',	25),
(13,	'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.',	1,	'Inspirational',	56),
(14,	'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.',	4,	'Wisdom',	46),
(15,	'I have no special talents. I am only passionately curious.',	1,	'Motivational',	93),
(16,	'Have no fear of perfection; you\'ll never reach it.',	3,	'Wisdom',	14),
(17,	'When you reach the end of your rope, tie a knot and hang on.',	5,	'Wisdom',	46),
(18,	'Most folks are about as happy as they make their minds up to be.',	4,	'Inspirational',	19),
(19,	'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',	3,	'Inspirational',	84),
(20,	'Few are those who see with their own eyes and feel with their own hearts.',	1,	'Wisdom',	46),
(21,	'Whatever you are, be a good one.',	4,	'Inspirational',	43),
(22,	'Love your Enemies, for they tell you your Faults.\r\n',	4,	'Inspirational',	30),
(23,	'Unthinking respect fo authority is the greatest enemy of the truth',	1,	'Moral',	57),
(24,	'Words had become to him a means of obscuring facts — not of revealing them.',	2,	'Life',	78),
(26,	'Insanity: doing the same thing over and over again and expecting different results.',	1,	'Inspirational',	37),
(27,	'Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety.',	7,	'Inspirational',	132),
(28,	'One of the luckiest things that can happen to you in life is, I think, to have a happy childhood.',	2,	'Wisdom',	15),
(29,	'Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.',	6,	'Wisdom',	78),
(30,	'Don’t throw stones at your neighbors, if your own windows are glass.',	7,	'Wisdom',	83),
(31,	'One doesn\'t recognize the really important moments in one\'s life until it\'s too late.',	2,	'Wisdom',	36),
(32,	'Your success and happiness lies in you. Resolve to keep happy, and your joy and you shall form an invincible host against difficulties.',	6,	'Inspirational',	86);