<?php

require_once __DIR__ . '/vendor/autoload.php';

$api = new Pest('http://example.com/api/v1');

/* GET all of the data in the foo table */
$foos = json_decode($api->get('/foo'), true);
foreach ($foos as $foo) {
    echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
}
/*
 * output:
 *
 * id: 1; bar: hello world; baz: purple people eaters
 * id: 2; bar: the quick brown fox; baz: asparagus
 * id: 3; bar: red; baz: raspberry
 */

/* GET a single record */
$foo = json_decode($api->get('/foo/2'), true);
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 2; bar: the quick brown fox; baz: asparagus
 */

/* POST a new record */
$foo = json_decode($api->post('/foo', [
    'bar' => 'dummy info',
    'baz' => 'more dummy info'
]), true);
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 4; bar: dummy info; baz: more dummy info
 */

/* PUT updates to an existing record (the one we just inserted!) */
$foo = json_decode($api->put("/foo/{$foo['id']}", [
    'baz' => 'smart info!'
]), true);
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 4; bar: dummy info; baz: smart info!
 */

/* DELETE deletes an existing record */
$count = json_decode($api->delete("/foo/{$foo['id']}"), true);
echo "deleted $count records " . PHP_EOL;
/*
 * output:
 *
 * deleted 1 records
 */
