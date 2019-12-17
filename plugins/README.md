# Plugins

Plugins are inserted into the code after the request has been parsed, but before any actions have been taken in the database.

It may be helpful to preface a plugin script with the following PhpDoc comment, which will help the IDE parse use of provided variables.

```php
/**
 * @var string $table contains the name of the SQL table
 * @var string $key contains the ID value of the any SQL row requested
 * @var string $subtable contains the name of any subtable requested
 * @var string $verb contains the REST verb
 * @var array<string, string> $parameters contains the key=value pairs of search query parameters
 * @var string $set is the SQL instruction to insert, update a row based on $parameters
 * @var mysqli $sql is an object representing the SQL server
 */
```