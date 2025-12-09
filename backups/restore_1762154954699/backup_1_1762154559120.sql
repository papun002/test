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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backuphistories`
--

LOCK TABLES `backuphistories` WRITE;
/*!40000 ALTER TABLE `backuphistories` DISABLE KEYS */;
INSERT INTO `backuphistories` VALUES (1,'3/11/2025, 12:39:19 pm','0.02 MB','Completed','http://localhost:4000/backups/backup_1_1762153758433.sql',0,1,'2025-11-03 07:09:19','2025-11-03 07:09:19'),(2,'3/11/2025, 12:47:10 pm','0.00 MB','Completed','http://localhost:4000/backups/backup_1_1762154230367.zip',0,1,'2025-11-03 07:17:10','2025-11-03 07:17:10'),(3,'3/11/2025, 12:48:45 pm','0.00 MB','Completed','http://localhost:4000/backups/backup_1_1762154325491.zip',0,1,'2025-11-03 07:18:45','2025-11-03 07:18:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuelstations`
--

LOCK TABLES `fuelstations` WRITE;
/*!40000 ALTER TABLE `fuelstations` DISABLE KEYS */;
INSERT INTO `fuelstations` VALUES (1,'Akandaleswar Service Station','Pudasul, Rajnilagiri','123456789','[\"1\", \"3\"]',0,1,'2025-10-24 09:58:14','2025-10-24 09:58:14',1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fueltransactions`
--

LOCK TABLES `fueltransactions` WRITE;
/*!40000 ALTER TABLE `fueltransactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `fueltransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpers`
--

DROP TABLE IF EXISTS `helpers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `helpers` (
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
  CONSTRAINT `helpers_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpers`
--

LOCK TABLES `helpers` WRITE;
/*!40000 ALTER TABLE `helpers` DISABLE KEYS */;
INSERT INTO `helpers` VALUES (1,'driver','Khitish Das Babu','Gunu','9777778195','Kaptipada',1,0,'2025-10-16 10:02:38','2025-10-16 10:02:38',1),(2,'conductor','Ashok Kumar Bhuiya','Ashok','9439730668','Udala, Mayurbhanj, Odisha',1,0,'2025-10-18 11:23:37','2025-10-18 11:23:37',1),(3,'conductor','Pritam Ray','Viki','9658641862','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 08:57:00','2025-10-26 08:57:00',1),(4,'conductor','Saumyajit Jena ','bubu','7205032630','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:15:13','2025-10-26 09:15:13',1),(5,'conductor','Gobinda Behera','Budhiya','7750015290','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:19:09','2025-10-26 09:19:09',1),(6,'conductor','Ajay Kumar Patra','Ajay','7381867361','Udala, Mayurbhanj, Odisha',1,0,'2025-10-26 09:40:52','2025-10-26 09:40:52',1),(7,'driver','Madhusudhan Hembram','Madhu','9937977419','Kanahiband, Odisha',1,0,'2025-10-26 09:43:08','2025-10-26 09:43:08',1),(8,'driver','Santosh Kumar Behera','Birrapan','7848869189','Kaptipada',1,0,'2025-10-26 09:51:41','2025-10-26 09:51:41',1),(9,'driver','Balaram Majhi','Bapi Nuasahi','8917640297','Nuasahi',1,0,'2025-10-26 09:53:00','2025-10-26 09:53:00',1);
/*!40000 ALTER TABLE `helpers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,'BADSAHI TO BHUBANESWAR','od01ag4088',1,0,'2025-10-15 09:17:02','2025-10-15 09:17:02',1),(2,'Udala To Kolkata','WB496136',1,0,'2025-10-15 09:28:03','2025-10-15 09:28:03',1),(3,'Khunta To Bhubaneswar','OD01G8888',1,0,'2025-10-24 08:53:53','2025-10-24 08:53:53',1);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `routeId` (`routeId`),
  KEY `driverId` (`driverId`),
  KEY `conductorId` (`conductorId`),
  KEY `cid` (`cid`),
  CONSTRAINT `tripfleetdetails_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `routes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_2` FOREIGN KEY (`driverId`) REFERENCES `helpers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_3` FOREIGN KEY (`conductorId`) REFERENCES `helpers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tripfleetdetails_ibfk_4` FOREIGN KEY (`cid`) REFERENCES `firms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripfleetdetails`
--

LOCK TABLES `tripfleetdetails` WRITE;
/*!40000 ALTER TABLE `tripfleetdetails` DISABLE KEYS */;
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
INSERT INTO `vehiclemodels` VALUES (1,'Rohit Kumar Rana','od01ag4088','MB1PBEFD4GEYV5984','GYEZ414225','2025-10-31 00:00:00','2026-04-11 00:00:00','2026-02-17 00:00:00','2026-01-28 00:00:00',1,0,'2025-10-14 10:04:36','2025-11-01 11:12:16',1),(2,'Pranati Sau','WB496136','MB1PEECD6PALN9426','PLEZ407853','2025-12-31 00:00:00','2026-04-17 00:00:00','2026-03-30 00:00:00','2026-05-26 00:00:00',1,0,'2025-10-14 10:33:50','2025-10-14 10:33:50',1),(3,'Mirza Gausaralli Baig','OD05BK0717','MB1PAECD1NEEJ1940','NEEZ415663','2025-10-31 00:00:00','2027-02-03 00:00:00','2026-01-20 00:00:00','2026-06-13 00:00:00',1,0,'2025-10-24 08:45:45','2025-11-01 11:46:33',1),(4,'Kamala Kanta Rana','OD01G8888','MB1PBEJC8EEDM1652','EDEZ400881','2025-08-31 00:00:00','2026-01-17 00:00:00','2026-03-20 00:00:00','2025-09-19 00:00:00',1,0,'2025-10-24 08:52:47','2025-10-24 08:52:47',1);
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

-- Dump completed on 2025-11-03 12:52:39
