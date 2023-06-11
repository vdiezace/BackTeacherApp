CREATE DATABASE  IF NOT EXISTS `appteacher-tablas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `appteacher-tablas`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: appteacher-tablas
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'mathematics','lorem ipsum'),(2,'physics','lorem ipsum'),(3,'literature','lorem ipsum'),(4,'english','lorem ipsum'),(5,'mechanics','lorem ipsum'),(6,'biology','lorem ipsum'),(7,'french','lorem ipsum'),(8,'music','lorem ipsum'),(9,'arts','lorem ipsum'),(10,'programming','lorem ipsum');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province_id` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_province1_idx` (`province_id`),
  CONSTRAINT `fk_city_province1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,57,'Alcalá de Henares'),(2,34,'Barcelona'),(3,57,'Madrid'),(4,53,'Las Palmas de Gran Canaria'),(5,31,'Llanes'),(6,36,'Trujillo'),(7,36,'Cáceres'),(8,57,'Alcorcón'),(9,67,'Sevilla'),(10,49,'Palma de Mallorca'),(11,38,'Santander'),(12,44,'Granada'),(13,63,'Vigo'),(14,64,'Salamanca'),(15,29,'Denia'),(16,69,'Reus');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teachers_id` int NOT NULL,
  `students_id` int NOT NULL,
  `creation` datetime NOT NULL,
  `title` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_hour` tinyint NOT NULL,
  `end_hour` tinyint NOT NULL,
  `start_date` date NOT NULL,
  `cancel_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_classes_teachers1_idx` (`teachers_id`),
  KEY `fk_classes_students1_idx` (`students_id`),
  CONSTRAINT `fk_classes_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_classes_teachers1` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,1,1,'2023-01-15 15:00:00',NULL,0,0,'2023-01-15',NULL),(2,2,1,'2023-01-16 15:00:00',NULL,0,0,'2023-01-15',NULL),(3,3,2,'2023-02-15 15:00:00',NULL,0,0,'2023-01-15',NULL),(4,4,3,'2023-03-15 15:00:00',NULL,0,0,'2023-01-15',NULL),(5,5,6,'2023-04-15 15:00:00',NULL,0,0,'2023-01-15',NULL),(6,6,4,'2023-05-15 15:00:00',NULL,0,0,'2023-01-15',NULL),(7,7,5,'2023-01-23 10:30:00',NULL,0,0,'2023-01-15',NULL),(8,8,7,'2023-03-23 10:30:00',NULL,0,0,'2023-01-15',NULL),(9,9,8,'2023-05-23 10:30:00',NULL,0,0,'2023-01-15',NULL),(10,10,9,'2023-01-30 10:30:00',NULL,0,0,'2023-01-15',NULL);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_id` int NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_locations_city1_idx` (`city_id`),
  CONSTRAINT `fk_locations_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,1,40.5,-30.8,'C/ falsa 1'),(2,2,41.3,2.5,'C/ buenagente 3'),(3,3,40.4,-30.8,'C/ Evergreenterrace 1'),(4,4,28,-15,'Av. Mesa y López 3'),(5,5,43.4,-4.8,'Av. la Paz 6'),(6,6,39.4,-5.8,'C/ Manuel Pardo 23'),(7,7,39.7,-6.4,'Av. Ruta de la Plata 50'),(8,8,40.3,-3.8,'Av. la Constitución 24'),(9,9,37.3,-5.9,'C/ Reyes Católicos 30'),(10,10,39.5,2.6,'Pg. de Mallorca 3'),(11,11,43.4,-3.8,'C/ Tetuan 6'),(12,12,37.1,-3.6,'C/ Concepción Arenal 28'),(13,13,42.2,-8.7,'Av. Europa 10'),(14,14,40.9,-5.6,'Av. Padre Ignacio Ellacuria 5'),(15,15,38.8,0.1,'C/ Moncada 15'),(16,16,41.1,1.08,'C/ Dali 89'),(17,1,-32,-5,'P. Sherman'),(18,1,-32,-5,'P. Sherman'),(19,1,-32,-5,'P. Sherman'),(20,1,-32,-5,'P. Sherman'),(21,1,-32,-5,'P. Sherman'),(27,16,41.6,-3.5,'Avenida de los Francos 34'),(28,16,41.6,-3.5,'Avenida de los Francos 34'),(29,16,41.6,-3.5,'Avenida de los Francos 34'),(30,16,41.6,-3.5,'Avenida de los Francos 34'),(31,16,41.6,-3.5,'Avenida de los Francos 34'),(32,16,41.6,-3.5,'Avenida de los Francos 34'),(33,16,41.6,-3.5,'Avenida de los Francos 34'),(34,16,41.6,-3.5,'Avenida de los Francos 34'),(35,16,41.6,-3.5,'Avenida de los Francos 34'),(36,16,41.6,-3.5,'Avenida de los Francos 34'),(37,16,41.6,-3.5,'Avenida de los Francos 34'),(38,16,41.6,-3.5,'Avenida de los Francos 34'),(39,16,41.6,-3.5,'Avenida de los Francos 34'),(40,16,41.6,-3.5,'Avenida de los Francos 34'),(41,16,41.6,-3.5,'Avenida de los Francos 34'),(42,16,41.6,-3.5,'Avenida de los Francos 34'),(43,16,41.6,-3.5,'Avenida de los Francos 34'),(44,16,41.6,-3.5,'Avenida de los Francos 34'),(45,16,41.6,-3.5,'Avenida de los Francos 34'),(46,16,41.6,-3.5,'Avenida de los Francos 34'),(47,16,41.6,-3.5,'Avenida de los Francos 34'),(48,16,41.6,-3.5,'Avenida de los Francos 34'),(49,16,41.6,-3.5,'Avenida de los Francos 34'),(50,16,41.6,-3.5,'Avenida de los Francos 34'),(51,16,41.6,-3.5,'Avenida de los Francos 34'),(52,16,41.6,-3.5,'Avenida de los Francos 34'),(53,16,41.6,-3.5,'Avenida de los Francos 34'),(54,16,41.6,-3.5,'Avenida de los Francos 34'),(55,16,41.6,-3.5,'Avenida de los Francos 34'),(56,16,41.6,-3.5,'Avenida de los Francos 34'),(57,16,41.6,-3.5,'Avenida de los Francos 34'),(58,16,41.6,-3.5,'Avenida de los Francos 34'),(59,16,41.6,-3.5,'Avenida de los Francos 34'),(60,16,41.6,-3.5,'Avenida de los Francos 34'),(61,16,41.6,-3.5,'Avenida de los Francos 34'),(62,16,41.6,-3.5,'Avenida de los Francos 34'),(63,16,41.6,-3.5,'Avenida de los Francos 34'),(64,16,41.6,-3.5,'Avenida de los Francos 34'),(65,16,41.6,-3.5,'Avenida de los Francos 34'),(66,16,41.6,-3.5,'Avenida de los Francos 34'),(68,16,41.6,-3.5,'Avenida de los Francos 34'),(69,16,41.6,-3.5,'Avenida de los Francos 34'),(70,16,41.6,-3.5,'Avenida de los Francos 34'),(71,6,-34,-3,'Av Federico García Lorca 2'),(72,6,-34,-3,'Av Federico García Lorca 2'),(73,6,-34,-3,'Av Federico García Lorca 2'),(74,6,-34,-3,'Av Federico García Lorca 2'),(75,3,-34,-3,'Gran Via 34'),(76,3,-34,-3,'Gran Via 23'),(77,3,-34,-3,'Gran Via 23'),(78,3,-34,-3,'Gran Via 23'),(79,3,-34,-3,'Gran Via 23'),(80,3,-34,-3,'Gran Via 23'),(81,3,-34,-3,'Gran Via 23'),(82,3,-34,-3,'Gran Via 23'),(83,3,-34,-3,'Gran Via 23'),(84,16,41.6,-3.5,'Avenida de los Francos 34'),(85,3,-34,-3,'Gran Via 23'),(86,3,-34,-3,'Gran Via 23'),(87,16,41.6,-3.5,'Avenida de los Francos 34'),(88,16,41.6,-3.5,'Avenida de los Francos 34'),(89,16,41.6,-3.5,'Avenida de los Francos 34'),(90,16,41.6,-3.5,'Avenida de los Francos 34'),(91,3,-34,-3,'Gran Via 23'),(92,16,41.6,-3.5,'Avenida de los Francos 34'),(93,16,41.6,-3.5,'Avenida de los Francos 34'),(94,3,-34,-3,'Gran Via 23'),(95,3,-34,-3,'Gran Via 23'),(96,16,41.6,-3.5,'Avenida de los Francos 34'),(98,16,41.6,-3.5,'Avenida de los Francos 34'),(99,16,41.6,-3.5,'Avenida de los Francos 34'),(100,16,41.6,-3.5,'Avenida de los Francos 34'),(101,16,41.6,-3.5,'Avenida de los Francos 34');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (27,'Álava'),(28,'Albacete'),(29,'Alicante'),(30,'Almería'),(31,'Asturias'),(32,'Ávila'),(33,'Badajoz'),(34,'Barcelona'),(35,'Burgos'),(36,'Cáceres'),(37,'Cádiz'),(38,'Cantabria'),(39,'Castellón'),(40,'Ciudad Real'),(41,'Córdoba'),(42,'Cuenca'),(43,'Gerona'),(44,'Granada'),(45,'Guadalajara'),(46,'Guipúzcoa'),(47,'Huelva'),(48,'Huesca'),(49,'Islas Baleares'),(50,'Jaén'),(51,'La Coruña'),(52,'La Rioja'),(53,'Las Palmas'),(54,'León'),(55,'Lérida'),(56,'Lugo'),(57,'Madrid'),(58,'Málaga'),(59,'Murcia'),(60,'Navarra'),(61,'Orense'),(62,'Palencia'),(63,'Pontevedra'),(64,'Salamanca'),(65,'Santa Cruz de Tenerife'),(66,'Segovia'),(67,'Sevilla'),(68,'Soria'),(69,'Tarragona'),(70,'Teruel'),(71,'Toledo'),(72,'Valencia'),(73,'Valladolid'),(74,'Vizcaya'),(75,'Zamora'),(76,'Zaragoza'),(77,'Ceuta'),(78,'Melilla');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (19,1,1,3,'Muy buen profesor pero muy monótono','2023-01-12 23:00:00'),(20,2,2,4,'Muy amable y paciente','2023-01-14 13:00:00'),(21,3,3,3,'De los mejores que he tenido, me ayudo a superar la asignatura','2023-01-14 13:00:00'),(22,2,4,3,'Muy profesional, se nota que le gusta enseñar','2023-01-12 23:00:00'),(23,5,1,3,'En un lugar de la mancha','2023-03-15 10:00:00'),(24,6,3,5,'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...','2023-03-15 15:00:00'),(25,7,2,5,'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...','2023-04-15 10:00:00'),(26,8,8,3,'En un lugar de la mancha','2023-04-15 15:00:00'),(27,9,4,4,'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...','2023-04-25 20:00:00'),(28,10,10,3,'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...','2023-05-25 20:00:00'),(29,1,4,5,'Un profesor excepcional','2023-06-01 15:00:00'),(30,2,3,4,'Muy profesional, se nota que le gusta enseñar','2023-06-09 11:31:27'),(31,2,3,4,'Muy profesional, se nota que le gusta enseñar','2023-06-09 11:36:10'),(32,2,4,3,'Muy profesional, se nota que le gusta enseñar','2023-06-09 11:36:24');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','lorem ipsum'),(3,'teacher','lorem ipsum'),(5,'student','lorem ipsum');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `locations_id` int NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `fk_students_locations1_idx` (`locations_id`),
  CONSTRAINT `fk_students_locations1` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,5,1,'679309246','https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',1),(2,6,2,'689449246','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLlIAFf75171sJRQEG3jIteArlWpKxdJJQeSRYQSixdTBXK4lcDOKnSL7HEWPwpZwvc8&usqp=CAU',1),(3,8,3,'489309246','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpIoI76wjvQ2pq6t25TLmRAwTxv118OFKZxykoCiY_fWRtR8QRr1nWWcDtG3tHdgCuWu8&usqp=CAU',1),(4,10,4,'689309245','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',1),(5,12,5,'689309255','https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',0),(6,14,12,'679309248','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',1),(7,16,7,'679309243','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0),(8,18,15,'689309240','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',1),(9,20,9,'679309246','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',1),(10,22,16,'689309245','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',1),(12,87,59,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(13,88,60,'123456783','https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Emblem-person-red.svg/2048px-Emblem-person-red.svg.png',0),(14,90,62,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',0),(15,91,63,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',0),(16,92,64,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',0),(17,93,65,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(18,94,66,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(19,100,69,'123456783','https://i.pravatar.cc/500?u=mariadelcarmen.herreravillanueva@peticiones.online',1),(20,101,70,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(21,118,84,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(22,121,87,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(23,122,88,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(24,123,89,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(25,124,90,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(26,126,92,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(27,127,93,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(28,130,96,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1),(29,140,99,'123456783','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `locations_id` int NOT NULL,
  `price_hour` decimal(10,2) unsigned NOT NULL,
  `experience` int unsigned DEFAULT NULL,
  `is_approved` tinyint unsigned DEFAULT '0',
  `phone` varchar(15) DEFAULT NULL,
  `subject` varchar(20) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `start_class_hour` tinyint NOT NULL,
  `end_class_hour` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `fk_teachers_locations1_idx` (`locations_id`),
  CONSTRAINT `fk_teachers_locations1` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,3,1,1,15.00,4,1,'689309246','Mathematics II','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(2,4,2,1,10.00,2,1,'687309346','Physics I','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(3,7,1,1,12.00,3,1,'389389246','Applied mathematics','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(4,9,4,2,20.00,10,1,'689509226','English B2','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(5,11,6,2,30.00,50,1,'489306246','Biology IV','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(6,13,2,3,22.00,13,0,'589309246','Physics II','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(7,15,3,4,11.00,2,0,'989339246','Literature II','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(8,17,5,5,23.00,14,1,'789322246','Mechanics I','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(9,19,7,6,5.00,1,0,'689339256','French B1','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(10,21,9,7,24.00,15,0,'989339246','Drawing III','https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',0,0),(11,105,9,72,30.00,20,1,'123468025','Visual Arts','https://i.pravatar.cc/500?u=mariadelcarmen.herreravillanueva@peticiones.online',10,12),(12,108,10,74,30.00,20,0,'678234642','Intro to Programming','https://i.pravatar.cc/500?u=emilio.alvaduran@peticiones.online',9,11),(13,109,3,75,20.00,15,0,'678234642','Modern Literature','https://i.pravatar.cc/500?u=emilio.alvaduran@peticiones.online',9,11),(14,113,2,79,20.00,15,0,'678234642','Intro to Physics','https://i.pravatar.cc/500?u=graciela.ponceabeyta@peticiones.online',8,10),(15,114,2,80,20.00,15,0,'678234642','Intro to Physics','https://i.pravatar.cc/500?u=graciela.ponceabeyta@peticiones.online',8,10),(16,115,1,81,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(17,116,1,82,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(18,117,1,83,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(19,119,1,85,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(20,120,1,86,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(21,125,1,91,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(22,128,1,94,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(23,129,1,95,10.00,5,0,'678234642','Intro to Maths','https://i.pravatar.cc/500?u=ernesto.alanizcorral@peticiones.online',8,10),(24,142,1,101,10.00,5,0,'123456783','Intro to Maths','https://robohash.org/eveniettotamqui.png?size=50x50&set=set1',8,10);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `subscribed` datetime DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_role1_idx` (`role_id`),
  CONSTRAINT `fk_users_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,3,'luis2','23Luis1','luis@outlook.com','Luis Maria','Lopez','2023-02-14 15:00:00','2023-02-15 11:00:00'),(4,3,'carla24','Carla_90','carla@gmail.com','Carla','Sanchez','2023-04-23 14:00:00','2023-04-14 17:00:00'),(5,5,'g2345','gErd*67','g67@gmail.com','Gerardo','Gurtubai','2023-03-25 09:00:00','2023-03-25 12:00:00'),(6,5,'op50','O_p50','op50@gmail.com','Oscar','Puertas','2023-01-15 10:30:00',NULL),(7,3,'jose','12345678','jose@gmail.com','Jose','Martinez','2023-12-04 13:26:00','2023-12-05 15:30:00'),(8,5,'hotdog','12345678','hotdog23@gmail.com','Mariano','Guitérrez','2023-01-03 12:45:00',NULL),(9,3,'badteacher','calvo54','nomolestar@outlook.com','Jose','Lázaro','2023-02-02 16:15:00','2023-02-03 09:00:00'),(10,5,'yosoygroot','guardinesDeLaGalaxia','fernandezjm@hotmail.com','Jose Maria','Fernández','2023-04-05 23:45:00',NULL),(11,3,'machadoForever','Campos_DeCastilla','leyendoentrelineas@upf.es','Manuel','Zerpa','2023-03-17 19:00:00','2023-03-18 09:00:00'),(12,5,'sirenita','Ariel_blanc0','debora_me_lo_todo@gotail.com','Débora','Marrero','2023-05-04 03:00:00','2023-05-06 13:30:00'),(13,3,'jefinini','orgullo_Mutante*','gongoravsquevedo@gmail.com','Paula','Morales','2023-06-17 08:00:00','2023-06-17 16:30:00'),(14,5,'pelirroja_peligrosa','Forevered_365','soy_tu_pelirroja@hotmail.com','Marpili','Thomson','2023-05-18 16:00:00','2023-05-19 10:00:00'),(15,3,'caligula','imperio*otomano_69','historiantigua@yahoo.com','Wenceslao','Ordóñez','2023-02-08 22:00:00','2023-02-09 11:45:00'),(16,5,'soñador_despierto','peter*Pan_12','nlmk2043@hotmail.com','Norberto','Lopez','2023-03-02 10:15:00','2023-03-02 10:12:00'),(17,3,'juan_palomo','yomeloguiso_yomelocomo','espaguettiscarbonara@gmail.com','Juan','García','2023-04-20 15:00:00','2023-04-20 16:00:00'),(18,5,'flipado22','Ma$terDelUniverS0','0048lhq@gmail.com','Bruno','Mars','2023-01-01 00:01:00','2023-01-02 12:45:00'),(19,3,'missdaisy','patolaqueado89','señoritaescarlata024@gmail.com','Elena','Rubio','2023-03-08 14:00:00','2023-03-08 16:00:00'),(20,5,'freddy33','BohemianRhapsody7','godsavethequeen@yahoo.com','Ranatanata','Koothrappali','2023-03-30 09:00:00','2023-03-30 10:00:00'),(21,3,'herrera_J','Za$EntodaLaBoca','matesfaciles@yahoo.com','Jorge','Herrera','2023-02-18 11:30:00','2023-02-18 13:00:00'),(22,5,'aprueboporlospelos','rincondelvago3','pereza90@gmail.com','Javier','Gonzalez','2023-05-02 17:15:00','2023-05-03 10:00:00'),(24,3,'juanpe45','JP_4*g2','juanpe3@gmail.com','Juan','Pérez',NULL,NULL),(27,5,'juanpe5','JP_4GH2','juanpe4@gmail.com','Juan','Pérez',NULL,NULL),(37,3,'juanpe6','JP_4*g2','juanpe7@gmail.com','Juan','Pérez',NULL,NULL),(71,3,'juanchu23','jjh_9456','jjh10@gmail.com','Juan','Hernandez',NULL,NULL),(74,5,'juanchu7','jjh_9456','jjh6@gmail.com','Juan','Hernandez',NULL,NULL),(86,3,'belencita67','blh_9456','blh@gmail.com','Belen','Hernandez',NULL,NULL),(87,3,'LorenH67','lorDen56','loren@gmail.com','Lorenzo','Hernandez',NULL,NULL),(88,3,'carlita5','carlita*5','carlop@gmail.com','Carla','Lopez','2023-06-07 13:19:52','2023-06-07 15:58:21'),(90,3,'escar56','oscar9','escor9@gmail.com','OScar','Santana','2023-06-07 16:05:46','2023-06-07 16:06:03'),(91,3,'dieguito3','dieguito3','dieguito3@gmail.com','Diego','Perez','2023-06-07 16:08:08','2023-06-07 16:08:16'),(92,3,'cristo365','cristo365','cristo365@gmail.com','Cristo','Perez','2023-06-07 16:10:19','2023-06-07 16:10:25'),(93,3,'cristo366','cristo365','cristo3651@gmail.com','Cristobal','Perez','2023-06-07 16:11:33','2023-06-07 16:11:38'),(94,3,'carl3','carl3','carl3@gmail.com','Carlos','Perez','2023-06-07 16:12:44','2023-06-07 16:20:47'),(97,3,'jesus34','JKLM_)','jisus5@gmail.com','Jesus','Ortega','2023-06-07 22:33:23',NULL),(100,5,'carl33','carlol353','carlol@gmail.com','Carlos','Lopez','2023-06-07 23:25:30',NULL),(101,5,'carl34','carl3','carl34@gmail.com','Carlos','Lopez','2023-06-08 11:16:22','2023-06-09 00:00:22'),(102,3,'ldelgado','12345678','luciadelgado3@gmail.com','Lucia','Delgado','2023-06-08 16:51:41',NULL),(105,3,'ldelgado9','12345678','luciadelgado53@gmail.com','Lucia','Delgado','2023-06-08 16:53:51',NULL),(106,3,'dDorta2','12345678','ddorta@gmail.com','Pablo','Dorta','2023-06-08 17:36:04',NULL),(108,3,'dDorta25','12345678','ddorta25@gmail.com','Pablo','Dorta','2023-06-08 17:36:42','2023-06-08 17:37:21'),(109,3,'egarcia','12345678','egarciagarcia@gmail.com','Emilio','García','2023-06-08 17:40:06','2023-06-08 17:40:42'),(110,3,'sarbelo','12345678','sarbelo@gmail.com','Sofia','Arbeloa','2023-06-08 17:43:02',NULL),(111,3,'hsaavedra','12345678','hsaavedra@gmail.com','Helena','Saavedra','2023-06-08 17:46:52',NULL),(112,3,'hGuevara','12345678','Guevara@gmail.com','Helena','Guevara','2023-06-08 17:47:27',NULL),(113,3,'hGuevara1','12345678','Guevara1@gmail.com','Helena','Guevara','2023-06-08 17:47:42','2023-06-08 17:47:53'),(114,3,'sgomez','12345678','sgomez@gmail.com','Sandra','Gomez','2023-06-08 17:49:23','2023-06-08 17:49:29'),(115,3,'fgarcia','12345678','fgarcia@gmail.com','Federico','Garcia','2023-06-08 17:53:09','2023-06-08 17:53:27'),(116,3,'fgarcia2','12345678','fgarcia2@gmail.com','Federico','Garcia','2023-06-08 17:58:08','2023-06-08 17:58:24'),(117,3,'fgarcia5','12345678','fgarcia5@gmail.com','Federico','Garcia','2023-06-08 18:00:13','2023-06-08 18:00:36'),(118,5,'carl64','carl3','carl364@gmail.com','Carl','Lopez','2023-06-08 23:56:01','2023-06-09 00:10:37'),(119,3,'fgarcia7','12345678','fgarcia57@gmail.com','Federico','Garcia','2023-06-09 00:01:02','2023-06-09 00:18:33'),(120,3,'fgarcia67','12345678','fgarcia67@gmail.com','Federico','Garcia','2023-06-09 00:02:44','2023-06-09 00:21:42'),(121,5,'carl32','carl3','carl3164@gmail.com','Charles','Lopez','2023-06-09 00:07:59','2023-06-09 00:11:11'),(122,5,'carl352','carl3','carl3264@gmail.com','Carlitos','Lopez','2023-06-09 00:11:02','2023-06-09 00:15:11'),(123,5,'lauri','lauri','lauri@gmail.com','Laura','Lopez','2023-06-09 00:14:31','2023-06-09 00:14:37'),(124,5,'lauri2','lauri','lauri2@gmail.com','Laura','Lopez','2023-06-09 00:16:22','2023-06-09 00:16:28'),(125,3,'fgarcia267','12345678','fgarcia267@gmail.com','Federico','Garcia','2023-06-09 00:18:30','2023-06-09 00:22:07'),(126,5,'lauri3','lauri','lauri3@gmail.com','Laura','Lopez','2023-06-09 00:19:35','2023-06-09 00:19:40'),(127,5,'lauri4','lauri','lauri4@gmail.com','Laura','Lopez','2023-06-09 00:20:59','2023-06-09 00:21:04'),(128,3,'fgarcia257','12345678','fgarcia257@gmail.com','Federico','Garcia','2023-06-09 00:21:35',NULL),(129,3,'fgarcia157','12345678','fgarcia157@gmail.com','Federico','Garcia','2023-06-09 00:22:01',NULL),(130,5,'lauri5','lauri','lauri5@gmail.com','Laura','Lopez','2023-06-09 00:22:25','2023-06-09 00:22:34'),(131,1,'Alba','$2a$08$Of0lY.jqdHQ7mKWMMgLlnODZ4arxCLNnwsJ04k7XvJHHi0Y0gOX3O','albi@gmail.com','Alba','Santana','2023-06-09 14:53:04',NULL),(132,5,'Julita','Julita*2','juli5@gmail.com','Julia','García','2023-06-09 16:37:26',NULL),(135,5,'Julita2','Julita*2','juli6@gmail.com','Julia','García','2023-06-09 16:38:50',NULL),(136,5,'Julita5','Julita*2','juli7@gmail.com','Julia','García','2023-06-09 16:40:17',NULL),(138,3,'Julita1','Julita*2','julita1@gmail.com','Julia','García','2023-06-09 16:43:27',NULL),(140,5,'juanito','$2a$08$Y8s316SujOUiBgSkJ7zpv.8TOPZF4Vv97UDK30PHlxg7JIU28AS5q','junito@gmail.com','Juan','Lopez','2023-06-09 16:46:48',NULL),(141,5,'slopez','$2a$08$rPUmrPFqLyi46eTrdqBs8urVB7ChBy9TMeVQOIKatpPo1FRVmpNZ.','slopez@gmail.com','Sandra','Lopez','2023-06-09 16:49:49',NULL),(142,3,'msanchez','$2a$08$h5wqSIUuHckUJ1aaF30gDeVuNKr1qWtzqlN3tYYlB8UiONxP588aS','msanchez@gmail.com','Marta','Sanchez','2023-06-09 16:51:38',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-10 23:10:55
