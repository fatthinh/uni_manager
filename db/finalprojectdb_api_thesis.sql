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
-- Table structure for table `api_thesis`
--

DROP TABLE IF EXISTS `api_thesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_thesis` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_520_ci,
  `files` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `council_id` bigint DEFAULT NULL,
  `major` varchar(200) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_thesis_title_council_id_7c84ad13_uniq` (`title`,`council_id`),
  KEY `api_thesis_council_id_3a55b908_fk_api_council_id` (`council_id`),
  CONSTRAINT `api_thesis_council_id_3a55b908_fk_api_council_id` FOREIGN KEY (`council_id`) REFERENCES `api_council` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_thesis`
--

LOCK TABLES `api_thesis` WRITE;
/*!40000 ALTER TABLE `api_thesis` DISABLE KEYS */;
INSERT INTO `api_thesis` VALUES (26,'2024-02-23 07:58:20.781703','2024-02-24 04:39:04.189440',1,'Khóa luận về AI 2','Khóa luận về AI desc','theses/2024/02/file-example_PDF_1MB.pdf',20,'CS'),(30,'2024-02-24 11:30:30.695287','2024-02-25 10:33:53.753578',1,'The Impact of Artificial Intelligence on Business','This thesis explores the influence of AI on various aspects of business operations.','theses/2024/02/file-example_PDF_1MB_w1akchY_5wZqBfB.pdf',20,'MKT'),(31,'2024-02-24 12:35:54.133563','2024-02-25 10:33:56.480860',1,'Advancements in Quantum Computing','A comprehensive study on the recent developments in the field of quantum computing.','theses/2024/02/file-example_PDF_1MB_K4YmjVF.pdf',20,'CS'),(32,'2024-02-24 12:41:44.327351','2024-02-25 10:35:57.992953',1,'Environmental Sustainability Practices in Corporate Organizations','Examining how companies are adopting sustainable practices to reduce their environmental impact.','theses/2024/02/file-example_PDF_1MB_hAI66ya.pdf',20,'CS'),(33,'2024-02-25 07:29:36.415628','2024-02-25 10:35:39.337533',1,'The Role of Renewable Energy in Mitigating Climate Change','Analyzing the effectiveness of renewable energy sources in reducing carbon emissions.','theses/2024/02/file-example_PDF_1MB_N7YtZhG.pdf',20,'CS'),(34,'2024-02-25 07:34:15.728877','2024-02-25 07:34:15.928860',0,'Applications of Machine Learning in Healthcare','Exploring the use of machine learning algorithms to enhance healthcare services.','theses/2024/02/file-example_PDF_1MB_OXubuBe.pdf',NULL,'MKT'),(35,'2024-02-25 07:35:54.770689','2024-02-25 10:35:32.498302',1,'Cultural Impacts of Globalization on Indigenous Communities','Investigating how globalization affects the cultural identity of indigenous communities.','theses/2024/02/file-example_PDF_1MB_uv7zAff.pdf',NULL,'ENG'),(36,'2024-02-25 07:37:30.145383','2024-02-25 10:35:36.359188',1,'Cybersecurity Threats and Countermeasures','A comprehensive study on the evolving landscape of cybersecurity threats and prevention strategies.','theses/2024/02/file-example_PDF_1MB_VP4dihz.pdf',NULL,'IT'),(37,'2024-02-25 10:20:30.241819','2024-02-25 10:20:30.486447',0,'The Impact of Social Media on Political Movements','Examining the role of social media platforms in shaping political activism and movements.','theses/2024/02/file-example_PDF_1MB_fbqEdOk.pdf',NULL,'MKT'),(38,'2024-02-25 10:22:48.994663','2024-02-25 10:22:49.257220',0,'Advancements in Robotics and Automation','Investigating recent developments in robotics and their applications in industrial automation.','theses/2024/02/file-example_PDF_1MB_qxRJghz.pdf',NULL,'MKT'),(39,'2024-02-25 10:24:12.478750','2024-02-25 10:24:12.678860',0,'Effects of Exercise on Mental Health','A study on how regular exercise impacts mental well-being and cognitive functions.','theses/2024/02/file-example_PDF_1MB_ceYI9ia.pdf',NULL,'IT'),(40,'2024-02-25 10:25:54.665087','2024-02-25 10:25:54.847314',0,'Urbanization and Its Environmental Consequences','Analyzing the environmental challenges associated with rapid urbanization.','theses/2024/02/file-example_PDF_1MB_Tdv3SvF.pdf',NULL,'IT');
/*!40000 ALTER TABLE `api_thesis` ENABLE KEYS */;
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
