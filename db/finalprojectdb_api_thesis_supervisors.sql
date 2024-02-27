-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: finalprojectdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_thesis_supervisors`
--

DROP TABLE IF EXISTS `api_thesis_supervisors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_thesis_supervisors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `thesis_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_thesis_supervisors_thesis_id_user_id_2a4150f2_uniq` (`thesis_id`,`user_id`),
  KEY `api_thesis_supervisors_user_id_0c2f19c6_fk_api_user_id` (`user_id`),
  CONSTRAINT `api_thesis_supervisors_thesis_id_6af90b6a_fk_api_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `api_thesis` (`id`),
  CONSTRAINT `api_thesis_supervisors_user_id_0c2f19c6_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_thesis_supervisors`
--

LOCK TABLES `api_thesis_supervisors` WRITE;
/*!40000 ALTER TABLE `api_thesis_supervisors` DISABLE KEYS */;
INSERT INTO `api_thesis_supervisors` VALUES (42,26,5),(41,26,17),(46,30,5),(47,30,14),(48,31,17),(49,32,14),(50,32,23),(51,33,17),(52,34,53),(53,35,24),(54,35,29),(55,36,20),(57,37,14),(56,37,29),(59,38,5),(58,38,20),(60,39,32),(62,40,21),(61,40,48);
/*!40000 ALTER TABLE `api_thesis_supervisors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-26 23:20:45
