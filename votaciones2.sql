-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: votaciones
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int unsigned NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UNIQUE` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','0000'),(2,'pepe','0000'),(3,'user','1234');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `fecha` date NOT NULL,
  `nro` int unsigned NOT NULL,
  `dni` varchar(30) NOT NULL,
  `president` varchar(100) NOT NULL,
  `secretary` varchar(200) NOT NULL,
  PRIMARY KEY (`fecha`,`nro`,`dni`),
  KEY `nro_idx` (`nro`),
  KEY `dni_idx` (`dni`),
  CONSTRAINT `dni` FOREIGN KEY (`dni`) REFERENCES `student` (`dni`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `nro` FOREIGN KEY (`nro`) REFERENCES `lists` (`nro_list`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES ('2023-08-10',1,'34567890','Juan Pérez','Andrea López'),('2023-08-10',2,'45678901','Ana Gómez','Carlos Rodríguez'),('2023-08-10',3,'23456791','Marcela Martínez','Luis López'),('2023-08-10',4,'34567891','María Rodríguez','Juan Pérez'),('2023-08-10',5,'23456790','Andrea López','Daniel Martínez'),('2023-08-10',6,'34567892','Pedro Hernández','Sara Mendoza'),('2023-08-10',7,'56789013','Laura García','María Rodríguez'),('2023-08-10',8,'34567894','Daniel Martínez','María Rodríguez'),('2023-08-10',9,'45678902','Ana Gómez','Daniel Martínez'),('2023-08-10',10,'56789015','Isabel Ramírez','Miguel García'),('2023-08-10',11,'89012346','Lucía Hernández','Emilio Pérez'),('2023-08-10',12,'90123457','Emilio Pérez','Lucía Hernández'),('2023-08-10',13,'56789012','Luis Martínez','Laura García'),('2023-08-10',14,'34567895','Luis López','Marcela Martínez'),('2023-08-10',15,'45678902','Carlos Rodríguez','Ana Gómez'),('2023-08-10',16,'45678903','Miguel García','Ana Gómez'),('2023-08-10',17,'34567893','Luis López','Sara Mendoza'),('2023-08-10',18,'45678905','Carlos Rodríguez','Luis López'),('2023-08-10',19,'56789014','Julia Díaz','Carlos Rodríguez'),('2023-08-10',20,'67890125','Fernando Díaz','Carla González');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committee`
--

DROP TABLE IF EXISTS `committee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committee` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_votes` int unsigned NOT NULL,
  `nro` int unsigned NOT NULL,
  `id_electoral_table` int unsigned NOT NULL,
  PRIMARY KEY (`id`,`id_votes`),
  KEY `nro,id_electoral_table_idx` (`nro`,`id_electoral_table`),
  KEY `id_vote_idx` (`id_votes`),
  CONSTRAINT `id_votes1` FOREIGN KEY (`id_votes`) REFERENCES `votes` (`id_votes`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `nro,id_electoral_table` FOREIGN KEY (`nro`, `id_electoral_table`) REFERENCES `vote_reg` (`nro`, `id_electoral_table`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committee`
--

LOCK TABLES `committee` WRITE;
/*!40000 ALTER TABLE `committee` DISABLE KEYS */;
INSERT INTO `committee` VALUES (1,1,1,1),(3,3,2,3),(5,5,3,5),(7,7,4,7),(9,9,5,9),(2,2,11,2),(4,4,12,4),(6,6,13,6),(8,8,14,8),(10,10,15,10);
/*!40000 ALTER TABLE `committee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electoral_tables`
--

DROP TABLE IF EXISTS `electoral_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electoral_tables` (
  `id_table` int unsigned NOT NULL AUTO_INCREMENT,
  `id_votes` int unsigned NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id_table`,`id_votes`),
  KEY `id_votes_idx` (`id_votes`),
  CONSTRAINT `id_vote` FOREIGN KEY (`id_votes`) REFERENCES `votes` (`id_votes`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electoral_tables`
--

LOCK TABLES `electoral_tables` WRITE;
/*!40000 ALTER TABLE `electoral_tables` DISABLE KEYS */;
INSERT INTO `electoral_tables` VALUES (1,1,'Mesa de votación de 1ero A'),(2,2,'Mesa de votación de 2do B'),(3,3,'Mesa de votación de 3ro C'),(4,4,'Mesa de votación de 4to A'),(5,5,'Mesa de votación de 5to B'),(6,6,'Mesa de votación de 6to C'),(7,7,'Mesa de votación de 1ero B'),(8,8,'Mesa de votación de 2do C'),(9,9,'Mesa de votación de 3ro A'),(10,10,'Mesa de votación de 4to B'),(11,1,'Mesa de votación de 1ero A'),(12,2,'Mesa de votación de 2do B'),(13,3,'Mesa de votación de 3ro C'),(14,4,'Mesa de votación de 4to A'),(15,5,'Mesa de votación de 5to B'),(16,6,'Mesa de votación de 6to C'),(17,7,'Mesa de votación de 1ero B'),(18,8,'Mesa de votación de 2do C'),(19,9,'Mesa de votación de 3ro A'),(20,10,'Mesa de votación de 4to B');
/*!40000 ALTER TABLE `electoral_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lists` (
  `nro_list` int unsigned NOT NULL,
  `id_votes` int unsigned NOT NULL,
  `description` text NOT NULL,
  `ticket` blob,
  `cant_votes` int DEFAULT NULL,
  PRIMARY KEY (`nro_list`,`id_votes`),
  KEY `id_votes_idx` (`id_votes`),
  CONSTRAINT `id_votes` FOREIGN KEY (`id_votes`) REFERENCES `votes` (`id_votes`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,1,'Lista A - Propuestas para el cambio',NULL,NULL),(2,2,'Lista B - Mejoras en la infraestructura',NULL,NULL),(3,3,'Lista C - Eventos anuales y recreativos',NULL,NULL),(4,4,'Lista D - Políticas de teletrabajo',NULL,NULL),(5,5,'Lista E - Representantes estudiantiles',NULL,NULL),(6,6,'Lista F - Actividades recreativas',NULL,NULL),(7,7,'Lista G - Uso de energías renovables',NULL,NULL),(8,8,'Lista H - Junta directiva',NULL,NULL),(9,9,'Lista I - Incentivos y reconocimientos',NULL,NULL),(10,10,'Lista J - Ubicación de la nueva sede',NULL,NULL),(11,1,'Lista K - Propuestas innovadoras',NULL,NULL),(12,2,'Lista L - Modernización de instalaciones',NULL,NULL),(13,3,'Lista M - Diversión y entretenimiento',NULL,NULL),(14,4,'Lista N - Flexibilidad en horarios',NULL,NULL),(15,5,'Lista O - Voces estudiantiles',NULL,NULL),(16,6,'Lista P - Fomento del deporte',NULL,NULL),(17,7,'Lista Q - Energías limpias y sostenibles',NULL,NULL),(18,8,'Lista R - Liderazgo y colaboración',NULL,NULL),(19,9,'Lista S - Reconocimiento al desempeño',NULL,NULL),(20,10,'Lista T - Futuro de nuestras instalaciones',NULL,NULL);
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `dni` varchar(30) NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `course` varchar(45) NOT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `delegate` varchar(100) NOT NULL,
  `id_mesa` int unsigned NOT NULL,
  PRIMARY KEY (`dni`),
  KEY `id_mesa_idx` (`id_mesa`),
  CONSTRAINT `id_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `electoral_tables` (`id_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('18293748','Sebastian','Fermanelli','2001-07-07','San Juan 3092','sebastian@gmail.com','1247492837','1',NULL,'Juancito',1),('23456790','Andrea','López','1994-01-02','Calle 456','andrea@example.com','3456789012','1A',NULL,'Daniel Martínez',5),('23456791','Marcela','Martínez','2019-04-15','Boulevard 012','marcela@example.com','1234567890','3C',NULL,'Luis López',3),('34567890','Juan','Pérez','1990-01-15','Calle 123','juan@example.com','1234567890','1',NULL,'María López',1),('34567891','María','Rodríguez','2002-11-05','Calle 456','maria@example.com','4567890123','4',NULL,'Juan Pérez',4),('34567892','Pedro','Hernández','2010-10-15','Calle 123','pedro@example.com','7890123456','1',NULL,'Sara Mendoza',7),('34567893','Diego','Ramírez','2019-11-10','Calle 456','diego@example.com','0123456789','4',NULL,'Julia Díaz',10),('34567894','Daniel','Martínez','1998-11-20','Avenida 789','daniel@example.com','4567890123','2B',NULL,'Andrea López',6),('34567895','Luis','López','2020-10-02','Calle 123','luis@example.com','2345678901','4A',NULL,'Marcela Martínez',4),('45678901','Ana','Gómez','1994-02-20','Avenida 456','ana@example.com','2345678901','2',NULL,'Carlos Rodríguez',2),('45678902','Carlos','López','2005-01-30','Avenida 789','carlos@example.com','5678901234','5',NULL,'Ana Gómez',5),('45678903','Sara','Mendoza','2013-05-05','Avenida 456','sara@example.com','8901234567','2',NULL,'Pedro Hernández',8),('45678905','Miguel','García','2001-03-15','Boulevard 012','miguel@example.com','5678901234','3C',NULL,'Isabel Ramírez',7),('56789012','Luis','Martínez','1998-05-10','Boulevard 789','luis@example.com','3456789012','3',NULL,'Laura García',3),('56789013','Laura','García','2008-04-25','Boulevard 012','laura@example.com','6789012345','6',NULL,'Luis Martínez',6),('56789014','Julia','Díaz','2016-01-20','Boulevard 789','julia@example.com','9012345678','3',NULL,'Diego Ramírez',9),('56789015','Isabel','Ramírez','2004-07-10','Calle 123','isabel@example.com','6789012345','4A',NULL,'Miguel García',8),('67890125','Fernando','Díaz','2009-05-05','Avenida 456','fernando@example.com','7890123456','5B',NULL,'Carla González',9),('78901235','Carla','González','2012-02-28','Boulevard 789','carla@example.com','8901234567','6C',NULL,'Fernando Díaz',10),('89012346','Lucía','Hernández','2014-05-10','Calle 456','lucia@example.com','9012345678','1A',NULL,'Emilio Pérez',1),('90123457','Emilio','Pérez','2017-01-25','Avenida 789','emilio@example.com','0123456789','2B',NULL,'Lucía Hernández',2);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_reg`
--

DROP TABLE IF EXISTS `vote_reg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_reg` (
  `nro` int unsigned NOT NULL,
  `id_electoral_table` int unsigned NOT NULL,
  `id_voto` int unsigned NOT NULL,
  PRIMARY KEY (`nro`,`id_electoral_table`,`id_voto`),
  KEY `id_electoral_table_idx` (`id_electoral_table`),
  CONSTRAINT `id_electoral_table` FOREIGN KEY (`id_electoral_table`) REFERENCES `electoral_tables` (`id_table`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `nro_` FOREIGN KEY (`nro`) REFERENCES `lists` (`nro_list`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_reg`
--

LOCK TABLES `vote_reg` WRITE;
/*!40000 ALTER TABLE `vote_reg` DISABLE KEYS */;
INSERT INTO `vote_reg` VALUES (16,1,11),(16,1,21),(14,2,10),(8,3,6),(6,4,12),(11,5,5),(3,6,15),(13,7,7),(1,8,2),(10,9,17),(5,10,3),(9,11,20),(17,12,1),(20,13,9),(12,14,14),(2,15,18),(19,16,4),(4,18,8),(18,19,13),(7,20,16);
/*!40000 ALTER TABLE `vote_reg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id_votes` int unsigned NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `total_votes` int DEFAULT NULL,
  `id_admin` int unsigned NOT NULL,
  PRIMARY KEY (`id_votes`),
  KEY `id_admins_idx` (`id_admin`),
  CONSTRAINT `id_admins` FOREIGN KEY (`id_admin`) REFERENCES `admins` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,'Votación sobre el presupuesto anual',NULL,1),(2,'Elección del nuevo presidente del club',NULL,2),(3,'Propuestas para eventos de fin de año',NULL,3),(4,'Elección de temas para conferencia',NULL,1),(5,'Propuestas de mejoras en la infraestructura',NULL,2),(6,'Selección de menú para el evento anual',NULL,3),(7,'Votación sobre políticas de teletrabajo',NULL,1),(8,'Elección de representante estudiantil',NULL,2),(9,'Propuestas de actividades recreativas',NULL,3),(10,'Votación sobre el uso de energías renovables',NULL,1),(11,'Elección de junta directiva',NULL,2),(12,'Propuestas para el plan de incentivos',NULL,3),(13,'Votación sobre la ubicación de la nueva sede',NULL,1);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 19:46:00
