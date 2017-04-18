import requests
import json

# base URL of API endpoints
url = 'http://example.com/api/v1'

# GET all of the data in the foo table
foos = json.loads(requests.get(url + '/foo').text)
for foo in foos:
    print('id: ' + foo['id'] + '; bar: ' + foo['bar'] + '; baz: ' + foo['baz'] + '\n')
# output:
#
# id: 1; bar: hello world; baz: purple people eaters
# id: 2; bar: the quick brown fox; baz: asparagus
# id: 3; bar: red; baz: raspberry

# GET a single record
foo = json.loads(requests.get(url + '/foo/2').text)
print('id: ' + foo['id'] + '; bar: ' + foo['bar'] + '; baz: ' + foo['baz'] + '\n')
# output:
#
# id: 2; bar: the quick brown fox; baz: asparagus

# POST a new record
foo = json.loads(requests.post(url + '/foo', params = {
    'bar': 'dummy info',
    'baz': 'more dummy info'
}).text)
print('id: ' + foo['id'] + '; bar: ' + foo['bar'] + '; baz: ' + foo['baz'] + '\n')
# output:
#
# id: 4; bar: dummy info; baz: more dummy info

# PUT updates to an existing record (the one we just inserted!)
foo = json.loads(requests.put(url + '/foo/' + foo['id'], params = {
    'baz': 'smart info!'
}).text)
print('id: ' + foo['id'] + '; bar: ' + foo['bar'] + '; baz: ' + foo['baz'] + '\n')
# output:
#
# id: 4; bar: dummy info; baz: smart info!

# DELETE deletes an existing record
count = json.loads(requests.delete(url + '/foo/' + foo['id']).text)
print('deleted ' + str(count) + ' records\n')
# output:
#
# deleted 1 records
