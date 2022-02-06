-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: Dream
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `Advice`
--

DROP TABLE IF EXISTS `Advice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Advice` (
  `adviceID` int NOT NULL AUTO_INCREMENT,
  `suggestion` varchar(255) DEFAULT NULL,
  `prodTypeID` int DEFAULT NULL,
  PRIMARY KEY (`adviceID`),
  KEY `Advice_FK` (`prodTypeID`),
  CONSTRAINT `Advice_FK` FOREIGN KEY (`prodTypeID`) REFERENCES `ProductionType` (`prodTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Advice`
--

LOCK TABLES `Advice` WRITE;
/*!40000 ALTER TABLE `Advice` DISABLE KEYS */;
/*!40000 ALTER TABLE `Advice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Agronomist`
--

DROP TABLE IF EXISTS `Agronomist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agronomist` (
  `agronomistID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`agronomistID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agronomist`
--

LOCK TABLES `Agronomist` WRITE;
/*!40000 ALTER TABLE `Agronomist` DISABLE KEYS */;
INSERT INTO `Agronomist` VALUES (1,'trp@gmail.com');
/*!40000 ALTER TABLE `Agronomist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `commentID` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `discussionID` int DEFAULT NULL,
  `farmerID` int DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  KEY `Comment_FK` (`farmerID`),
  KEY `Comment_FK_1` (`discussionID`),
  CONSTRAINT `Comment_FK` FOREIGN KEY (`farmerID`) REFERENCES `Farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_FK_1` FOREIGN KEY (`discussionID`) REFERENCES `Discussion` (`discussionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Discussion`
--

DROP TABLE IF EXISTS `Discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discussion` (
  `discussionID` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `farmerID` int DEFAULT NULL,
  PRIMARY KEY (`discussionID`),
  KEY `Discussion_FK` (`farmerID`),
  CONSTRAINT `Discussion_FK` FOREIGN KEY (`farmerID`) REFERENCES `Farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discussion`
--

LOCK TABLES `Discussion` WRITE;
/*!40000 ALTER TABLE `Discussion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Farmer`
--

DROP TABLE IF EXISTS `Farmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Farmer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `trend` tinyint(1) DEFAULT NULL,
  `locationID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Farmer_FK` (`locationID`),
  CONSTRAINT `Farmer_FK` FOREIGN KEY (`locationID`) REFERENCES `Location` (`locationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Farmer`
--

LOCK TABLES `Farmer` WRITE;
/*!40000 ALTER TABLE `Farmer` DISABLE KEYS */;
INSERT INTO `Farmer` VALUES (1,'ale@gmail.com','$2a$12$.oAVYNDyWVcJj9.JEJFuruDiLJFMWWiXJUtL6P/5aqBzS8H3y3CJO\n',1,2),(2,'fra@gmail.com','$2a$12$.oAVYNDyWVcJj9.JEJFuruDiLJFMWWiXJUtL6P/5aqBzS8H3y3CJO\n',NULL,3),(3,'bf@gmail.com','$2a$12$.oAVYNDyWVcJj9.JEJFuruDiLJFMWWiXJUtL6P/5aqBzS8H3y3CJO\n',0,3);
/*!40000 ALTER TABLE `Farmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Forecast`
--

DROP TABLE IF EXISTS `Forecast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Forecast` (
  `weather` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `locationID` int DEFAULT NULL,
  PRIMARY KEY (`weather`,`date`),
  KEY `Forecast_FK` (`locationID`),
  CONSTRAINT `Forecast_FK` FOREIGN KEY (`locationID`) REFERENCES `Location` (`locationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Forecast`
--

LOCK TABLES `Forecast` WRITE;
/*!40000 ALTER TABLE `Forecast` DISABLE KEYS */;
/*!40000 ALTER TABLE `Forecast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Location` (
  `locationID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (1,'Siddipet'),(2,'Warangal'),(3,'Peddapalli');
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PolicyMaker`
--

DROP TABLE IF EXISTS `PolicyMaker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PolicyMaker` (
  `pmID` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pmID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PolicyMaker`
--

LOCK TABLES `PolicyMaker` WRITE;
/*!40000 ALTER TABLE `PolicyMaker` DISABLE KEYS */;
INSERT INTO `PolicyMaker` VALUES (1,'123@gmail.com','$2a$12$.oAVYNDyWVcJj9.JEJFuruDiLJFMWWiXJUtL6P/5aqBzS8H3y3CJO');
/*!40000 ALTER TABLE `PolicyMaker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProdTypeFarmer`
--

DROP TABLE IF EXISTS `ProdTypeFarmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProdTypeFarmer` (
  `prodTypeID` int NOT NULL,
  `farmerID` int NOT NULL,
  PRIMARY KEY (`prodTypeID`,`farmerID`),
  KEY `ProdTypeFarmer_FK_1` (`farmerID`),
  CONSTRAINT `ProdTypeFarmer_FK` FOREIGN KEY (`prodTypeID`) REFERENCES `ProductionType` (`prodTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProdTypeFarmer_FK_1` FOREIGN KEY (`farmerID`) REFERENCES `Farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProdTypeFarmer`
--

LOCK TABLES `ProdTypeFarmer` WRITE;
/*!40000 ALTER TABLE `ProdTypeFarmer` DISABLE KEYS */;
INSERT INTO `ProdTypeFarmer` VALUES (1,1),(2,1),(3,1),(3,2),(5,2),(6,2);
/*!40000 ALTER TABLE `ProdTypeFarmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Production`
--

DROP TABLE IF EXISTS `Production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Production` (
  `productionID` int NOT NULL AUTO_INCREMENT,
  `period` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `problem` varchar(255) DEFAULT NULL,
  `prodTypeID` int DEFAULT NULL,
  `farmerID` int DEFAULT NULL,
  PRIMARY KEY (`productionID`),
  KEY `Production_FK` (`prodTypeID`),
  KEY `Production_FK_1` (`farmerID`),
  CONSTRAINT `Production_FK` FOREIGN KEY (`prodTypeID`) REFERENCES `ProductionType` (`prodTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Production_FK_1` FOREIGN KEY (`farmerID`) REFERENCES `Farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Production`
--

LOCK TABLES `Production` WRITE;
/*!40000 ALTER TABLE `Production` DISABLE KEYS */;
INSERT INTO `Production` VALUES (1,1,'2022-01-01',5,'The soil was very wet.',3,1),(2,2,'2021-12-01',10,'The soil was very wet.',5,2);
/*!40000 ALTER TABLE `Production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionType`
--

DROP TABLE IF EXISTS `ProductionType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionType` (
  `prodTypeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`prodTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionType`
--

LOCK TABLES `ProductionType` WRITE;
/*!40000 ALTER TABLE `ProductionType` DISABLE KEYS */;
INSERT INTO `ProductionType` VALUES (1,'Rice'),(2,'Maize'),(3,'Cotton'),(4,'Jowar'),(5,'Castor'),(6,'Groundnut'),(7,'Soyabean');
/*!40000 ALTER TABLE `ProductionType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Report`
--

DROP TABLE IF EXISTS `Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Report` (
  `reportID` int NOT NULL AUTO_INCREMENT,
  `prodTypeID` int DEFAULT NULL,
  `prodRateBefore` float DEFAULT NULL,
  `prodRateAfter` float DEFAULT NULL,
  `initativeID` int NOT NULL,
  PRIMARY KEY (`reportID`),
  KEY `Report_FK` (`prodTypeID`),
  KEY `Report_FK_1` (`initativeID`),
  CONSTRAINT `Report_FK` FOREIGN KEY (`prodTypeID`) REFERENCES `ProductionType` (`prodTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Report_FK_1` FOREIGN KEY (`initativeID`) REFERENCES `SteeringInitative` (`initativeID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Report`
--

LOCK TABLES `Report` WRITE;
/*!40000 ALTER TABLE `Report` DISABLE KEYS */;
INSERT INTO `Report` VALUES (1,3,5,10,2),(2,5,5,5,2);
/*!40000 ALTER TABLE `Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SteeringInitative`
--

DROP TABLE IF EXISTS `SteeringInitative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SteeringInitative` (
  `initativeID` int NOT NULL AUTO_INCREMENT,
  `agronomistID` int DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `startingDate` date DEFAULT NULL,
  `farmerID` int DEFAULT NULL,
  `pmID` int DEFAULT NULL,
  PRIMARY KEY (`initativeID`),
  KEY `SteeringInitative_FK` (`pmID`),
  KEY `SteeringInitative_FK_2` (`farmerID`),
  KEY `SteeringInitative_FK_1` (`agronomistID`),
  CONSTRAINT `SteeringInitative_FK` FOREIGN KEY (`pmID`) REFERENCES `PolicyMaker` (`pmID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `SteeringInitative_FK_1` FOREIGN KEY (`agronomistID`) REFERENCES `Agronomist` (`agronomistID`) ON UPDATE CASCADE,
  CONSTRAINT `SteeringInitative_FK_2` FOREIGN KEY (`farmerID`) REFERENCES `Farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SteeringInitative`
--

LOCK TABLES `SteeringInitative` WRITE;
/*!40000 ALTER TABLE `SteeringInitative` DISABLE KEYS */;
INSERT INTO `SteeringInitative` VALUES (1,1,1,'2022-01-01',2,1),(2,1,1,'2021-01-12',2,1),(3,1,NULL,'2022-02-01',1,1),(6,1,1,'2022-02-05',1,1),(7,1,NULL,'2022-02-05',1,1);
/*!40000 ALTER TABLE `SteeringInitative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Dream'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-06 23:11:34
