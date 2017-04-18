CREATE TABLE IF NOT EXISTS `foo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bar` text,
  `baz` text,
  PRIMARY KEY (`id`)
);

LOCK TABLES `foo` WRITE;
/*!40000 ALTER TABLE `foo` DISABLE KEYS */;

INSERT INTO `foo` (`id`, `bar`, `baz`)
VALUES
	(1,'hello world','purple people eaters'),
	(2,'the quick brown fox','asparagus'),
	(3,'red','raspberry');

/*!40000 ALTER TABLE `foo` ENABLE KEYS */;
UNLOCK TABLES;
