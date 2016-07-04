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
INSERT INTO `media` VALUES (1,0,'2016-06-15 20:22:07','2016-06-28 18:29:42',2,NULL,1,'png',''),(2,0,'2016-06-15 20:22:07','2016-06-28 18:29:42',2,NULL,1,'png',''),(3,0,'2016-06-15 20:22:07','2016-06-28 18:29:42',2,NULL,1,'pdf',''),(4,0,'2016-06-15 20:33:11','2016-06-28 18:30:03',4,NULL,1,'jpg',''),(5,0,'2016-06-15 20:39:27','2016-06-28 18:29:49',3,NULL,1,'jpg','');
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
INSERT INTO `objects` VALUES (1,1,'2016-05-26 19:12:39','2016-06-29 21:52:45',NULL,'About',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'about',NULL,NULL,NULL,NULL,NULL,'The Hummingbird Clock is a project by artist and “private ear” <a href=\'http://lawrenceabuhamdan.com/\' target=\'new\'>Lawrence Abu Hamdan</a> for <a href=\'http://www.biennial.com/2016/\' target=\'new\'>Liverpool Biennial 2016</a>.\r\n\r\nBack end development:   <a href=\'http://pinknoi.so/\' target=\'new\'>Andre Castro</a>','The noisy buzz of the mains electricity power supply has been one of our urban environment’s most persistent background noises. One day in 1996 Dr Catalin Grigoras realised that the electricity wasn\'t just making noise, but in fact singing...\r\n\r\nThe UK national electrical grid delivers power across the country. This mains power supply makes a constant humming sound, yet there are tiny changes to the frequency of this sound every second. Most recordings made in the UK have a trace of mains hum on them and this can be forensically analysed to determine the time and date they were made, and as a result, whether anyone has edited the recording. \r\n\r\nFor over ten years, the UK government has used this technique as a surveillance tool. This is the Hummingbird Clock, an online time piece that aims at making this technique available to everyone. If you need to know the exact time an audio or video recorded event took place in the UK after 7 July 2016 then simply <a href=\'http://hummingbirdclock.info/submit/\' target=\'new\'>submit a claim.</a>\r\n',NULL),(2,1,'2016-06-14 19:18:53','2016-06-29 15:27:01',10,'What is The Hummingbird Clock?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'what-is-the-hummingbird-clock',NULL,NULL,NULL,NULL,NULL,NULL,'The Hummingbird Clock is a new kind of timepiece that uses the second-by-second fluctuations in the frequency of the UK mains power supply to time and date digital recordings. It is designed to provide a tool for investigations into civil and human rights violations, and state corruption committed in the UK anytime after July 7th 2016.\r\n\r\nFor over 10 years the UK government has been using the humming sound of the electrical mains as a surveillance tool and forensic clock to authenticate recordings – to determine their time and date, and whether they have been edited or otherwise altered. They call this technique, invented by Dr Catalin Grigoras, <a href=\'https://en.wikipedia.org/wiki/Electrical_network_frequency_analysis\' target=\'new\'>“electrical frequency network (ENF) analysis”</a>. It can be effectively used as a time stamp for almost any recording made within earshot of electricity, which is always – almost silently – humming. This use of the sound of the electrical grid as a fingerprint of the nation\'s time has only ever been used by the police as a tool of state level surveillance, and yet everyone has access to this same buzz. \r\n\r\nThe Hummingbird Clock takes the same technique of ENF state surveillance and reverse its ears, turning it into a tool to listen back to the state. This clock is an attempt to invert the flow of power and reclaim the national buzz, by making this surveillance technology accessible to everybody else.  From the 7th July 2016 onwards your mains electricity does not merely hum but also testifies. ',NULL),(3,1,'2016-06-14 19:19:25','2016-06-29 15:44:49',20,'How does it work?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'how-does-it-work',NULL,NULL,NULL,NULL,NULL,NULL,'In the UK there is an alternating mains current at a nominal average value of 50 Hz per second. However, there are micro-fluctuations in the rate of alternation that change unpredictably second by second. The mains current is fluctuating and at any moment it could be anywhere on the scale of 49 Hz to 51 Hz per second. Because the National Grid regulates and standardizes the distribution of electricity, the exact same buzz can be heard at the exact same moment nationwide from Land\'s End to John o\' Groats. Whether the frequency is currently 49.6 Hz or 50.3 Hz, it will be exactly the same reading from a neon light in Glasgow, a fridge in Southampton, and a laptop in London at exactly the same time. \r\n\r\nAs the secondhand turns around The Hummingbird Clock like a seismograph it draws the line of the UK\'s fluctuating mains current and this pattern of fluctuation is being recorded and archived every second 24/7. This information can be used to analyse a digital recording extract the fingerprint of the mains’ hum from that recording and correlate that with the clock’s database. Digital recordings almost always have mains hum on them, either because the device was plugged in to the mains or because it inducts it off nearby cables, lights and appliances in a room. The Hummingbird Clock is able to automatically match the fingerprint of the mains hum on a given recording with it\'s database of the buzzing mains, and therefore tell you exactly when the recorded event occurred or if the recording itself has been tampered with and edited. The archiving of the mains power supply begins on the 7th July 2016 so we can only analyse recorded events made from this date forward.   \r\n',NULL),(4,1,'2016-06-14 19:20:01','2016-06-29 15:19:39',30,'How can it work for you?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'how-can-it-work-for-you',NULL,NULL,NULL,NULL,NULL,NULL,'The Hummingbird Clock depends on your participation and there are hundreds of reasons why you might need to know the exact time and date a recording was made. Legal disputes about the exact time of a recording are common. Below are some examples of how The Hummingbird Clock can be used in such disputes: \r\n\r\n- The fingerprint of the mains buzz can be used as an alibi for someone to prove where they were at a specific time. \r\n\r\n- Proving that someone has prior knowledge of a crime is a common point of contestation in cases of corruption. The Hummingbird Clock could potentially be used to ascertain someone knew something before they claim they did by proving that a given recording was made before a certain date and time. \r\n\r\n- Perhaps you are caught on a recording that is being used as evidence against you, but know that it has been edited to make it sound as if you said things you didn\'t, or that certain material has been edited out. The Hummingbird Clock would be able to prove that the recording has indeed been tampered with by demonstrating how the buzz has been patched together from different moments in time rather than one continuous flow.. \r\n\r\nIf you happen to be involved in this kind of legal dispute yourself, or know of some other situation that depends on corroborating the exact time an audio or video recording was made, please send your recording along with a few details via the <a href=\'http://hummingbirdclock.info/submit/\' target=\'new\'>submission page.</a> The material will then be forwarded to a committee of investigators for review and analysis. The committee is currently formed of the Liverpool Biennial office, Forensic Architecture at Goldsmiths College,University of London and Lawrence Abu Hamdan’s Private Ear agency. The committee will assess the submission and get back to you as soon as possible to discuss the case, or directly present you with the results of analysis by the Hummingbird Clock along with a detailed technical report about how it was conducted.',NULL),(5,1,'2016-06-15 18:43:59','2016-06-15 19:40:04',NULL,'Submit',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'submit',NULL,NULL,NULL,NULL,NULL,'Hello [name],\r\n\r\nThank you for submitting a claim to the Hummingbird Clock.\r\n\r\nWe will evaluate it and be in contact soon.\r\n\r\nBest,\r\nHC','Thank you. A confirmation email will be sent to [email].','Name:\r\n[name]\r\n\r\nEmail:\r\n[email]\r\n\r\nMessage:\r\n\r\n[message]\r\n\r\n(end)');
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

-- Dump completed on 2016-07-04 16:38:44
