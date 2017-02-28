<?php

require 'vendor/autoload.php';

use Battis\ConfigXML;

/**
 * based on https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/
 */

/* open a connection the MySQL database server */
$config = new ConfigXML('./config.xml');
$sql = $config->newInstanceOf(mysqli::class, '//mysql');

/* allow particular hosts to access this API (e.g. * -- a dangerous setting that allows _everyone_ to access this!) */
header('Access-Control-Allow-Origin: ' . $config->toString('//cors/origin'));

/* parse the query out of the request string */
$verb = strtoupper($_SERVER['REQUEST_METHOD']);
$endpoint = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$parameters = json_decode(file_get_contents('php://input'), true);
if (empty($parameters)) {
    parse_str($_SERVER['QUERY_STRING'], $parameters);
}

/* set the table and key (if present) from first two tokens of end point */
$table = $sql->escape_string(array_shift($endpoint));
$key = $sql->escape_string(array_shift($endpoint));
$subtable = $sql->escape_string(array_shift($endpoint));

/* build the SET clause from the parameters */
$set = [];
foreach ($parameters as $field => $value) {
    $field = $sql->escape_string($field);
    $value = $sql->escape_string($value);
    $set[] = "`$field` = '$value'";
}
$set = implode(', ', $set);

/* build the SQL query from the request */
switch ($verb) {
    case 'GET':
        $query = "SELECT * FROM `$table`" . ($key ? " WHERE `id` = '$key'" : '');
        break;
    case 'PUT':
        $query = "UPDATE `$table` SET $set WHERE `id` = '$key'";
        break;
    case 'POST':
        $query = "INSERT INTO `$table` SET $set";
        break;
    case 'DELETE':
        $query = "DELETE FROM `$table` WHERE `id` = '$key'";
        break;
}

/* attempt the request */
$result = $sql->query($query);

/* if the query fails, must have been invalid request */
if (!$result) {
    http_response_code(404);
    die($sql->error);
}

/* send JSON response back to requester */
header('Content-type: application/json');
switch ($verb) {
    case 'GET':
        $response = [];
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        if ($key) {
            $response = $response[0];
        }
        echo json_encode($response);
        break;
    case 'POST':
        $key = $sql->insert_id;
    case 'PUT':
        $query = "SELECT * FROM `$table` WHERE `id` = '$key'";
        $result = $sql->query($query);
        $response = $result->fetch_assoc();
        echo json_encode($response);
        break;
    default:
        echo $sql->affected_rows;
}
