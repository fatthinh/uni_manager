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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-01-17 10:41:41.521793'),(2,'contenttypes','0002_remove_content_type_name','2024-01-17 10:41:41.555818'),(3,'auth','0001_initial','2024-01-17 10:41:41.691389'),(4,'auth','0002_alter_permission_name_max_length','2024-01-17 10:41:41.724385'),(5,'auth','0003_alter_user_email_max_length','2024-01-17 10:41:41.729902'),(6,'auth','0004_alter_user_username_opts','2024-01-17 10:41:41.733910'),(7,'auth','0005_alter_user_last_login_null','2024-01-17 10:41:41.737901'),(8,'auth','0006_require_contenttypes_0002','2024-01-17 10:41:41.740903'),(9,'auth','0007_alter_validators_add_error_messages','2024-01-17 10:41:41.745905'),(10,'auth','0008_alter_user_username_max_length','2024-01-17 10:41:41.752904'),(11,'auth','0009_alter_user_last_name_max_length','2024-01-17 10:41:41.758902'),(12,'auth','0010_alter_group_name_max_length','2024-01-17 10:41:41.770907'),(13,'auth','0011_update_proxy_permissions','2024-01-17 10:41:41.776912'),(14,'auth','0012_alter_user_first_name_max_length','2024-01-17 10:41:41.781907'),(15,'api','0001_initial','2024-01-17 10:41:41.932497'),(16,'admin','0001_initial','2024-01-17 10:41:42.002499'),(17,'admin','0002_logentry_remove_auto_add','2024-01-17 10:41:42.009500'),(18,'admin','0003_logentry_add_action_flag_choices','2024-01-17 10:41:42.014524'),(19,'oauth2_provider','0001_initial','2024-01-17 10:41:42.434647'),(20,'oauth2_provider','0002_auto_20190406_1805','2024-01-17 10:41:42.467644'),(21,'oauth2_provider','0003_auto_20201211_1314','2024-01-17 10:41:42.521674'),(22,'oauth2_provider','0004_auto_20200902_2022','2024-01-17 10:41:42.759220'),(23,'oauth2_provider','0005_auto_20211222_2352','2024-01-17 10:41:42.793215'),(24,'oauth2_provider','0006_alter_application_client_secret','2024-01-17 10:41:42.832751'),(25,'oauth2_provider','0007_application_post_logout_redirect_uris','2024-01-17 10:41:42.882746'),(26,'sessions','0001_initial','2024-01-17 10:41:42.903752'),(27,'api','0002_council_user_role_thesis_review_councilmembership_and_more','2024-01-25 05:49:33.267620'),(28,'api','0003_alter_thesis_students','2024-01-25 05:58:26.979471'),(29,'api','0004_rename_supervised_thesis_supervisor','2024-01-25 06:05:36.509121'),(30,'api','0005_council_name','2024-01-25 07:53:53.210922'),(31,'api','0006_alter_councilmembership_council_and_more','2024-01-26 06:38:20.331789'),(32,'api','0007_user_role_permissions_alter_thesis_abstract_and_more','2024-01-27 04:20:26.582447'),(33,'api','0008_remove_thesis_supervisor_thesis_supervisors','2024-01-27 04:20:26.687970'),(34,'api','0009_alter_thesis_supervisors','2024-01-27 04:20:26.698969'),(35,'api','0010_remove_user_role_permissions','2024-01-27 04:36:47.315568'),(36,'api','0011_alter_thesis_unique_together','2024-01-28 16:56:12.563085'),(37,'api','0012_rename_abstract_thesis_description','2024-02-05 15:39:01.775135'),(38,'api','0013_alter_councilmembership_council_role','2024-02-06 17:39:10.960167'),(39,'api','0014_review_comment','2024-02-07 09:26:54.975130'),(40,'api','0015_user_avatar','2024-02-10 11:02:16.720824'),(41,'api','0016_alter_council_members','2024-02-20 09:04:24.835354'),(42,'api','0017_alter_council_members','2024-02-20 09:05:01.420774'),(43,'api','0018_alter_council_members','2024-02-20 09:07:34.336287'),(44,'api','0019_thesis_major','2024-02-20 10:18:47.878677');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
