-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: appteacher-tablas
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Matemáticas','Clases de matemáticas para todos los niveles.'),(2,'Física','Aprende los principios fundamentales de la física.'),(3,'Inglés','Clases de inglés para mejorar tus habilidades de comunicación.'),(4,'Mecánica','Aprende los conceptos básicos de la mecánica.'),(5,'Biología','Descubre el mundo de la biología y sus procesos vitales.'),(6,'Francés','Clases de francés para dominar el idioma.'),(7,'Música','Explora el mundo de la música y desarrolla tus habilidades.'),(8,'Arte','Desarrolla tu creatividad a través del arte.'),(9,'Programación','Aprende a programar y desarrollar aplicaciones.');
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
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_province1_idx` (`province_id`),
  CONSTRAINT `fk_city_province1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,1,'Vitoria'),(2,2,'Albacete'),(3,3,'Alicante'),(4,4,'Almería'),(5,5,'Oviedo'),(6,6,'Ávila'),(7,7,'Badajoz'),(8,8,'Barcelona'),(9,9,'Burgos'),(10,10,'Cáceres'),(11,11,'Cádiz'),(12,12,'Santander'),(13,13,'Castellón'),(14,14,'Ciudad Real'),(15,15,'Córdoba'),(16,16,'Cuenca'),(17,17,'Gerona'),(18,18,'Granada'),(19,19,'Guadalajara'),(20,20,'San Sebastián'),(21,21,'Huelva'),(22,22,'Huesca'),(23,23,'Palma de Mallorca'),(24,24,'Jaén'),(25,25,'La Coruña'),(26,26,'Logroño'),(27,27,'Las Palmas de Gran Canaria'),(28,28,'León'),(29,29,'Lérida'),(30,30,'Lugo'),(31,31,'Madrid'),(32,32,'Málaga'),(33,33,'Murcia'),(34,34,'Pamplona'),(35,35,'Orense'),(36,36,'Palencia'),(37,37,'Pontevedra'),(38,38,'Salamanca'),(39,39,'Santa Cruz de Tenerife'),(40,40,'Segovia'),(41,41,'Sevilla'),(42,42,'Soria'),(43,43,'Tarragona'),(44,44,'Teruel'),(45,45,'Toledo'),(46,46,'Valencia'),(47,47,'Valladolid'),(48,48,'Bilbao'),(49,49,'Zamora'),(50,50,'Zaragoza');
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
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_hour` tinyint NOT NULL,
  `end_hour` tinyint NOT NULL,
  `start_date` date NOT NULL,
  `cancel_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_classes_teachers1_idx` (`teachers_id`),
  KEY `fk_classes_students1_idx` (`students_id`),
  CONSTRAINT `fk_classes_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_classes_teachers1` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,116,88,'2023-06-15 12:08:27','Arte',11,12,'2023-06-15',NULL),(2,115,55,'2023-06-15 12:08:27','Música',20,18,'2023-06-15',NULL),(3,114,88,'2023-06-15 12:08:27','Matemáticas',18,17,'2023-06-15',NULL),(4,113,44,'2023-06-15 12:08:27','Mecánica',22,17,'2023-06-15',NULL),(5,112,56,'2023-06-15 12:08:27','Física',20,14,'2023-06-15',NULL),(6,111,89,'2023-06-15 12:08:27','Programación',15,14,'2023-06-15',NULL),(7,110,43,'2023-06-15 12:08:27','Programación',14,17,'2023-06-15',NULL),(8,109,68,'2023-06-15 12:08:27','Arte',12,11,'2023-06-15',NULL),(9,108,45,'2023-06-15 12:08:27','Biología',11,11,'2023-06-15',NULL),(10,107,87,'2023-06-15 12:08:27','Arte',13,15,'2023-06-15',NULL),(11,106,55,'2023-06-15 12:08:27','Programación',9,12,'2023-06-15',NULL),(12,105,110,'2023-06-15 12:08:27','Inglés',16,9,'2023-06-15',NULL),(13,104,66,'2023-06-15 12:08:27','Física',15,11,'2023-06-15',NULL),(14,103,54,'2023-06-15 12:08:27','Mecánica',11,14,'2023-06-15',NULL),(15,102,58,'2023-06-15 12:08:27','Iglés',15,14,'2023-06-15',NULL),(16,101,69,'2023-06-15 12:08:27','Matemáticas',16,14,'2023-06-15',NULL),(17,100,58,'2023-06-15 12:08:27','Música',13,16,'2023-06-15',NULL),(18,99,77,'2023-06-15 12:08:27','Arte',12,12,'2023-06-15',NULL),(19,98,99,'2023-06-15 12:08:27','Fracés',12,13,'2023-06-15',NULL),(20,97,100,'2023-06-15 12:08:27','Arte',14,15,'2023-06-15',NULL);
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
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_locations_city1_idx` (`city_id`),
  CONSTRAINT `fk_locations_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,1,42.85488,-2.67508,'calle de Basoa'),(2,2,38.99246997345076,-1.864232794984317,'calle de Francisco Pizarro'),(3,3,38.35884683170227,-0.48985551497562685,'calle Luis Braille'),(4,4,36.84088373304039,-2.460258828754733,'calle Terriza'),(5,5,43.35771375473461,-5.859213467172127,'calle de Guillermo Estrada'),(6,6,40.65953618680675,-4.691354809758262,'calle virgen de la vega'),(7,7,38.87220124429213,-6.979210642310366,'calle Antonio Juez'),(8,8,41.39569386884997,2.142238368477733,'carrer de Calvet'),(9,9,42.34781816712589,-3.698537595277233,'calle Diego Lainez'),(10,10,39.467192351697534,-6.375181632274327,'calle Médico Sorapán'),(11,11,36.520855360590225,-6.281601504912957,'calle Ultrera'),(12,12,43.46990941888664,-3.7963151501597228,'calle la Universidad'),(13,13,39.98267561924796,-0.047838539925453546,'calle Lepanto'),(14,14,38.98551969794975,-3.923565145246239,'calle Delicias'),(15,15,37.88782041580738,-4.772837038167633,'calle Parras'),(16,16,40.06937519004516,-2.150989296819521,'calle de las Encinas'),(17,17,2.8230566970907573,2.8230566970907573,'carrer de Sant Hipolit'),(18,18,37.19351798915851,-3.6114417453883547,'calle Gaona'),(19,19,40.631069502103074,-3.1663132804211895,'calle Pareja Serrada'),(20,20,43.321622300718744,-1.9841135177434395,'calle garibai'),(21,21,37.26741486413947,-6.932170831662226,'calle Iberos'),(22,22,42.13490760483781,-0.40636269512475676,'calle Padre Huesca'),(23,23,39.569432206379794,2.6581900666744027,'calle Antonio Ribas'),(24,24,37.77922023720568,-3.7968849462527,'calle Jacinto Higueras'),(25,25,43.36702295279169,-8.411090543332168,'calle Alfredo Vicenti'),(26,26,42.46011369070304,-2.4412073695662744,'av. de Colón'),(27,27,28.133429955437993,-15.440441309857237,'calle Velarde'),(28,28,43.35398050693353,-8.41935861617767,'calle Gutemberg'),(29,29,41.611725233678825,0.6329780081512628,'carrer Alfons II'),(30,30,43.01592195603273,-7.5594367262251145,'av. de A Coruña'),(31,31,40.43681929716423,-3.6863207276625056,'calle de Serrano'),(32,32,36.72154601057811,-4.4287485903669035,'calle Mármoles'),(33,33,37.98465014941357,-1.126328751588571,'calle San Antonio'),(34,34,42.81335810963274,-1.6617832341567094,'calle Martín Azpilcueta'),(35,35,42.33614685949258,-7.854860038956922,'rua de Rios'),(36,36,42.00166216341497,-4.525101011612356,'calle Dr. Fleming'),(37,37,42.429797060784,-8.639436555738566,'calle de Benito Corbal'),(38,38,40.96072385090283,-5.652369311977196,'calle de la Milagrosa'),(39,39,28.43635404646613,-16.305194632638557,'calle Pestiño'),(40,40,40.945713212612496,-4.109702712498831,'calle de los Castillos'),(41,41,37.38459473157651,-5.968629479844748,'calle Alejandro Collantes'),(42,42,41.77036539897261,-2.4809029900102826,'Av. Reyes Católicos'),(43,43,41.11115517920244,1.2468066430767917,'carrer Reial'),(44,44,40.34638799860307,-1.1123361630513702,'calle Don Quijote'),(45,45,39.86132567448565,-4.026066553704349,'calle Subida Granja'),(46,46,39.45705833232763,-0.37001661747916326,'calle de Planas'),(47,47,41.644448807272525,-4.714669883143706,'calle de San Isidro'),(48,48,43.26100791195257,-2.93265468373384,'calle del Lic Poza'),(49,49,41.510225837451145,-5.741312560855069,'calle Cervantes'),(50,50,41.65601033580415,-0.8792125830994135,'calle de Alfonso I');
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
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (1,'Álava'),(2,'Albacete'),(3,'Alicante'),(4,'Almería'),(5,'Asturias'),(6,'Ávila'),(7,'Badajoz'),(8,'Barcelona'),(9,'Burgos'),(10,'Cáceres'),(11,'Cádiz'),(12,'Cantabria'),(13,'Castellón'),(14,'Ciudad Real'),(15,'Córdoba'),(16,'Cuenca'),(17,'Gerona'),(18,'Granada'),(19,'Guadalajara'),(20,'Guipúzcoa'),(21,'Huelva'),(22,'Huesca'),(23,'Islas Baleares'),(24,'Jaén'),(25,'La Coruña'),(26,'La Rioja'),(27,'Las Palmas'),(28,'León'),(29,'Lérida'),(30,'Lugo'),(31,'Madrid'),(32,'Málaga'),(33,'Murcia'),(34,'Navarra'),(35,'Orense'),(36,'Palencia'),(37,'Pontevedra'),(38,'Salamanca'),(39,'Santa Cruz de Tenerife'),(40,'Segovia'),(41,'Sevilla'),(42,'Soria'),(43,'Tarragona'),(44,'Teruel'),(45,'Toledo'),(46,'Valencia'),(47,'Valladolid'),(48,'Vizcaya'),(49,'Zamora'),(50,'Zaragoza');
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (45,97,7,4,'Buen profesor','2023-06-14 10:20:59'),(46,98,8,3,'Regular clase','2023-06-14 10:20:59'),(47,99,9,5,'Excelente instructor','2023-06-14 10:20:59'),(48,100,10,2,'No recomendado','2023-06-14 10:20:59'),(49,101,11,4,'Buena experiencia','2023-06-14 10:20:59'),(50,102,12,5,'Muy recomendable','2023-06-14 10:20:59'),(51,103,13,1,'Mala clase','2023-06-14 10:20:59'),(52,104,14,3,'Normal','2023-06-14 10:20:59'),(53,105,15,4,'Profesor experto','2023-06-14 10:20:59'),(54,106,16,2,'No cumplió expectativas','2023-06-14 10:20:59'),(55,107,17,5,'Gran enseñanza','2023-06-14 10:20:59'),(56,108,18,4,'Muy bien explicado','2023-06-14 10:20:59'),(57,109,19,3,'Aceptable','2023-06-14 10:20:59'),(58,110,20,2,'No lo recomendaría','2023-06-14 10:20:59'),(59,111,21,5,'Sobresaliente','2023-06-14 10:20:59'),(60,112,22,4,'Buen comunicador','2023-06-14 10:20:59'),(61,113,23,1,'No entendí nada','2023-06-14 10:20:59'),(62,114,24,3,'Normalito','2023-06-14 10:20:59'),(63,115,25,4,'Muy didáctico','2023-06-14 10:20:59'),(64,116,26,2,'No fue lo que esperaba','2023-06-14 10:20:59'),(65,97,27,3,'Clase promedio','2023-06-14 10:21:13'),(66,98,28,4,'Buena enseñanza','2023-06-14 10:21:13'),(67,99,29,5,'Recomendado 100%','2023-06-14 10:21:13'),(68,100,30,2,'No fue lo que esperaba','2023-06-14 10:21:13'),(69,101,31,4,'Excelente profesor','2023-06-14 10:21:13'),(70,102,32,3,'Clase informativa','2023-06-14 10:21:13'),(71,103,33,1,'Pésima experiencia','2023-06-14 10:21:13'),(72,104,34,4,'Muy útil','2023-06-14 10:21:13'),(73,105,35,5,'Gran comunicación','2023-06-14 10:21:13'),(74,106,36,2,'No lo recomendaría','2023-06-14 10:21:13'),(75,107,37,5,'Increíble clase','2023-06-14 10:21:13'),(76,108,38,4,'Explicaciones claras','2023-06-14 10:21:13'),(77,109,39,3,'Nada especial','2023-06-14 10:21:13'),(78,110,40,2,'No cumplió mis expectativas','2023-06-14 10:21:13'),(79,111,41,5,'Me encantó','2023-06-14 10:21:13'),(80,112,42,4,'Muy paciente','2023-06-14 10:21:13'),(81,113,43,1,'Totalmente perdido','2023-06-14 10:21:13'),(82,114,44,3,'Mediocre','2023-06-14 10:21:13'),(83,115,45,4,'Excelente metodología','2023-06-14 10:21:13'),(84,116,46,2,'No lo recomendaría','2023-06-14 10:21:13'),(85,97,47,4,'Muy buen profesor','2023-06-14 10:21:23'),(86,98,48,3,'Clase regular','2023-06-14 10:21:23'),(87,99,49,5,'Excelente experiencia','2023-06-14 10:21:23'),(88,100,50,2,'No lo recomendaría','2023-06-14 10:21:23'),(89,101,51,4,'Muy didáctico','2023-06-14 10:21:23'),(90,102,52,3,'Necesita mejorar explicaciones','2023-06-14 10:21:23'),(91,103,53,1,'Pésimo servicio','2023-06-14 10:21:23'),(92,104,54,4,'Recomendado','2023-06-14 10:21:23'),(93,105,55,5,'Excelente comunicación','2023-06-14 10:21:23'),(94,106,56,2,'No cumplió mis expectativas','2023-06-14 10:21:23'),(95,107,57,5,'Muy recomendable','2023-06-14 10:21:23'),(96,108,58,4,'Buena enseñanza','2023-06-14 10:21:23'),(97,109,59,3,'Nada especial','2023-06-14 10:21:23'),(98,110,60,2,'Decepcionante','2023-06-14 10:21:23'),(99,111,61,5,'Gran profesor','2023-06-14 10:21:23'),(100,112,62,4,'Muy paciente y dedicado','2023-06-14 10:21:23'),(101,113,63,1,'No entendí nada','2023-06-14 10:21:23'),(102,114,64,3,'Clase regular','2023-06-14 10:21:23'),(103,115,65,4,'Método efectivo','2023-06-14 10:21:23'),(104,116,66,2,'No lo recomendaría','2023-06-14 10:21:23');
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
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','Rol de administrador'),(2,'teacher','Rol de profesor'),(3,'student','Rol de estudiante');
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (7,26,27,'6600743795','https://ruta_del_avatar.jpg',1),(8,27,11,'6481404981','https://ruta_del_avatar.jpg',1),(9,28,24,'6140000737','https://ruta_del_avatar.jpg',1),(10,29,42,'6127369431','https://ruta_del_avatar.jpg',1),(11,30,33,'6260012813','https://ruta_del_avatar.jpg',1),(12,31,47,'6193918814','https://ruta_del_avatar.jpg',1),(13,32,37,'6444342403','https://ruta_del_avatar.jpg',1),(14,33,35,'6397236586','https://ruta_del_avatar.jpg',1),(15,34,29,'6848413756','https://ruta_del_avatar.jpg',1),(16,35,24,'6844732341','https://ruta_del_avatar.jpg',1),(17,36,38,'6314190929','https://ruta_del_avatar.jpg',1),(18,37,48,'6167036831','https://ruta_del_avatar.jpg',1),(19,38,25,'6345981681','https://ruta_del_avatar.jpg',1),(20,39,44,'6570320718','https://ruta_del_avatar.jpg',1),(21,40,1,'6522258765','https://ruta_del_avatar.jpg',1),(22,41,17,'6290030333','https://ruta_del_avatar.jpg',1),(23,42,5,'6810247683','https://ruta_del_avatar.jpg',1),(24,43,35,'6184433244','https://ruta_del_avatar.jpg',1),(25,44,20,'6712002735','https://ruta_del_avatar.jpg',1),(26,45,12,'6168153021','https://ruta_del_avatar.jpg',1),(27,46,36,'6386883044','https://ruta_del_avatar.jpg',1),(28,47,24,'6437400890','https://ruta_del_avatar.jpg',1),(29,48,24,'6328669765','https://ruta_del_avatar.jpg',1),(30,49,43,'6508117789','https://ruta_del_avatar.jpg',1),(31,50,37,'6396210354','https://ruta_del_avatar.jpg',1),(32,51,22,'6254936882','https://ruta_del_avatar.jpg',1),(33,52,29,'6377907828','https://ruta_del_avatar.jpg',1),(34,53,43,'6385817049','https://ruta_del_avatar.jpg',1),(35,54,3,'6329353731','https://ruta_del_avatar.jpg',1),(36,55,8,'6985367705','https://ruta_del_avatar.jpg',1),(37,56,24,'6457803072','https://ruta_del_avatar.jpg',1),(38,57,29,'6729949281','https://ruta_del_avatar.jpg',1),(39,58,39,'6748808932','https://ruta_del_avatar.jpg',1),(40,59,16,'6457826443','https://ruta_del_avatar.jpg',1),(41,60,3,'6159422275','https://ruta_del_avatar.jpg',1),(42,61,9,'6708585493','https://ruta_del_avatar.jpg',1),(43,62,43,'6328324150','https://ruta_del_avatar.jpg',1),(44,63,35,'6760889668','https://ruta_del_avatar.jpg',1),(45,64,29,'6701986593','https://ruta_del_avatar.jpg',1),(46,65,32,'6189738503','https://ruta_del_avatar.jpg',1),(47,66,32,'6887152479','https://ruta_del_avatar.jpg',1),(48,67,24,'6748250826','https://ruta_del_avatar.jpg',1),(49,68,10,'6832393633','https://ruta_del_avatar.jpg',1),(50,69,25,'6981221847','https://ruta_del_avatar.jpg',1),(51,70,23,'6351672643','https://ruta_del_avatar.jpg',1),(52,71,4,'6550783852','https://ruta_del_avatar.jpg',1),(53,72,16,'6999839655','https://ruta_del_avatar.jpg',1),(54,73,5,'6539899021','https://ruta_del_avatar.jpg',1),(55,74,8,'6359524766','https://ruta_del_avatar.jpg',1),(56,75,50,'6171879608','https://ruta_del_avatar.jpg',1),(57,76,22,'6929989913','https://ruta_del_avatar.jpg',1),(58,77,16,'6822892123','https://ruta_del_avatar.jpg',1),(59,78,4,'6965041375','https://ruta_del_avatar.jpg',1),(60,79,30,'6129757265','https://ruta_del_avatar.jpg',1),(61,80,21,'6980015924','https://ruta_del_avatar.jpg',1),(62,81,33,'6352487417','https://ruta_del_avatar.jpg',1),(63,82,24,'6577117860','https://ruta_del_avatar.jpg',1),(64,83,12,'6592852838','https://ruta_del_avatar.jpg',1),(65,84,3,'6670143434','https://ruta_del_avatar.jpg',1),(66,85,1,'6197049960','https://ruta_del_avatar.jpg',1),(67,86,27,'6412658590','https://ruta_del_avatar.jpg',1),(68,87,7,'6667063826','https://ruta_del_avatar.jpg',1),(69,88,38,'6860285644','https://ruta_del_avatar.jpg',1),(70,89,50,'6441853046','https://ruta_del_avatar.jpg',1),(71,90,48,'6652637328','https://ruta_del_avatar.jpg',1),(72,91,11,'6323432075','https://ruta_del_avatar.jpg',1),(73,92,30,'6271473727','https://ruta_del_avatar.jpg',1),(74,93,10,'6447112386','https://ruta_del_avatar.jpg',1),(75,94,18,'6651872056','https://ruta_del_avatar.jpg',1),(76,95,1,'6261557841','https://ruta_del_avatar.jpg',1),(77,96,45,'6902750720','https://ruta_del_avatar.jpg',1),(78,97,41,'6398243362','https://ruta_del_avatar.jpg',1),(79,98,13,'6341867657','https://ruta_del_avatar.jpg',1),(80,99,30,'6211295477','https://ruta_del_avatar.jpg',1),(81,100,44,'6937805410','https://ruta_del_avatar.jpg',1),(82,101,4,'6616643754','https://ruta_del_avatar.jpg',1),(83,102,33,'6575982893','https://ruta_del_avatar.jpg',1),(84,103,35,'6893881433','https://ruta_del_avatar.jpg',1),(85,104,17,'6999901445','https://ruta_del_avatar.jpg',1),(86,105,1,'6153194812','https://ruta_del_avatar.jpg',1),(87,106,14,'6211588671','https://ruta_del_avatar.jpg',1),(88,107,42,'6841431702','https://ruta_del_avatar.jpg',1),(89,108,31,'6582904559','https://ruta_del_avatar.jpg',1),(90,109,44,'6802301551','https://ruta_del_avatar.jpg',1),(91,110,14,'6997588694','https://ruta_del_avatar.jpg',1),(92,111,10,'6933471472','https://ruta_del_avatar.jpg',1),(93,112,4,'6657659977','https://ruta_del_avatar.jpg',1),(94,113,43,'6494296575','https://ruta_del_avatar.jpg',1),(95,114,31,'6772695390','https://ruta_del_avatar.jpg',1),(96,115,46,'6332543485','https://ruta_del_avatar.jpg',1),(97,116,30,'6264067951','https://ruta_del_avatar.jpg',1),(98,117,7,'6224399955','https://ruta_del_avatar.jpg',1),(99,118,15,'6986987846','https://ruta_del_avatar.jpg',1),(100,119,5,'6533169728','https://ruta_del_avatar.jpg',1),(101,120,8,'6347334465','https://ruta_del_avatar.jpg',1),(102,121,48,'6900827541','https://ruta_del_avatar.jpg',1),(103,122,32,'6489713340','https://ruta_del_avatar.jpg',1),(104,123,16,'6297105845','https://ruta_del_avatar.jpg',1),(105,124,10,'6337591247','https://ruta_del_avatar.jpg',1),(106,125,39,'6140281341','https://ruta_del_avatar.jpg',1),(107,126,47,'6527024506','https://ruta_del_avatar.jpg',1),(108,127,31,'6650933799','https://ruta_del_avatar.jpg',1),(109,128,12,'6424521886','https://ruta_del_avatar.jpg',1),(110,129,5,'6407511892','https://ruta_del_avatar.jpg',1),(111,130,23,'6322029231','https://ruta_del_avatar.jpg',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (95,4,7,3,18.00,12,1,'321654987','Música','https://tinyurl.com/2s48tzxr',12,21),(96,5,4,4,25.00,15,1,'789123456','Mecánica','https://tinyurl.com/3yj22mur',13,22),(97,6,8,10,10.00,4,1,'654987321','Arte','https://tinyurl.com/d4zme5pr',14,23),(98,7,6,11,22.00,18,1,'234567891','Fracés','https://tinyurl.com/bdhjbmxr',15,9),(99,8,8,11,8.00,5,1,'918273645','Arte','https://tinyurl.com/4sy3z76t',16,10),(100,9,7,15,28.00,10,1,'567891234','Música','https://tinyurl.com/yx3594pd',17,9),(101,10,1,16,15.00,7,1,'345678912','Matemáticas','https://tinyurl.com/2ez3ztc6',18,9),(102,11,3,20,20.00,9,1,'891234567','Iglés','https://tinyurl.com/bdha5bfh',19,9),(103,12,4,21,12.00,5,1,'678912345','Mecánica','https://tinyurl.com/3a97mwsd',15,10),(104,13,2,22,30.00,8,1,'456789123','Física','https://tinyurl.com/4jkfv6yk',9,15),(105,14,3,23,10.00,6,1,'234567891','Inglés','https://tinyurl.com/yckz99zf',9,16),(106,15,9,25,25.00,10,1,'918273645','Programación','https://tinyurl.com/mr2yndpp',9,17),(107,16,8,26,15.00,10,1,'123456789','Arte','https://tinyurl.com/vv645byt',9,18),(108,17,5,28,20.00,12,1,'987654321','Biología','https://tinyurl.com/yc6prp3b',10,11),(109,18,8,30,18.00,15,1,'456789123','Arte','https://tinyurl.com/yt3en5f8',11,20),(110,19,9,31,12.00,8,1,'321654987','Programación','https://tinyurl.com/mujfbw93',12,21),(111,20,9,32,22.00,12,1,'789123456','Programación','https://tinyurl.com/mvaymdwv',13,22),(112,21,2,15,8.00,5,1,'654987321','Física','https://tinyurl.com/8u56vxxt',14,20),(113,22,5,16,28.00,10,1,'234567891','Mecánica','https://tinyurl.com/2tvh9kxy',15,24),(114,23,1,44,15.00,7,1,'918273645','Matemáticas','https://tinyurl.com/3d26nxwm',16,18),(115,24,7,50,20.00,9,1,'567891234','Música','https://tinyurl.com/tv26pxm8',17,20),(116,25,8,49,12.00,5,1,'345678912','Arte','https://tinyurl.com/2s48tzxr',9,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=1879 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'admin1','admin123','admin1@gmail.com','Admin','Apellido','2023-06-13 13:34:46',NULL),(2,1,'jgarcia5','jgarcia123t','juangarcia4@gmail.com','Juan','García','2023-06-13 14:03:39',NULL),(3,1,'amartinez4','amartinez123r','anamartinezr@gmail.com','Ana','Martínez','2023-06-13 14:03:39',NULL),(4,1,'plopez3','plopez123','pedrolopez4@gmail.com','Pedro','López','2023-06-13 14:03:39',NULL),(5,2,'lrodriguez2','lrodriguez123','laurarodriguez3@gmail.com','Laura','Rodríguez','2023-06-13 14:03:39',NULL),(6,2,'mperez5','mperez1223','manuelperez2@gmail.com','Manuel','Pérez','2023-06-13 14:03:39',NULL),(7,2,'cgonzalez6','cgonzalez1234','carmengonzalez4@gmail.com','Carmen','González','2023-06-13 14:03:39',NULL),(8,2,'fhernandez7','fhernandez1235','franciscohernandez6@gmail.com','Francisco','Hernández','2023-06-13 14:03:39',NULL),(9,2,'msanchez8','msanchez1238','mariasanche7z@gmail.com','María','Sánchez','2023-06-13 14:03:39',NULL),(10,2,'atorres9','atorres1238','antoniotorres9@gmail.com','Antonio','Torres','2023-06-13 14:03:39',NULL),(11,2,'iramirez1','iramirez1230','isabelramire0z@gmail.com','Isabel','Ramírez','2023-06-13 14:03:39',NULL),(12,2,'jjimenez23','jjimenez1237','josejimenez7@gmail.com','José','Jiménez','2023-06-13 14:03:39',NULL),(13,2,'mvargas4','mvargas123r','martavargase4@gmail.com','Marta','Vargas','2023-06-13 14:03:39',NULL),(14,2,'mruiz5','mruiz1234','miguelruiz3@gmail.com','Miguel','Ruiz','2023-06-13 14:03:39',NULL),(15,2,'ecastro6','ecastro123','elenacastro3@gmail.com','Elena','Castro','2023-06-13 14:03:39',NULL),(16,2,'amorales7','amorales123','alejandromorales@gmail.com','Alejandro','Morales','2023-06-13 14:03:39',NULL),(17,2,'bortega3','bortega1233','beatrizortega5@gmail.com','Beatriz','Ortega','2023-06-13 14:03:39',NULL),(18,2,'gdelgado57','gdelgado1233','guillermodelgado4@gmail.com','Guillermo','Delgado','2023-06-13 14:03:39',NULL),(19,2,'sflores8','sflores1235','silviaflore6s@gmail.com','Silvia','Flores','2023-06-13 14:03:39',NULL),(20,2,'lnavarro6','lnavarro1823','luisnavarro7@gmail.com','Luis','Navarro','2023-06-13 14:03:39',NULL),(21,2,'rmendez2','rmendez1823','raquelmendez8@gmail.com','Raquel','Méndez','2023-06-13 14:03:39',NULL),(22,2,'jmedina3','jmedina1239','javiermedin9a@gmail.com','Javier','Medina','2023-06-13 14:03:39',NULL),(23,2,'mcastillo1','mcastillo1236','mariacastillo5@gmail.com','María','Castillo','2023-06-13 14:03:39',NULL),(24,2,'cpereza4','cperez1234','carlospere4z@gmail.com','Carlos','Pérez','2023-06-13 14:03:39',NULL),(25,2,'rlope6z','rlopez1233','rosalopez1@gmail.com','Rosa','López','2023-06-13 14:03:39',NULL),(26,2,'cperez7','cperez1231','cristinaperez3@gmail.com','Cristina','Pérez','2023-06-13 14:03:39',NULL),(27,2,'jmendez1','jmendez1243','juanmendez4@gmail.com','Juan','Méndez','2023-06-13 14:03:39',NULL),(28,2,'mjimenez8','mjimenez12r3','mariojimenez5@gmail.com','Mario','Jiménez','2023-06-13 14:03:39',NULL),(29,2,'lgomez8','lgomez1236','luciagomez6@gmail.com','Lucía','Gómez','2023-06-13 14:03:39',NULL),(30,2,'nrodriguez8','nrodriguez1723','nuriarodriguez8@gmail.com','Nuria','Rodríguez','2023-06-13 14:03:39',NULL),(31,2,'flopez7','flopez1293','fernandolope8z@gmail.com','Fernando','López','2023-06-13 14:03:39',NULL),(32,2,'mmartin6','mmartin1293','mariamartin9@gmail.com','María','Martín','2023-06-13 14:03:39',NULL),(33,2,'ppere4','pperez120','pablopere0z@gmail.com','Pablo','Pérez','2023-06-13 14:03:39',NULL),(34,2,'erodriguez3','erodriguez1023','estherrodrigue0z@gmail.com','Esther','Rodríguez','2023-06-13 14:03:39',NULL),(35,2,'jjimenez2','jjimenez1230','jorgejimene0z@gmail.com','Jorge','Jiménez','2023-06-13 14:03:39',NULL),(36,2,'gmolina1','gmolina1230','gabrielamolin0a@gmail.com','Gabriela','Molina','2023-06-13 14:03:39',NULL),(37,2,'rmartinez2','rmartinez1723','rubenmartinez0@gmail.com','Rubén','Martínez','2023-06-13 14:03:39',NULL),(38,2,'clara4','clara1237','clara7@gmail.com','Clara','González','2023-06-13 14:03:39',NULL),(39,2,'fmartin5','fmartin1273','franciscomartin7@gmail.com','Francisco','Martín','2023-06-13 14:03:39',NULL),(40,2,'cmorales6','cmorales1273','cristinamorale7s@gmail.com','Cristina','Morales','2023-06-13 14:03:39',NULL),(41,2,'gperez7','gperez1237','gabrielperez7@gmail.com','Gabriel','Pérez','2023-06-13 14:03:39',NULL),(42,2,'pmoreno8','pmoreno7123','pablomoreno@gmail.com','Pablo','Moreno','2023-06-13 14:03:39',NULL),(43,2,'srodriguez1','srodriguez1723','susannarodrigue7z@gmail.com','Susanna','Rodríguez','2023-06-13 14:03:39',NULL),(44,3,'sdelgado5','sdelgado1723','sandradelgad7o@gmail.com','Sandra','Delgado','2023-06-13 14:03:39',NULL),(45,3,'lmolina4','lmolina1723','luciamolina6@gmail.com','Lucía','Molina','2023-06-13 14:03:39',NULL),(46,3,'jnavarro2','jnavarro1263','juannavarro6@gmail.com','Juan','Navarro','2023-06-13 14:03:39',NULL),(47,3,'emartinez1','emartinez1263','elenamartinez6@gmail.com','Elena','Martínez','2023-06-13 14:03:39',NULL),(48,3,'dmorales6','dmorales1263','davidmorales6@gmail.com','David','Morales','2023-06-13 14:03:39',NULL),(49,3,'mmolina7','mmolina1523','manuelmolina5@gmail.com','Manuel','Molina','2023-06-13 14:03:39',NULL),(50,3,'aaranda7','aaranda1253','aliciaaranda6@gmail.com','Alicia','Aranda','2023-06-13 14:03:39',NULL),(51,3,'rnavarro3','rnavarro1263','rosanavarro6@gmail.com','Rosa','Navarro','2023-06-13 14:03:39',NULL),(52,3,'amarquez2','amarquez1263','albertomarquez6@gmail.com','Alberto','Márquez','2023-06-13 14:03:39',NULL),(53,3,'cmolina1','cmolina1623','carolinamolina6@gmail.com','Carolina','Molina','2023-06-13 14:03:39',NULL),(54,3,'mmoreno2','mmoreno1236','mariamoreno4@gmail.com','María','Moreno','2023-06-13 14:03:39',NULL),(55,3,'sruiz4','sruiz1243','sergioruiz4@gmail.com','Sergio','Ruiz','2023-06-13 14:03:39',NULL),(56,3,'lmartinez5','lmartinez1234','luisamartinez4@gmail.com','Luisa','Martínez','2023-06-13 14:03:39',NULL),(57,3,'cdelgado6','cdelgado153','carlosdelgado4@gmail.com','Carlos','Delgado','2023-06-13 14:03:39',NULL),(58,3,'frodriguez7','frodriguez1523','fernandorodriguez4@gmail.com','Fernando','Rodríguez','2023-06-13 14:03:39',NULL),(59,3,'srodriguez58','srodriguez4123','sergiorodriguez4@gmail.com','Sergio','Rodríguez','2023-06-13 14:03:39',NULL),(60,3,'lruiz5','lruiz1234','luisruiz33@gmail.com','Luis','Ruiz','2023-06-13 14:03:39',NULL),(61,3,'mperez14e','mperez1223','maríaperez2@gmail.com','María','Pérez','2023-06-13 14:03:39',NULL),(62,3,'jgarcia3e','jgarcia1232','josegarcia4@gmail.com','José','García','2023-06-13 14:03:39',NULL),(63,3,'amolina3','amolina1243','anamolina4@gmail.com','Ana','Molina','2023-06-13 14:03:39',NULL),(64,3,'pperez2w','pperez124','paulapere3@gmail.com','Paula','Pérez','2023-06-13 14:03:39',NULL),(65,3,'dmartineze','dmartinez1223','danielmartinez2@gmail.com','Daniel','Martínez','2023-06-13 14:03:39',NULL),(66,3,'vmartinr','vmartin1223','victoriamartin2@gmail.com','Victoria','Martín','2023-06-13 14:03:39',NULL),(67,3,'rgomezt','rgomez1223','raquelgomez2@gmail.com','Raquel','Gómez','2023-06-13 14:03:39',NULL),(68,3,'pgonzalezy','pgonzalez2123','pablogonzalez2@gmail.com','Pablo','González','2023-06-13 14:03:39',NULL),(69,3,'mmorenot','mmoreno1223','manuelmoreno2@gmail.com','Manuel','Moreno','2023-06-13 14:03:39',NULL),(70,3,'jsanchezr','jsanchez1223','jorgesanchez2@gmail.com','Jorge','Sánchez','2023-06-13 14:03:39',NULL),(71,3,'sgarciae','sgarcia123','susannagarcia1@gmail.com','Susanna','García','2023-06-13 14:03:39',NULL),(72,3,'malvarezr','malvarez121','manuelalvarez1@gmail.com','Manuela','Alvarez','2023-06-13 14:03:39',NULL),(73,3,'mmartinez4','mmartinez1231','mariamartinez1@gmail.com','María','Martínez','2023-06-13 14:03:39',NULL),(74,3,'jrodriguez5','jrodriguez1113','javierrodriguez3@gmail.com','Javier','Rodríguez','2023-06-13 14:03:39',NULL),(75,3,'bgomez6','bgomez123','beatrizgomez4@gmail.com','Beatriz','Gómez','2023-06-13 14:03:39',NULL),(76,3,'dgomez7','dgomez1253','danielgomez5@gmail.com','Daniel','Gómez','2023-06-13 14:03:39',NULL),(77,3,'mlopez37','mlopez1523','manuelalopez55@gmail.com','Manuela','López','2023-06-13 14:03:39',NULL),(78,3,'glopez5','glopez1253','gabrielalopez66@gmail.com','Gabriela','López','2023-06-13 14:03:39',NULL),(79,3,'mcastro3','mcastro12344','maríacastro4@gmail.com','María','Castro','2023-06-13 14:03:39',NULL),(80,3,'agallego2','agallego12344','anagallego55@gmail.com','Ana','Gallego','2023-06-13 14:03:39',NULL),(81,3,'fgonzalez1','fgonzalez1323','fernandogonzalez33@gmail.com','Fernando','González','2023-06-13 14:03:39',NULL),(82,3,'mruiz3','mruiz12333','marcosruiz44@gmail.com','Marcos','Ruiz','2023-06-13 14:03:39',NULL),(83,3,'bmartin4','bmartin1223','beatriizmartin4@gmail.com','Beatriz','Martín','2023-06-13 14:03:39',NULL),(84,3,'rmoreno5','rmoreno1232','raquelmoreno4@gmail.com','Raquel','Moreno','2023-06-13 14:03:39',NULL),(85,3,'cnavarro','cnavarro12355','carlanavarro4@gmail.com','Carla','Navarro','2023-06-13 14:03:39',NULL),(86,3,'egarcia6','egarcia1236','elisagarcia6@gmail.com','Elisa','García','2023-06-13 14:03:39',NULL),(87,3,'dmartin7','dmartin1723','davidmartin7@gmail.com','David','Martín','2023-06-13 14:03:39',NULL),(88,3,'pdelgado3','pdelgado1237','patriciadelgado8@gmail.com','Patricia','Delgado','2023-06-13 14:03:39',NULL),(89,3,'cmolina2','cmolina123','carolinamolina7@gmail.com','Carolina','Molina','2023-06-13 14:03:39',NULL),(90,3,'lmartinez3','lmartinez1236','lauramartinez4@gmail.com','Laura','Martínez','2023-06-13 14:03:39',NULL),(91,3,'cmoreno4','cmoreno1235','carlosmoreno4@gmail.com','Carlos','Moreno','2023-06-13 14:03:39',NULL),(92,3,'vlopez5','vlopez1236','vicentelopez7@gmail.com','Vicente','López','2023-06-13 14:03:39',NULL),(93,3,'cmartinez6','cmartinez1237','cristinamartinez7@gmail.com','Cristina','Martínez','2023-06-13 14:03:39',NULL),(94,3,'emoreno8','emoreno1235','esthermoren6@gmail.com','Esther','Moreno','2023-06-13 14:03:39',NULL),(95,3,'amartinez9','amartinez1237','adrianamartinez6@gmail.com','Adriana','Martínez','2023-06-13 14:03:39',NULL),(96,3,'rgomez8','rgomez1273','robertogomez5@gmail.com','Roberto','Gómez','2023-06-13 14:03:39',NULL),(97,3,'mjimenez7','mjimenez1243','mariojimenez4@gmail.com','Mario','Jiménez','2023-06-13 14:03:39',NULL),(98,3,'sgomez6','sgomez1234','susannagomez4@gmail.com','Susanna','Gómez','2023-06-13 14:03:39',NULL),(99,3,'pmartinez3','pmartinez1623','pedromartinez5@gmail.com','Pedro','Martínez','2023-06-13 14:03:39',NULL),(100,3,'jrodriguez6','jrodriguez1623','joserodriguez6@gmail.com','José','Rodríguez','2023-06-13 14:03:39',NULL),(101,3,'vmolina4','vmolina17623','victoriamolina7@gmail.com','Victoria','Molina','2023-06-13 14:03:39',NULL),(102,3,'lgarcia5','lgarcia1236','lauragarcia55@gmail.com','Laura','García','2023-06-13 14:03:39',NULL),(103,3,'mmoreno6','mmoreno1233','manuelmoreno4@gmail.com','Manuel','Moreno','2023-06-13 14:03:39',NULL),(104,3,'acastro7','acastro1234','albertocastro55@gmail.com','Alberto','Castro','2023-06-13 14:03:39',NULL),(105,3,'anavarro4','anavarro12355','angelanavarro3@gmail.com','Ángela','Navarro','2023-06-13 14:03:39',NULL),(106,3,'cgonzalez3','cgonzalez1243','carlagonzalez5@gmail.com','Carla','González','2023-06-13 14:03:39',NULL),(107,3,'jlopez5','jlopez1263','jorgelopez66@gmail.com','Jorge','López','2023-06-13 14:03:39',NULL),(108,3,'cmolina6','cmolina1236','cristinamolina4@gmail.com','Cristina','Molina','2023-06-13 14:03:39',NULL),(109,3,'amarquez7','amarquez1623','anamarquez@gmail.com','Ana','Márquez','2023-06-13 14:03:39',NULL),(110,3,'smoreno7','smoreno1623','sergiomoreno4@gmail.com','Sergio','Moreno','2023-06-13 14:03:39',NULL),(111,3,'egomez7','egomez4123','elenagomez@gmail.com','Elena','Gómez','2023-06-13 14:03:39',NULL),(112,3,'jruiz8','jruiz1233','julioruiz4@gmail.com','Julio','Ruiz','2023-06-13 14:03:39',NULL),(113,3,'ccastro7','ccastro153','carloscastro4@gmail.com','Carlos','Castro','2023-06-13 14:03:39',NULL),(114,3,'gdelgado6','gdelgado123','guillermodelgado3@gmail.com','Guillermo','Delgado','2023-06-13 14:03:39',NULL),(115,3,'mgomez5','mgomez1523','manuelgomez4@gmail.com','Manuel','Gómez','2023-06-13 14:03:39',NULL),(116,3,'acastro4','acastro1623','alvarocastro5@gmail.com','Álvaro','Castro','2023-06-13 14:03:39',NULL),(117,3,'mmartin4','mmartin6123','marcosmartin6@gmail.com','Marcos','Martín','2023-06-13 14:03:39',NULL),(118,3,'eperez4','eperez1623','estherperez5@gmail.com','Esther','Pérez','2023-06-13 14:03:39',NULL),(119,3,'mruiz53','mruiz123','mariaruiz4@gmail.com','María','Ruiz','2023-06-13 14:03:39',NULL),(120,3,'lgome6','lgomez123','luciagomez3@gmail.com','Lucía','Gómez','2023-06-13 14:03:39',NULL),(121,3,'sgomez7','sgomez123','sergiogomez2@gmail.com','Sergio','Gómez','2023-06-13 14:03:39',NULL),(122,3,'cmartinez8','cmartinez1243','carlosmartinez3@gmail.com','Carlos','Martínez','2023-06-13 14:03:39',NULL),(123,3,'mmoreno8','mmoreno1223','mariamoreno@gmail.com','María','Moreno','2023-06-13 14:03:39',NULL),(124,3,'jdelgado9','jdelgado1223','jorgedelgado3@gmail.com','Jorge','Delgado','2023-06-13 14:03:39',NULL),(125,3,'mmartinez9','mmartinez123','manuelmartinez5@gmail.com','Manuel','Martínez','2023-06-13 14:03:39',NULL),(126,3,'pgomez9','pgomez1232','patriciagomez5@gmail.com','Patricia','Gómez','2023-06-13 14:03:39',NULL),(127,3,'jrodriguez','jrodriguez1223','javierrodriguez5@gmail.com','Javier','Rodríguez','2023-06-13 14:03:39',NULL),(128,3,'vmolina','vmolina1223','vicentemolina4@gmail.com','Vicente','Molina','2023-06-13 14:03:39',NULL),(129,3,'lgarcia','lgarcia1323','luisagarcia4@gmail.com','Luisa','García','2023-06-13 14:03:39',NULL),(130,3,'mmoreno3','mmoreno1233','manuelmoreno3@gmail.com','Manuel','Moreno','2023-06-13 14:03:39',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'appteacher-tablas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-15 12:17:08
