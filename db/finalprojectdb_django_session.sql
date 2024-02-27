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
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1fvjqmovtcrqggaux5h47ttz3qrkj7ud','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rW8lV:Gd8AGXvaVaVk2vd5lAfTHU47_oCChGNRu4MmA8RIA1E','2024-02-17 05:40:33.943787'),('306vg6l2uqsll58yp0w8b60v31yjn5yv','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rWqqE:XScWncn3wC4lhM04av16HMC5DaTYsmQrzQ6d6Rgodrg','2024-02-19 04:44:22.489988'),('75zdea6jdgsyyva57hls94wu2xoaigee','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rUgzQ:UpbZIB4-pW2-GhdHAF85tkOtQ-OKb3XYTfH8U7ZgyCM','2024-02-13 05:48:56.138170'),('7v9lazoqyaf8fxgmlevuw85k88k8dswn','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rTFmq:802tN2ePCMCv7tM5iRohvxlFkxokBripN0ulgR2UfvM','2024-02-09 06:34:00.477482'),('dgl8e3n2g1yu3l7mlv675nyqa7b0n7bc','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rQ3ay:MSLAaKFnm0IoWa4cErmTKpCHjErANSKK5dwVeXCFTmc','2024-01-31 10:56:32.244719'),('frt7gborjuclughnjh705lph0087l2di','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rciFh:wo-HG3SI0Y8IGaU7vr-cySxp7DapeDXv1Ec2UwZnOBA','2024-03-06 08:46:53.998197'),('ko2so2hr873r2rzznrervwlzhclaxwa8','.eJxVjDkOwjAQRe_iGlkz3k1Jzxmi8TI4gBwpS4W4O0RKAe1_7_2XGGhb27AtdR7GIs4Cxel3S5Qfte-g3KnfJpmnvs5jkrsiD7rI61Tq83K4fweNlvatnYbsmQAZyChO2nvrojXealW4giqkCKypzOhSYQM2IKLGEMDEaMT7A83LNtQ:1rclk9:wIToFbqDSyiP5xBoAPDOxVTh_Kkpz9yAaq5YPGTBTgE','2024-03-06 12:30:33.730926');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
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
