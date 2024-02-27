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
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_520_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_api_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-01-25 05:50:31.071014','2','YenVy',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(2,'2024-01-25 06:01:33.150543','1','Thinh',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Role\"]}}]',11,1),(3,'2024-01-25 07:05:32.649241','12','Le',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(4,'2024-01-25 07:05:40.355790','11','Tran',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(5,'2024-01-25 07:05:49.735568','7','Tran',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(6,'2024-01-25 07:05:57.655649','10','Nguyen',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(7,'2024-01-25 07:24:19.730278','9','Pham',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(8,'2024-01-25 07:24:28.357912','8','Le',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(9,'2024-01-25 07:24:36.543467','4','Le',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(10,'2024-01-25 07:24:43.333600','7','Tran',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(11,'2024-01-25 07:24:52.678372','6','Nguyen',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(12,'2024-01-25 07:25:01.363129','5','Pham',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(13,'2024-01-25 07:25:30.130437','3','Tran',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(14,'2024-01-25 07:53:03.091300','1','Council object (1)',1,'[{\"added\": {}}]',12,1),(15,'2024-01-25 07:54:21.523991','1','Council object (1)',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',12,1),(16,'2024-01-25 07:58:26.783989','1','Council object (1)',2,'[{\"changed\": {\"fields\": [\"Is active\"]}}]',12,1),(17,'2024-01-25 07:58:40.837862','1','Council object (1)',2,'[{\"changed\": {\"fields\": [\"Is active\"]}}]',12,1),(18,'2024-01-25 07:59:17.092943','2','Council object (2)',1,'[{\"added\": {}}]',12,1),(19,'2024-01-25 07:59:32.458902','3','Council object (3)',1,'[{\"added\": {}}]',12,1),(20,'2024-01-25 08:00:28.981209','12','Le',2,'[{\"changed\": {\"fields\": [\"Role\"]}}]',11,1),(21,'2024-01-25 08:01:31.037045','1','CouncilMembership object (1)',1,'[{\"added\": {}}]',15,1),(22,'2024-01-25 08:41:02.489530','2','2',1,'[{\"added\": {}}]',15,1),(23,'2024-01-25 08:41:10.986754','2','2',3,'',15,1),(24,'2024-01-25 08:45:36.406829','3','3',1,'[{\"added\": {}}]',15,1),(25,'2024-01-25 08:45:44.295233','3','3',3,'',15,1),(26,'2024-01-25 08:50:29.973281','1','1',2,'[]',15,1),(27,'2024-01-25 09:09:08.385851','4','4',1,'[{\"added\": {}}]',15,1),(28,'2024-01-25 09:09:18.694441','1','1',2,'[{\"changed\": {\"fields\": [\"Council role\"]}}]',15,1),(29,'2024-01-25 09:16:10.651601','5','5',1,'[{\"added\": {}}]',15,1),(30,'2024-01-25 09:16:23.219968','5','5',3,'',15,1),(31,'2024-01-25 09:45:13.515483','6','6',1,'[{\"added\": {}}]',15,1),(32,'2024-01-25 09:57:25.099740','1','Manager',1,'[{\"added\": {}}]',3,1),(33,'2024-01-25 09:59:05.241652','2','Student',1,'[{\"added\": {}}]',3,1),(34,'2024-01-25 09:59:13.015020','1','Managers',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(35,'2024-01-25 09:59:15.358929','2','Students',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(36,'2024-01-25 09:59:57.256323','2','Students',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(37,'2024-01-25 10:00:44.420611','3','Lecturer',1,'[{\"added\": {}}]',3,1),(38,'2024-01-25 10:01:07.837815','3','Lecturer',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(39,'2024-01-25 10:01:22.128335','2','Student',2,'[{\"changed\": {\"fields\": [\"Name\", \"Permissions\"]}}]',3,1),(40,'2024-01-25 10:01:24.818895','1','Managers',2,'[]',3,1),(41,'2024-01-25 10:02:54.012578','4','Provost',1,'[{\"added\": {}}]',3,1),(42,'2024-01-25 10:02:57.438590','1','Manager',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(43,'2024-01-26 07:11:54.763848','1','Khóa luận vềAI',1,'[{\"added\": {}}]',13,1),(44,'2024-01-26 07:12:02.743605','1','Khóa luận vềAI',3,'',13,1),(45,'2024-01-27 04:36:55.364127','12','Le Thi K',2,'[]',11,1),(46,'2024-01-27 04:37:01.359033','12','Le Thi K',2,'[]',11,1),(47,'2024-01-27 04:38:03.810997','12','Le Thi K',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(48,'2024-01-27 04:39:41.972219','12','Le Thi K',3,'',11,1),(49,'2024-01-27 04:47:02.654921','11','Tran Van J',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(50,'2024-01-27 04:47:07.668745','10','Nguyen Thi I',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(51,'2024-01-27 04:47:11.156927','11','Tran Van J',2,'[]',11,1),(52,'2024-01-27 04:47:19.241780','9','Pham Van H',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(53,'2024-01-27 04:47:26.657756','8','Le Thi G',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(54,'2024-01-27 04:47:34.741240','7','Tran Van F',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(55,'2024-01-27 04:47:51.004853','6','Nguyen Van E',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(56,'2024-01-27 04:47:57.490395','5','Pham Thi D',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(57,'2024-01-27 04:48:06.340777','4','Le Van C',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(58,'2024-01-27 04:48:13.885957','3','Tran Thi B',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(59,'2024-01-27 04:48:20.847812','2','YenVy Truong',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(60,'2024-01-27 04:48:26.083640','1','Thinh Lam',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(61,'2024-01-27 07:11:06.474445','2','Le Thi G',3,'',14,1),(62,'2024-01-27 21:59:16.949852','1','Thinh Lam',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(63,'2024-01-27 22:04:04.432682','2','YenVy Truong',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(64,'2024-01-27 22:05:10.158547','2','YenVy Truong',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',11,1),(65,'2024-01-27 22:05:19.419757','1','Manager',3,'',3,1),(66,'2024-01-27 22:15:41.372163','3','Khóa luận về AI',3,'',13,1),(67,'2024-01-27 22:15:45.104715','4','Khóa luận về AI',3,'',13,1),(68,'2024-01-27 22:17:44.510880','5','Khóa luận về AI',3,'',13,1),(69,'2024-01-27 22:35:42.812345','5','None',3,'',12,1),(70,'2024-01-27 22:35:46.184702','4','None',3,'',12,1),(71,'2024-01-27 22:57:32.231559','6','Khóa luận về AI',2,'[{\"changed\": {\"fields\": [\"Council\"]}}]',13,1),(72,'2024-01-27 23:00:47.113211','6','Pham Van H',3,'',14,1),(73,'2024-01-27 23:00:47.115201','5','Pham Thi D',3,'',14,1),(74,'2024-01-27 23:00:47.115201','4','Pham Thi D',3,'',14,1),(75,'2024-02-05 06:38:06.936492','21','21',3,'',15,1),(76,'2024-02-05 06:38:06.939492','20','20',3,'',15,1),(77,'2024-02-05 06:38:06.940491','9','9',3,'',15,1),(78,'2024-02-05 06:38:06.940491','7','7',3,'',15,1),(79,'2024-02-05 06:38:06.941500','6','6',3,'',15,1),(80,'2024-02-05 06:38:06.943017','4','4',3,'',15,1),(81,'2024-02-05 06:38:06.943017','1','1',3,'',15,1),(82,'2024-02-05 06:38:14.810915','22','22',1,'[{\"added\": {}}]',15,1),(83,'2024-02-05 06:38:28.696047','23','23',1,'[{\"added\": {}}]',15,1),(84,'2024-02-05 06:38:37.509153','24','24',1,'[{\"added\": {}}]',15,1),(85,'2024-02-05 06:38:46.371971','23','23',3,'',15,1),(86,'2024-02-05 06:39:00.969105','25','25',1,'[{\"added\": {}}]',15,1),(87,'2024-02-05 06:39:08.816247','25','25',3,'',15,1),(88,'2024-02-05 06:39:16.339657','26','26',1,'[{\"added\": {}}]',15,1),(89,'2024-02-05 06:39:30.047402','27','27',1,'[{\"added\": {}}]',15,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-26 23:20:46
