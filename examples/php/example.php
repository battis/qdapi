<?php

require_once __DIR__ . '/vendor/autoload.php';

$api = new PestJSON('https://example.com/api/v1');

/* GET all of the data in the foo table */
$foos = $api->get('/foo');
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
$foo = $api->get('/foo/2');
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 2; bar: the quick brown fox; baz: asparagus
 */

/* POST a new record */
$foo = $api->post('/foo', [
    'bar' => 'dummy info',
    'baz' => 'more dummy info'
]);
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 4; bar: dummy info; baz: more dummy info
 */

/* PUT updates to an existing record (the one we just inserted!) */
$foo = $api->put("/foo/{$foo['id']}", [
    'baz' => 'smart info!'
]);
echo "id: {$foo['id']}; bar: {$foo['bar']}; baz: {$foo['baz']}" . PHP_EOL;
/*
 * output:
 *
 * id: 4; bar: dummy info; baz: smart info!
 */

/* DELETE deletes an existing record */
$count = $api->delete("/foo/{$foo['id']}");
echo "deleted $count records " . PHP_EOL;
/*
 * output:
 *
 * deleted 1 records
 */
