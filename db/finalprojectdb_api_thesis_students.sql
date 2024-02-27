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
-- Table structure for table `api_thesis_students`
--

DROP TABLE IF EXISTS `api_thesis_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_thesis_students` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `thesis_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_thesis_students_thesis_id_user_id_f18c0bab_uniq` (`thesis_id`,`user_id`),
  KEY `api_thesis_students_user_id_760f24fe_fk_api_user_id` (`user_id`),
  CONSTRAINT `api_thesis_students_thesis_id_f66424e3_fk_api_thesis_id` FOREIGN KEY (`thesis_id`) REFERENCES `api_thesis` (`id`),
  CONSTRAINT `api_thesis_students_user_id_760f24fe_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_thesis_students`
--

LOCK TABLES `api_thesis_students` WRITE;
/*!40000 ALTER TABLE `api_thesis_students` DISABLE KEYS */;
INSERT INTO `api_thesis_students` VALUES (48,26,2),(49,26,35),(53,30,6),(54,31,10),(55,31,13),(57,32,11),(56,32,19),(58,33,16),(59,33,30),(61,34,22),(60,34,40),(62,35,25),(63,35,43),(64,36,26),(65,36,46),(66,37,27),(67,37,38),(68,38,28),(70,39,31),(69,39,41),(72,40,34),(71,40,49);
/*!40000 ALTER TABLE `api_thesis_students` ENABLE KEYS */;
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
