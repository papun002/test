-- MySQL dump 10.13  Distrib 9.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: busDb
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backuphistories`
--

DROP TABLE IF EXISTS `backuphistories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backuphistories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `status` enum('Completed','Failed') DEFAULT 'Completed',
  `fileUrl` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `cid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `backuphistories_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backuphistories`
--

LOCK TABLES `backuphistories` WRITE;
/*!40000 ALTER TABLE `backuphistories` DISABLE KEYS */;
INSERT INTO `backuphistories` VALUES (1,'3/11/2025, 12:39:19 pm','0.02 MB','Completed','http://localhost:4000/backups/backup_1_1762153758433.sql',0,1,'2025-11-03 07:09:19','2025-11-03 07:09:19'),(2,'3/11/2025, 12:47:10 pm','0.00 MB','Completed','http://localhost:4000/backups/backup_1_1762154230367.zip',0,1,'2025-11-03 07:17:10','2025-11-03 07:17:10'),(3,'3/11/2025, 12:48:45 pm','0.00 MB','Completed','http://localhost:4000/backups/backup_1_1762154325491.zip',0,1,'2025-11-03 07:18:45','2025-11-03 07:18:45'),(4,'3/11/2025, 1:15:37 pm','0.02 MB','Completed',NULL,0,1,'2025-11-03 07:45:37','2025-11-03 07:45:37');
/*!40000 ALTER TABLE `backuphistories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conductors`
--

DROP TABLE IF EXISTS `conductors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conductors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `cid` (`cid`),
  CONSTRAINT `conductors_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conductors`
--

LOCK TABLES `conductors` WRITE;
/*!40000 ALTER TABLE `conductors` DISABLE KEYS */;
/*!40000 ALTER TABLE `conductors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `cid` (`cid`),
  CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firms`
--

DROP TABLE IF EXISTS `firms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `firms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firm_name` varchar(150) NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firms`
--

LOCK TABLES `firms` WRITE;
/*!40000 ALTER TABLE `firms` DISABLE KEYS */;
INSERT INTO `firms` VALUES (1,'Kalinga Putra Group','8457979541','$2b$06$Rhf2.rHPN4dH3o3mPdRBBeqb/.XtSL8UopexbJk5OAUGduuWpg2xG','2025-10-11 11:16:17','2025-10-11 11:16:17',1);
/*!40000 ALTER TABLE `firms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuelstations`
--

DROP TABLE IF EXISTS `fuelstations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuelstations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FuelStationName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mob` varchar(255) NOT NULL,
  `busRouteIds` json DEFAULT NULL COMMENT 'Stores route names as JSON for quick lookup',
  `isDeleted` tinyint(1) DEFAULT '0',
  `cid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `fuelstations_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuelstations`
--

LOCK TABLES `fuelstations` WRITE;
/*!40000 ALTER TABLE `fuelstations` DISABLE KEYS */;
INSERT INTO `fuelstations` VALUES (2,'Akandaleswar Service Station','Pudasul, Odisha','123456789','[\"3\", \"5\"]',0,1,'2025-11-12 05:33:21','2025-11-12 05:33:21',1);
/*!40000 ALTER TABLE `fuelstations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fueltransactions`
--

DROP TABLE IF EXISTS `fueltransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fueltransactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fuelStationId` int NOT NULL,
  `amountPaid` int NOT NULL,
  `previosDue` int NOT NULL DEFAULT '0',
  `fromDatePreviousDue` date DEFAULT NULL,
  `toDatePreviousDue` date DEFAULT NULL,
  `currentDue` int NOT NULL DEFAULT '0',
  `totalDue` int NOT NULL DEFAULT '0',
  `cid` int NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fuelStationId` (`fuelStationId`),
  KEY `cid` (`cid`),
  CONSTRAINT `fueltransactions_ibfk_1` FOREIGN KEY (`fuelStationId`) REFERENCES `fuelstations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fueltransactions_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fueltransactions`
--

LOCK TABLES `fueltransactions` WRITE;
/*!40000 ALTER TABLE `fueltransactions` DISABLE KEYS */;
INSERT INTO `fueltransactions` VALUES (13,'2025-05-12',2,0,1181272,'2025-04-06','2025-09-30',0,0,1,0,1,'2025-11-12 09:21:01','2025-11-12 09:24:39'),(14,'2025-10-03',2,155000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:25:46','2025-11-12 09:25:46'),(15,'2025-10-06',2,90000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:31:15','2025-11-12 09:31:15'),(16,'2025-10-08',2,100000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:31:45','2025-11-12 09:31:45'),(17,'2025-10-13',2,120000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:32:01','2025-11-12 09:32:01'),(18,'2025-10-15',2,50000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:32:18','2025-11-12 09:32:18'),(19,'2025-10-17',2,80000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:32:54','2025-11-12 09:32:54'),(20,'2025-10-22',2,80000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:33:10','2025-11-12 09:33:10'),(21,'2025-10-27',2,90000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:33:27','2025-11-12 09:33:27'),(22,'2025-11-03',2,90000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:33:43','2025-11-12 09:33:43'),(23,'2025-11-04',2,30000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:34:00','2025-11-12 09:34:00'),(24,'2025-11-07',2,50000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:34:37','2025-11-12 09:34:37'),(25,'2025-11-10',2,75000,0,NULL,NULL,0,0,1,0,1,'2025-11-12 09:34:51','2025-11-12 09:34:51'),(26,'2025-11-13',2,75000,0,NULL,NULL,0,0,1,0,1,'2025-11-14 07:31:54','2025-11-14 07:31:54');
/*!40000 ALTER TABLE `fueltransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `routeName` varchar(255) NOT NULL,
  `defaultVehicle` varchar(255) DEFAULT NULL,
  `cid` int NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (2,'Udala To Kolkata','WB496136',1,0,'2025-10-15 09:28:03','2025-10-15 09:28:03',1),(3,'Khunta To Bhubaneswar','OD01G8888',1,0,'2025-10-24 08:53:53','2025-10-24 08:53:53',1),(5,'Badsahi To Bhubaneswar','od01ag4088',1,0,'2025-11-03 07:57:55','2025-11-03 07:57:55',1);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffmodel`
--

DROP TABLE IF EXISTS `staffmodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffmodel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `cid` (`cid`),
  CONSTRAINT `staffmodel_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffmodel`
--

LOCK TABLES `staffmodel` WRITE;
/*!40000 ALTER TABLE `staffmodel` DISABLE KEYS */;
INSERT INTO `staffmodel` VALUES (1,'driver','Khitish Das Babu','Gunu','9777778195','Kaptipada',1,0,'2025-10-16 10:02:38','2025-10-16 10:02:38',1),(2,'conductor','Ashok Kumar Bhuiya','Ashok','9439730668','Udala, Mayurbhanj, Odisha',1,0,'2025-10-18 11:23:37','2025-10-18 11:23:37',1),(3,'conductor','Pritam Ray','Viki','9658641862','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 08:57:00','2025-10-26 08:57:00',1),(4,'conductor','Saumyajit Jena ','bubu','7205032630','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:15:13','2025-10-26 09:15:13',1),(5,'conductor','Gobinda Behera','Budhiya','7750015290','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:19:09','2025-10-26 09:19:09',1),(6,'conductor','Ajay Kumar Patra','Ajay','7381867361','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:40:52','2025-10-26 09:40:52',1),(7,'driver','Madhusudhan Hembram','Madhu','9937977419','Kanahiband, Odisha',1,0,'2025-10-26 09:43:08','2025-10-26 09:43:08',1),(8,'driver','Santosh Kumar Behera','Bapi Birrapan','7848869189','Kaptipada',1,0,'2025-10-26 09:51:41','2025-11-12 13:49:55',1),(9,'driver','Balaram Majhi','Bapi Nuasahi','8917640297','Nuasahi',1,0,'2025-10-26 09:53:00','2025-10-26 09:53:00',1),(10,'conductor','Pinu','Pinu','','Udala, Mayurbhanj, Odisha',1,0,'2025-11-03 10:02:11','2025-11-12 13:35:16',0),(11,'driver','Baghi','Baghi','123456789','Udala, Mayurbhanj, Odisha',1,0,'2025-11-12 05:23:40','2025-11-12 13:47:19',0),(12,'conductor','Bhakata','Bhakata','789456123','Kanahiband, Odisha',1,0,'2025-11-12 05:24:15','2025-11-12 14:06:27',0),(13,'driver','Manu','Manu','741852963','Kaptipada',1,0,'2025-11-12 05:35:52','2025-11-12 05:35:52',1),(14,'conductor','xyz','xyz','155588788','58852488',1,1,'2025-11-12 12:43:26','2025-11-12 12:57:43',1);
/*!40000 ALTER TABLE `staffmodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripfleetdetails`
--

DROP TABLE IF EXISTS `tripfleetdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripfleetdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `routeName` varchar(255) NOT NULL,
  `routeId` int DEFAULT NULL,
  `date` date NOT NULL,
  `busNo` varchar(255) NOT NULL,
  `upTripSale` decimal(10,2) DEFAULT '0.00',
  `downTripSale` decimal(10,2) DEFAULT '0.00',
  `luggage` decimal(10,2) DEFAULT '0.00',
  `totalSale` decimal(10,2) DEFAULT '0.00',
  `mainFuel` decimal(10,2) DEFAULT '0.00',
  `coolie` decimal(10,2) DEFAULT '0.00',
  `fixedFuel` decimal(10,2) DEFAULT '0.00',
  `staff` decimal(10,2) DEFAULT '0.00',
  `fastTagTollAmt` decimal(10,2) DEFAULT '0.00',
  `partsAccessories` decimal(10,2) DEFAULT '0.00',
  `mistriWorks` decimal(10,2) DEFAULT '0.00',
  `busWorks` decimal(10,2) DEFAULT '0.00',
  `otherExp` decimal(10,2) DEFAULT '0.00',
  `totalExpenditures` decimal(10,2) DEFAULT '0.00',
  `balance` decimal(10,2) DEFAULT '0.00',
  `driverId` int DEFAULT NULL,
  `conductorId` int DEFAULT NULL,
  `cid` int NOT NULL,
  `luggageAddWithTotalSale` tinyint(1) DEFAULT '0',
  `mainFuelSameAsFixedFuel` tinyint(1) DEFAULT '0',
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isCancel` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `routeId` (`routeId`),
  KEY `driverId` (`driverId`),
  KEY `conductorId` (`conductorId`),
  KEY `cid` (`cid`),
  CONSTRAINT `tripfleetdetails_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `routes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `staffmodel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_3` FOREIGN KEY (`conductorId`) REFERENCES `staffmodel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_4` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripfleetdetails`
--

LOCK TABLES `tripfleetdetails` WRITE;
/*!40000 ALTER TABLE `tripfleetdetails` DISABLE KEYS */;
INSERT INTO `tripfleetdetails` VALUES (1,'Khunta To Bhubaneswar',3,'2025-10-01','od01ag4088',3900.00,6600.00,0.00,10500.00,13880.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,-4500.00,1,10,1,0,0,0,'2025-11-11 08:26:35','2025-11-11 08:26:35',NULL),(2,'Khunta To Bhubaneswar',3,'2025-10-02','od01ag4088',9000.00,11600.00,0.00,20600.00,12400.00,0.00,15000.00,0.00,0.00,0.00,0.00,400.00,0.00,15400.00,5200.00,8,2,1,0,0,0,'2025-11-11 08:27:19','2025-11-11 08:27:19',NULL),(3,'Khunta To Bhubaneswar',3,'2025-10-03','od01ag4088',6000.00,15000.00,0.00,21000.00,13510.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,6000.00,1,10,1,0,0,0,'2025-11-11 08:28:05','2025-11-11 08:28:05',NULL),(4,'Khunta To Bhubaneswar',3,'2025-10-04','od01ag4088',3000.00,13000.00,0.00,16000.00,13710.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,1000.00,8,6,1,0,0,0,'2025-11-11 08:28:58','2025-11-11 08:28:58',NULL),(5,'Khunta To Bhubaneswar',3,'2025-10-05','od01ag4088',13800.00,10460.00,0.00,24260.00,13020.00,0.00,15000.00,0.00,0.00,0.00,0.00,540.00,0.00,15540.00,8720.00,1,2,1,0,0,0,'2025-11-11 08:29:49','2025-11-11 08:29:49',NULL),(6,'Khunta To Bhubaneswar',3,'2025-10-06','od01ag4088',13200.00,13500.00,0.00,26700.00,13700.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,11700.00,8,10,1,0,0,0,'2025-11-11 08:30:55','2025-11-11 08:30:55',NULL),(7,'Khunta To Bhubaneswar',3,'2025-10-07','od01ag4088',16300.00,10000.00,0.00,26300.00,13730.00,0.00,15000.00,0.00,0.00,200.00,0.00,100.00,0.00,15300.00,11000.00,1,6,1,0,0,0,'2025-11-11 08:33:09','2025-11-11 08:33:09',NULL),(8,'Khunta To Bhubaneswar',3,'2025-10-08','od01ag4088',18300.00,10060.00,0.00,28360.00,13410.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,12860.00,8,2,1,0,0,0,'2025-11-11 08:34:28','2025-11-11 08:34:28',NULL),(9,'Khunta To Bhubaneswar',3,'2025-10-09','od01ag4088',12600.00,15100.00,0.00,27700.00,14280.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,12700.00,1,3,1,0,0,0,'2025-11-11 08:35:06','2025-11-11 08:35:06',NULL),(10,'Khunta To Bhubaneswar',3,'2025-10-10','od01ag4088',13500.00,14000.00,0.00,27500.00,13860.00,0.00,15000.00,0.00,0.00,0.00,0.00,200.00,0.00,15200.00,12300.00,8,6,1,0,0,0,'2025-11-11 08:36:22','2025-11-11 08:36:22',NULL),(11,'Khunta To Bhubaneswar',3,'2025-10-11','od01ag4088',13800.00,12340.00,0.00,26140.00,13930.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,10640.00,1,2,1,0,0,0,'2025-11-11 08:38:00','2025-11-11 08:38:00',NULL),(12,'Khunta To Bhubaneswar',3,'2025-10-12','od01ag4088',14100.00,15500.00,0.00,29600.00,13011.00,0.00,15000.00,0.00,0.00,0.00,0.00,100.00,0.00,15100.00,14500.00,8,3,1,0,0,0,'2025-11-11 08:42:32','2025-11-11 08:42:32',NULL),(13,'Khunta To Bhubaneswar',3,'2025-10-13','od01ag4088',13500.00,10000.00,0.00,23500.00,13720.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,8000.00,1,6,1,0,0,0,'2025-11-11 08:43:44','2025-11-11 08:43:44',NULL),(14,'Khunta To Bhubaneswar',3,'2025-10-14','od01ag4088',9900.00,10260.00,0.00,20160.00,12720.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,4660.00,8,2,1,0,0,0,'2025-11-11 08:44:58','2025-11-11 08:44:58',NULL),(15,'Khunta To Bhubaneswar',3,'2025-10-15','od01ag4088',7200.00,10000.00,0.00,17200.00,13420.00,0.00,15000.00,0.00,0.00,0.00,0.00,540.00,0.00,15540.00,1660.00,1,3,1,0,0,0,'2025-11-11 08:47:51','2025-11-11 08:47:51',NULL),(18,'Khunta To Bhubaneswar',3,'2025-10-16','od01ag4088',5000.00,13000.00,0.00,18000.00,12060.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,3000.00,8,6,1,0,0,0,'2025-11-11 08:54:55','2025-11-11 08:54:55',NULL),(19,'Khunta To Bhubaneswar',3,'2025-10-17','od01ag4088',5100.00,20650.00,0.00,25750.00,12650.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,10250.00,1,2,1,0,0,0,'2025-11-11 08:55:37','2025-11-11 08:55:37',NULL),(20,'Khunta To Bhubaneswar',3,'2025-10-18','od01ag4088',4500.00,16730.00,0.00,21230.00,12600.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,6230.00,8,3,1,0,0,0,'2025-11-11 08:56:16','2025-11-11 08:56:16',NULL),(21,'Khunta To Bhubaneswar',3,'2025-10-19','od01ag4088',9500.00,18500.00,0.00,28000.00,13750.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,12500.00,7,6,1,0,0,0,'2025-11-11 08:57:00','2025-11-11 08:57:00',NULL),(22,'Khunta To Bhubaneswar',3,'2025-10-20','od01ag4088',6000.00,11610.00,0.00,17610.00,12290.00,0.00,15000.00,0.00,0.00,0.00,0.00,350.00,0.00,15350.00,2260.00,8,2,1,0,0,0,'2025-11-11 08:58:02','2025-11-11 08:58:02',NULL),(23,'Khunta To Bhubaneswar',3,'2025-10-21','od01ag4088',9000.00,7950.00,0.00,16950.00,12490.00,0.00,15000.00,0.00,0.00,500.00,0.00,800.00,0.00,16300.00,650.00,7,3,1,0,0,0,'2025-11-11 09:01:30','2025-11-11 09:01:30',NULL),(24,'Khunta To Bhubaneswar',3,'2025-10-22','od01ag4088',12000.00,12000.00,0.00,24000.00,12577.00,0.00,15000.00,0.00,0.00,500.00,0.00,200.00,0.00,15700.00,8300.00,8,6,1,0,0,0,'2025-11-11 09:02:17','2025-11-11 09:02:17',NULL),(25,'Khunta To Bhubaneswar',3,'2025-10-23','od01ag4088',13500.00,10430.00,0.00,23930.00,12830.00,0.00,15000.00,0.00,0.00,2530.00,0.00,250.00,0.00,17780.00,6150.00,8,6,1,0,0,0,'2025-11-11 09:04:16','2025-11-11 09:04:16',NULL),(26,'Khunta To Bhubaneswar',3,'2025-10-24','od01ag4088',11100.00,14150.00,0.00,25250.00,12810.00,0.00,15000.00,0.00,0.00,500.00,100.00,0.00,0.00,15600.00,9650.00,8,3,1,0,0,0,'2025-11-11 09:05:11','2025-11-11 09:05:11',NULL),(27,'Khunta To Bhubaneswar',3,'2025-10-25','od01ag4088',12000.00,12000.00,0.00,24000.00,13370.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,8500.00,1,6,1,0,0,0,'2025-11-11 09:05:57','2025-11-11 09:05:57',NULL),(28,'Khunta To Bhubaneswar',3,'2025-10-26','od01ag4088',17100.00,10310.00,0.00,27410.00,13030.00,0.00,15000.00,0.00,0.00,500.00,200.00,0.00,0.00,15700.00,11710.00,8,2,1,0,0,0,'2025-11-11 09:07:09','2025-11-11 09:07:09',NULL),(29,'Khunta To Bhubaneswar',3,'2025-10-27','od01ag4088',7200.00,8900.00,0.00,16100.00,13410.00,0.00,15000.00,0.00,0.00,600.00,100.00,200.00,0.00,15900.00,200.00,1,3,1,0,0,0,'2025-11-11 09:08:06','2025-11-11 09:08:06',NULL),(30,'Khunta To Bhubaneswar',3,'2025-10-28','od01ag4088',5000.00,10500.00,0.00,15500.00,11760.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,500.00,8,6,1,0,0,0,'2025-11-11 09:09:05','2025-11-11 09:09:05',NULL),(31,'Khunta To Bhubaneswar',3,'2025-10-29','od01ag4088',6900.00,10190.00,0.00,17090.00,11950.00,0.00,15000.00,0.00,0.00,0.00,0.00,0.00,0.00,15000.00,2090.00,1,2,1,0,0,0,'2025-11-11 09:10:08','2025-11-11 09:10:08',NULL),(32,'Khunta To Bhubaneswar',3,'2025-10-30','od01ag4088',12300.00,11800.00,0.00,24100.00,12152.00,0.00,15000.00,0.00,0.00,500.00,100.00,200.00,0.00,15800.00,8300.00,7,3,1,0,0,0,'2025-11-11 09:11:14','2025-11-11 09:11:14',NULL),(33,'Khunta To Bhubaneswar',3,'2025-10-31','od01ag4088',9000.00,14500.00,0.00,23500.00,12680.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,8000.00,1,6,1,0,0,0,'2025-11-11 09:11:48','2025-11-11 09:11:48',NULL),(34,'Khunta To Bhubaneswar',3,'2025-11-01','od01ag4088',9300.00,15090.00,0.00,24390.00,12750.00,0.00,15000.00,0.00,0.00,0.00,0.00,500.00,0.00,15500.00,8890.00,8,2,1,0,0,0,'2025-11-11 09:14:41','2025-11-11 09:14:41',NULL),(35,'Khunta To Bhubaneswar',3,'2025-11-02','od01ag4088',13500.00,14800.00,0.00,28300.00,13290.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,12800.00,1,3,1,0,0,0,'2025-11-11 09:15:41','2025-11-11 09:15:41',NULL),(36,'Khunta To Bhubaneswar',3,'2025-11-03','od01ag4088',8500.00,13000.00,0.00,21500.00,12190.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,6000.00,8,6,1,0,0,0,'2025-11-11 09:16:38','2025-11-11 09:16:38',NULL),(37,'Khunta To Bhubaneswar',3,'2025-11-04','od01ag4088',6600.00,16090.00,0.00,22690.00,13000.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,7190.00,1,2,1,0,0,0,'2025-11-11 09:17:20','2025-11-11 09:17:20',NULL),(38,'Khunta To Bhubaneswar',3,'2025-11-05','od01ag4088',12000.00,7000.00,0.00,19000.00,11700.00,0.00,15000.00,0.00,0.00,680.00,0.00,300.00,0.00,15980.00,3020.00,8,3,1,0,0,0,'2025-11-11 09:19:39','2025-11-11 09:19:39',NULL),(39,'Khunta To Bhubaneswar',3,'2025-11-06','od01ag4088',5500.00,17000.00,0.00,22500.00,12190.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,7000.00,1,6,1,0,0,0,'2025-11-11 09:22:08','2025-11-11 09:22:08',NULL),(40,'Khunta To Bhubaneswar',3,'2025-11-07','od01ag4088',10500.00,12340.00,0.00,22840.00,12610.00,0.00,15000.00,0.00,0.00,500.00,0.00,0.00,0.00,15500.00,7340.00,8,2,1,0,0,0,'2025-11-11 09:23:56','2025-11-11 09:23:56',NULL),(41,'Khunta To Bhubaneswar',3,'2025-11-08','od01ag4088',7500.00,13100.00,0.00,20600.00,13010.00,0.00,15000.00,0.00,0.00,0.00,0.00,300.00,0.00,15300.00,5300.00,1,3,1,0,0,0,'2025-11-11 09:25:27','2025-11-11 09:25:27',NULL),(42,'Khunta To Bhubaneswar',3,'2025-11-09','od01ag4088',14500.00,13500.00,0.00,28000.00,11900.00,0.00,15000.00,0.00,0.00,500.00,100.00,0.00,0.00,15600.00,12400.00,8,6,1,0,0,0,'2025-11-11 09:33:48','2025-11-11 09:33:48',NULL),(43,'Badsahi To Bhubaneswar',5,'2025-10-02','OD05BK0717',1500.00,11690.00,0.00,13190.00,12185.00,0.00,12185.00,0.00,0.00,0.00,0.00,0.00,0.00,12185.00,1005.00,9,4,1,0,1,0,'2025-11-12 05:22:37','2025-11-12 05:22:37',0),(44,'Badsahi To Bhubaneswar',5,'2025-10-03','OD05BK0717',2500.00,7000.00,0.00,9500.00,11690.00,0.00,11690.00,0.00,0.00,0.00,0.00,0.00,0.00,11690.00,-2190.00,9,4,1,0,1,0,'2025-11-12 05:38:04','2025-11-12 05:38:04',0),(45,'Badsahi To Bhubaneswar',5,'2025-10-04','OD05BK0717',5000.00,6300.00,0.00,11300.00,10310.00,0.00,10310.00,0.00,0.00,0.00,0.00,0.00,0.00,10310.00,990.00,9,4,1,0,1,0,'2025-11-12 05:38:49','2025-11-12 05:38:49',0),(46,'Badsahi To Bhubaneswar',5,'2025-10-05','OD05BK0717',9000.00,5000.00,0.00,14000.00,11600.00,0.00,11600.00,0.00,0.00,0.00,0.00,0.00,0.00,11600.00,2400.00,13,12,1,0,1,0,'2025-11-12 05:42:50','2025-11-12 05:42:50',0),(47,'Badsahi To Bhubaneswar',5,'2025-10-06','OD05BK0717',5000.00,5670.00,0.00,10670.00,11000.00,0.00,11000.00,0.00,0.00,0.00,0.00,0.00,0.00,11000.00,-330.00,9,4,1,0,1,0,'2025-11-12 05:45:12','2025-11-12 05:45:12',0),(48,'Badsahi To Bhubaneswar',5,'2025-10-07','OD05BK0717',8400.00,3000.00,0.00,11400.00,11200.00,0.00,11200.00,0.00,0.00,0.00,0.00,0.00,0.00,11200.00,200.00,13,12,1,0,1,0,'2025-11-12 05:46:42','2025-11-12 05:46:42',0),(49,'Badsahi To Bhubaneswar',5,'2025-10-08','OD05BK0717',9000.00,3540.00,0.00,12540.00,11080.00,0.00,11080.00,0.00,0.00,0.00,0.00,0.00,0.00,11080.00,1460.00,9,4,1,0,1,0,'2025-11-12 05:51:50','2025-11-12 05:51:50',0),(50,'Badsahi To Bhubaneswar',5,'2025-10-09','OD05BK0717',6000.00,7250.00,0.00,13250.00,11950.00,0.00,11950.00,0.00,0.00,0.00,0.00,200.00,0.00,12150.00,1100.00,13,4,1,0,1,0,'2025-11-12 05:56:59','2025-11-12 05:56:59',0),(51,'Badsahi To Bhubaneswar',5,'2025-10-10','OD05BK0717',7000.00,5050.00,0.00,12050.00,11530.00,0.00,11530.00,0.00,0.00,0.00,0.00,0.00,0.00,11530.00,520.00,9,4,1,0,1,0,'2025-11-12 05:58:49','2025-11-12 05:58:49',0),(52,'Badsahi To Bhubaneswar',5,'2025-10-11','',5000.00,6760.00,0.00,11760.00,11560.00,0.00,11560.00,0.00,0.00,0.00,0.00,0.00,0.00,11560.00,200.00,13,4,1,0,1,0,'2025-11-12 06:00:39','2025-11-12 06:00:39',0),(53,'Badsahi To Bhubaneswar',5,'2025-10-12','OD05BK0717',7000.00,7500.00,0.00,14500.00,11000.00,0.00,11000.00,0.00,0.00,0.00,0.00,0.00,0.00,11000.00,3500.00,9,4,1,0,1,0,'2025-11-12 06:01:59','2025-11-12 06:01:59',0),(54,'Badsahi To Bhubaneswar',5,'2025-10-13','OD05BK0717',7430.00,6000.00,0.00,13430.00,11630.00,0.00,11630.00,0.00,0.00,0.00,0.00,0.00,0.00,11630.00,1800.00,13,4,1,0,1,0,'2025-11-12 06:03:29','2025-11-12 06:03:29',0),(55,'Badsahi To Bhubaneswar',5,'2025-10-14','OD05BK0717',3000.00,6000.00,0.00,9000.00,10870.00,0.00,10870.00,0.00,0.00,0.00,0.00,0.00,0.00,10870.00,-1870.00,9,4,1,0,1,0,'2025-11-12 06:04:53','2025-11-12 06:04:53',0),(56,'Badsahi To Bhubaneswar',5,'2025-10-15','OD05BK0717',7120.00,5000.00,0.00,12120.00,11020.00,0.00,11020.00,0.00,0.00,0.00,0.00,0.00,0.00,11020.00,1100.00,13,4,1,0,1,0,'2025-11-12 06:06:10','2025-11-12 06:06:10',0),(57,'Badsahi To Bhubaneswar',5,'2025-10-16','OD05BK0717',1000.00,6000.00,0.00,7000.00,10980.00,0.00,10980.00,0.00,0.00,0.00,0.00,0.00,0.00,10980.00,-3980.00,9,4,1,0,1,0,'2025-11-12 06:07:45','2025-11-12 06:07:45',0),(58,'Badsahi To Bhubaneswar',5,'2025-10-17','OD05BK0717',1200.00,9720.00,0.00,10920.00,10750.00,0.00,10750.00,0.00,0.00,0.00,0.00,0.00,0.00,10750.00,170.00,13,4,1,0,1,0,'2025-11-12 06:09:54','2025-11-12 06:09:54',0),(59,'Badsahi To Bhubaneswar',5,'2025-10-18','OD05BK0717',300.00,11720.00,0.00,12020.00,10720.00,0.00,10720.00,0.00,0.00,0.00,0.00,0.00,0.00,10720.00,1300.00,9,4,1,0,1,0,'2025-11-12 06:11:06','2025-11-12 06:11:06',0),(60,'Badsahi To Bhubaneswar',5,'2025-10-21','OD05BK0717',4500.00,8500.00,0.00,13000.00,12800.00,0.00,12800.00,0.00,0.00,0.00,0.00,0.00,0.00,12800.00,200.00,13,5,1,0,1,0,'2025-11-12 06:13:12','2025-11-12 06:13:12',0),(61,'Badsahi To Bhubaneswar',5,'2025-10-22','OD05BK0717',8560.00,5000.00,0.00,13560.00,11260.00,0.00,11260.00,0.00,0.00,0.00,0.00,0.00,0.00,11260.00,2300.00,9,4,1,0,1,0,'2025-11-12 06:14:15','2025-11-12 06:14:15',0),(62,'Badsahi To Bhubaneswar',5,'2025-10-23','OD05BK0717',8000.00,5500.00,0.00,13500.00,12000.00,0.00,12000.00,0.00,0.00,0.00,0.00,0.00,0.00,12000.00,1500.00,13,5,1,0,1,0,'2025-11-12 06:15:33','2025-11-12 06:15:33',0),(63,'Badsahi To Bhubaneswar',5,'2025-10-24','OD05BK0717',4600.00,6500.00,0.00,11100.00,10820.00,0.00,10820.00,0.00,0.00,0.00,0.00,100.00,0.00,10920.00,180.00,9,4,1,0,1,0,'2025-11-12 06:22:22','2025-11-12 06:22:22',0),(64,'Badsahi To Bhubaneswar',5,'2025-10-25','OD05BK0717',7000.00,5100.00,0.00,12100.00,11600.00,0.00,11600.00,0.00,0.00,0.00,0.00,0.00,0.00,11600.00,500.00,13,5,1,0,1,0,'2025-11-12 06:23:58','2025-11-12 06:23:58',0),(65,'Badsahi To Bhubaneswar',5,'2025-10-26','OD05BK0717',8000.00,5000.00,0.00,13000.00,10950.00,0.00,10950.00,0.00,0.00,0.00,0.00,0.00,0.00,10950.00,2050.00,9,4,1,0,1,0,'2025-11-12 06:25:16','2025-11-12 06:25:16',0),(66,'Badsahi To Bhubaneswar',5,'2025-10-27','OD05BK0717',2500.00,6000.00,0.00,8500.00,11650.00,0.00,11650.00,0.00,0.00,0.00,0.00,200.00,0.00,11850.00,-3350.00,13,5,1,0,1,0,'2025-11-12 06:26:19','2025-11-12 06:26:19',0),(67,'Badsahi To Bhubaneswar',5,'2025-10-30','OD05BK0717',4400.00,6000.00,0.00,10400.00,10053.00,0.00,10053.00,0.00,0.00,0.00,0.00,700.00,0.00,10753.00,-353.00,9,5,1,0,1,0,'2025-11-12 06:28:41','2025-11-12 06:28:41',0),(68,'Badsahi To Bhubaneswar',5,'2025-10-31','OD05BK0717',4500.00,6500.00,0.00,11000.00,10550.00,0.00,10550.00,0.00,0.00,0.00,0.00,0.00,0.00,10550.00,450.00,11,5,1,0,1,0,'2025-11-12 06:29:50','2025-11-12 06:29:50',0),(69,'Badsahi To Bhubaneswar',5,'2025-11-01','OD05BK0717',1400.00,7000.00,0.00,8400.00,10710.00,0.00,10710.00,0.00,0.00,0.00,0.00,0.00,0.00,10710.00,-2310.00,9,4,1,0,1,0,'2025-11-12 06:31:14','2025-11-12 06:31:14',0),(70,'Badsahi To Bhubaneswar',5,'2025-11-02','OD05BK0717',5000.00,7000.00,0.00,12000.00,11200.00,0.00,11200.00,0.00,0.00,0.00,0.00,0.00,0.00,11200.00,800.00,13,5,1,0,1,0,'2025-11-12 06:32:52','2025-11-12 06:32:52',0),(71,'Badsahi To Bhubaneswar',5,'2025-11-03','OD05BK0717',2500.00,9000.00,0.00,11500.00,10890.00,0.00,10890.00,0.00,0.00,0.00,0.00,0.00,0.00,10890.00,610.00,9,4,1,0,1,0,'2025-11-12 06:33:51','2025-11-12 06:33:51',0),(72,'Badsahi To Bhubaneswar',5,'2025-11-05','OD05BK0717',3000.00,6000.00,0.00,9000.00,12150.00,0.00,12150.00,0.00,0.00,0.00,0.00,0.00,0.00,12150.00,-3150.00,9,4,1,0,1,0,'2025-11-12 06:35:05','2025-11-12 06:35:05',0),(73,'Badsahi To Bhubaneswar',5,'2025-11-06','OD05BK0717',5000.00,6000.00,0.00,11000.00,10500.00,0.00,10500.00,0.00,0.00,0.00,0.00,0.00,0.00,10500.00,500.00,13,5,1,0,1,0,'2025-11-12 06:40:05','2025-11-12 06:40:05',0),(74,'Badsahi To Bhubaneswar',5,'2025-11-07','OD05BK0717',5000.00,6000.00,0.00,11000.00,10570.00,0.00,10570.00,0.00,0.00,0.00,0.00,0.00,0.00,10570.00,430.00,9,4,1,0,1,0,'2025-11-12 06:41:53','2025-11-12 06:41:53',0),(75,'Badsahi To Bhubaneswar',5,'2025-11-08','OD05BK0717',5700.00,6000.00,0.00,11700.00,10930.00,0.00,10930.00,0.00,0.00,0.00,0.00,0.00,0.00,10930.00,770.00,13,5,1,0,1,0,'2025-11-12 06:42:44','2025-11-12 06:42:44',0),(76,'Badsahi To Bhubaneswar',5,'2025-11-09','OD05BK0717',7000.00,6000.00,0.00,13000.00,9830.00,0.00,9830.00,0.00,0.00,0.00,0.00,0.00,0.00,9830.00,3170.00,9,4,1,0,1,0,'2025-11-12 06:43:50','2025-11-12 06:43:50',0),(77,'Badsahi To Bhubaneswar',5,'2025-11-10','OD05BK0717',4500.00,7500.00,0.00,12000.00,10800.00,0.00,10800.00,0.00,0.00,0.00,0.00,0.00,0.00,10800.00,1200.00,13,5,1,0,1,0,'2025-11-12 06:44:46','2025-11-12 06:44:46',0);
/*!40000 ALTER TABLE `tripfleetdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiclemodels`
--

DROP TABLE IF EXISTS `vehiclemodels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiclemodels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerName` varchar(255) NOT NULL,
  `vehicleNumber` varchar(255) NOT NULL,
  `chassicNumber` varchar(255) NOT NULL,
  `engineNumber` varchar(255) NOT NULL,
  `taxUpto` datetime NOT NULL,
  `fitnessUpto` datetime NOT NULL,
  `insuranceUpto` datetime NOT NULL,
  `puccUpto` datetime NOT NULL,
  `cid` int NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicleNumber` (`vehicleNumber`),
  UNIQUE KEY `chassicNumber` (`chassicNumber`),
  UNIQUE KEY `engineNumber` (`engineNumber`),
  KEY `cid` (`cid`),
  CONSTRAINT `vehiclemodels_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiclemodels`
--

LOCK TABLES `vehiclemodels` WRITE;
/*!40000 ALTER TABLE `vehiclemodels` DISABLE KEYS */;
INSERT INTO `vehiclemodels` VALUES (1,'Rohit Kumar Rana','od01ag4088','MB1PBEFD4GEYV5984','GYEZ414225','2025-10-31 00:00:00','2026-04-11 00:00:00','2026-02-17 00:00:00','2026-01-27 00:00:00',1,0,'2025-10-14 10:04:36','2025-11-03 09:52:52',1),(2,'Pranati Sau','WB496136','MB1PEECD6PALN9426','PLEZ407853','2025-12-31 00:00:00','2026-04-17 00:00:00','2026-03-30 00:00:00','2026-05-26 00:00:00',1,0,'2025-10-14 10:33:50','2025-10-14 10:33:50',1),(3,'Mirza Gausaralli Baig','OD05BK0717','MB1PAECD1NEEJ1940','NEEZ415663','2025-10-31 00:00:00','2027-02-03 00:00:00','2026-01-20 00:00:00','2026-06-13 00:00:00',1,0,'2025-10-24 08:45:45','2025-11-01 11:46:33',1),(4,'Kamala Kanta Rana','OD01G8888','MB1PBEJC8EEDM1652','EDEZ400881','2025-08-31 00:00:00','2026-01-17 00:00:00','2026-03-20 00:00:00','2025-09-19 00:00:00',1,0,'2025-10-24 08:52:47','2025-10-24 08:52:47',1);
/*!40000 ALTER TABLE `vehiclemodels` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 14:15:55
