-- MySQL dump 10.13  Distrib 5.6.27, for FreeBSD10.2 (amd64)
--
-- Host: db154.pair.com    Database: hummm_clock
-- ------------------------------------------------------
-- Server version	5.6.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(1) unsigned NOT NULL DEFAULT '1',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `object` int(10) unsigned DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `rank` int(10) unsigned DEFAULT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'jpg',
  `caption` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,1,'2016-06-15 20:22:07','2016-06-15 20:22:53',2,NULL,1,'png',''),(2,1,'2016-06-15 20:22:07','2016-06-15 20:22:53',2,NULL,1,'png',''),(3,1,'2016-06-15 20:22:07','2016-06-15 20:22:53',2,NULL,1,'pdf',''),(4,1,'2016-06-15 20:33:11','2016-06-15 20:44:19',4,NULL,1,'jpg',''),(5,1,'2016-06-15 20:39:27','2016-06-15 20:39:27',3,NULL,NULL,'jpg','');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(1) unsigned NOT NULL DEFAULT '1',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `rank` int(10) unsigned DEFAULT NULL,
  `name1` tinytext,
  `name2` tinytext,
  `address1` text,
  `address2` text,
  `city` tinytext,
  `state` tinytext,
  `zip` tinytext,
  `country` tinytext,
  `phone` tinytext,
  `fax` tinytext,
  `url` tinytext,
  `email` tinytext,
  `begin` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `head` tinytext,
  `deck` mediumblob,
  `body` mediumblob,
  `notes` mediumblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objects`
--

LOCK TABLES `objects` WRITE;
/*!40000 ALTER TABLE `objects` DISABLE KEYS */;
INSERT INTO `objects` VALUES (1,1,'2016-05-26 19:12:39','2016-06-15 20:29:50',NULL,'THE HUMMINGBIRD CLOCK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'about',NULL,NULL,NULL,NULL,NULL,'The Hummingbird Clock is a project by artist and “private ear” <a href=\'http://lawrenceabuhamdan.com/\' target=\'new\'>Lawrence Abu Hamdan</a> for the <a href=\'http://www.biennial.com/2016/\' target=\'new\'>Liverpool Biennial 2016</a>.\r\n\r\n','The noisy buzz of the mains electricity power supply has been one of our urban environment’s most persistent background noises. One day in 1996 Dr Catalin Grigoras, realised that the electricity wasn\'t just making noise but in fact singing, to all of us, a song about time…\r\n',NULL),(2,1,'2016-06-14 19:18:53','2016-06-15 20:29:14',10,'What is The Hummingbird Clock?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'what-is-the-hummingbird-clock',NULL,NULL,NULL,NULL,NULL,NULL,'The Hummingbird Clock is a new kind of time piece that uses the second by second fluctuations in the frequency of the UK mains power supply to time and date digital recordings. The Hummingbird Clock is designed as a tool for investigations into civil and human rights violations and state corruption committed in the UK anytime after the 7th of July 2016.\r\n\r\nFor over 10 years the UK government has been using the humming sound of the electrical mains as a surveillance tool and forensic clock that authenticates recordings; to determine their time and date and whether they have been edited or altered. They call this technique, invented by Dr Catalin Grigoras, <a href=\'https://en.wikipedia.org/wiki/Electrical_network_frequency_analysis\' target=\'new\'>“electrical frequency network (ENF) analysis”</a> and it can be effectively used as a time stamp for almost any recording made within earshot of where the electricity is, almost silently, humming. This use of the sound of the electrical grid as a fingerprint of the nations time has only ever ben used by the police and as a tool of state level surveillance and yet everyone has access to this same buzz. \r\n\r\nFrom the 7th of July 2016 the Hummingbird clock will be using the same technique of ENF state surveillance but reverses its ears as a tool to listen back to the state; to plug in to the mains and repurpose this technique so that this technology of analysing public infrastructure can be also accessible for everybody else. This clock shows us that mains electricity does not simply hum but testifies and gives back the power, to reclaim the nations buzz and use it’s testimony for ourselves.',NULL),(3,1,'2016-06-14 19:19:25','2016-06-14 19:21:29',20,'How does it work?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'how-does-it-work',NULL,NULL,NULL,NULL,NULL,NULL,'In the UK there is an alternating mains current at a nominal average value of 50Hz per second. However there are micro-fluctuations in the rate of alternation that alter unpredictably second by second so although we hear it as 50hz per second at any moment it might be anywhere on the scale of 49hz to 51hz per second. Because the national grid regulates and standardises the distribution of electricity, the exact same buzz can be heard at the exact same moment nationwide from lands end to john o groats. As the second hand passes round The Hummingbird Clock you will notice that it marks the exact frequency of the UK mains buzz at that particular point in time. So whether it as at 49.6hz or be 50.3hz it will be that same frequency at the exact same time you would get from a neon light in Glasgow, a fridge in Southhampton or a Laptop in London. \r\n\r\nThe Hummingbird clock is live and is recording and archiving the UK mains power supply  hum 24/7. This allows us to analyse a digital recording - which almost always has mains hum on it, either because the device was plugged in or because it inducts it off nearby cables, lights and appliances in a room - extract the fingerprint of the mains’ hum from that recording and correlate that with the clock’s database. Then the software behind the Hummingbird clock automatically matches the fingerprint of the mains hum, and tells you exactly when the recorded event occurred or if the recording itself has been tampered with and reedited. The archiving of the mains power supply begins on the 7th July 2016 so we can only analyse recorded events made from this date forward.',NULL),(4,1,'2016-06-14 19:20:01','2016-06-15 20:44:19',30,'How can it work for you?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'how-can-it-work-for-you',NULL,NULL,NULL,NULL,NULL,NULL,'Legal disputes about the exact time of a recording are common. Below are some examples of how the Hummingbird Clock can be used in such disputes: \r\n\r\nThe fingerprint of the mains buzz can be used as an alibi for someone to prove where they were at a specific time. \r\n\r\nProving someone having prior knowledge of a crime is often important in legal disputes and is often a point of contestation in corruption cases; here the Hummingbird clock could be used if you want to prove somebody knew something before they claim that they did; for example, there is a recording of someone speaking about illicit activity, they are guilty if one can prove this recording of their speech was taken before a certain date and time. \r\n\r\nYou are caught on a recording that is being used as evidence against you, but you know the recording has been edited to make you sound as if you said things that you didn\'t say or that  material has been edited out, the mains buzz fingerprint would prove that the recording has indeed been edited, by showing that buzz of the mains is a patchwork of different times priced together. \r\n\r\nThe Hummingbird Clock depends on your participation and the above are only a few examples of how it can be used. If you have any case or know of a situation that depends on knowing or corroborating the exact time an audio or video recording was made then please submit your recording with some introductory details about the case and the nature of the dispute on our submission page. This recording will then be sent to a committee of investigators for review and analysis based at the Liverpool Biennial office, Forensic Architecture Goldsmiths College and Lawrence Abu Hamdan’s Private Ear agency. This committee will assess the submission and a member of the committee will get back to you as soon as possible to discuss the case or directly present you with the results of the analysis by The Hummingbird Clock and a detailed technical report about how this analysis was conducted. ',NULL),(5,1,'2016-06-15 18:43:59','2016-06-15 19:40:04',NULL,'Submit',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'submit',NULL,NULL,NULL,NULL,NULL,'Hello [name],\r\n\r\nThank you for submitting a claim to the Hummingbird Clock.\r\n\r\nWe will evaluate it and be in contact soon.\r\n\r\nBest,\r\nHC','Thank you. A confirmation email will be sent to [email].','Name:\r\n[name]\r\n\r\nEmail:\r\n[email]\r\n\r\nMessage:\r\n\r\n[message]\r\n\r\n(end)');
/*!40000 ALTER TABLE `objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wires`
--

DROP TABLE IF EXISTS `wires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wires` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `active` int(1) unsigned NOT NULL DEFAULT '1',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `fromid` int(10) unsigned DEFAULT NULL,
  `toid` int(10) unsigned DEFAULT NULL,
  `weight` float NOT NULL DEFAULT '1',
  `notes` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wires`
--

LOCK TABLES `wires` WRITE;
/*!40000 ALTER TABLE `wires` DISABLE KEYS */;
INSERT INTO `wires` VALUES (1,1,'2016-05-26 19:12:39','2016-05-26 19:12:39',0,1,1,NULL),(2,1,'2016-06-14 19:18:53','2016-06-14 19:18:53',1,2,1,NULL),(3,1,'2016-06-14 19:19:25','2016-06-14 19:19:25',1,3,1,NULL),(4,1,'2016-06-14 19:20:01','2016-06-14 19:20:01',1,4,1,NULL),(5,1,'2016-06-15 18:43:59','2016-06-15 18:43:59',0,5,1,NULL);
/*!40000 ALTER TABLE `wires` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-21 15:58:09
