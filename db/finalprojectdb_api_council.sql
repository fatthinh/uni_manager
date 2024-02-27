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
-- Table structure for table `api_council`
--

DROP TABLE IF EXISTS `api_council`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_council` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_council`
--

LOCK TABLES `api_council` WRITE;
/*!40000 ALTER TABLE `api_council` DISABLE KEYS */;
INSERT INTO `api_council` VALUES (20,0,'2024-02-22 13:03:09.535207','2024-02-26 08:39:04.177613','Hội Đồng Chấm Điểm Khóa Luận Chất Lượng Cao (HĐCL-CLC)'),(21,1,'2024-02-22 13:08:28.546926','2024-02-24 04:16:56.646467','Ban Chấm Điểm Nghiên Cứu và Học Thuật (BCD-NCHT)'),(22,1,'2024-02-24 08:25:50.594141','2024-02-24 08:25:50.594141','Ủy Ban Đánh Giá Tốt Nghiệp (ỦBDG-TN)'),(23,1,'2024-02-24 08:26:05.175554','2024-02-24 08:26:05.175554','Ban Giám Khảo Chất Lượng Khóa Luận (BGK-CLKL)'),(24,1,'2024-02-24 08:26:16.212131','2024-02-24 08:26:16.212131','Hội Đồng Đánh Giá Nghiên Cứu Học Thuật (HĐDG-NCHT)'),(25,1,'2024-02-24 08:26:40.823244','2024-02-24 08:26:40.823244','Ban Đánh Giá và Phê Bình Nghiên Cứu (BDG-PBNCH)'),(26,1,'2024-02-24 08:26:52.114050','2024-02-24 08:26:52.114050','Hội Đồng Chấm Điểm Chuyên Nghiệp (HĐCD-CN)'),(27,1,'2024-02-24 08:27:06.327054','2024-02-24 08:27:06.327054','Ủy Ban Đánh Giá Nghiên Cứu và Phương Pháp (ỦBDG-NCP)'),(28,1,'2024-02-24 08:27:13.210333','2024-02-24 08:27:13.210333','Ban Chấm Điểm Tốt Nghiệp và Đánh Giá Nghiên Cứu (BCD-TN&DGNC)'),(29,1,'2024-02-24 08:27:26.140017','2024-02-24 08:27:26.140017','Hội Đồng Chấm Điểm Kiến Thức và Kỹ Năng (HĐCD-KTKS)');
/*!40000 ALTER TABLE `api_council` ENABLE KEYS */;
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
