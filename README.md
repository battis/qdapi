# Quick and Dirty API

This is a small script that allows you to hook a RESTful API up to a MySQL database with a bare minimum of muss, fuss and security. It is based closely on [LeaseWeb Lab's single-page REST API](https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/).

### Installation

  1. Clone this repository into the desired directory for your API endpoints. (For example, `~/public_html/api/v1/` might be a reasonable location.)
  2. Use Composer to install dependencies (if you don't have Composer installed, check out [their great tutorial online](https://getcomposer.org)):
      ```bash
      $ composer install -o --prefer-dist
      ```
  3. Construct a `config.xml` file modeled on `config-example.xml` with your MySQL credentials.

### Usage

The API supports the main four RESTful verbs: GET, POST, PUT, DELETE. There are language-specific examples of apps that interact with the API in the [/examples](examples) directory.

##### GET

```http
GET http://example.com/path/to/api/:table[/:id]
```

This will list the contents of a table or of a specific record (if `:id` is provided). All responses are JSON-formatted.

For example, if your database contains a table `foo` with the fields `id`, `bar`, `baz`, with values like this:

| id | bar | baz |
| :-: | - | - |
| 1 | hello world | purple people eaters |
| 2 | the quick brown fox | rhubarb |

...then this request:

```http
GET http://example.com/api/v1/foo
```

...would return:

```json
[
  {
    "id": "1",
    "bar": "hello world",
    "baz": "purple people eaters"
  },
  {
    "id": "2",
    "bar": "the quick brown fox",
    "baz": "rhubarb"
  }
]
```

...assuming, of course, that those were the contents of your database. While the request:

```http
GET http://example.com/api/v1/foo/2
```

...would return:

```json
{
  "id": "2",
  "bar": "the quick brown fox",
  "baz": "rhubarb"
}
```

##### POST

```http
POST http://example.com/path/to/api/:table
```

This will insert a new record into the table (if `:id` is included, it will be ignored). This request takes an unlimited number of parameters of the form `:field = :value`. If fields that do not exist in `:table` are included as parameters they will likely generate a MySQL error.

For example, the request:

```http
POST http://example.com/api/v1/foo?bar=red&baz=raspberry
```

...will update the `foo` table to:

| id | bar | baz |
| :-: | - | - |
| 1 | hello world | purple people eaters |
| 2 | the quick brown fox | rhubarb |
| <span style="color: red">3</span> | <span style="color: red">red</span> | <span style="color: red">raspberry</span> |

...and will return:

```json
{
  "id": "3",
  "bar": "red",
  "baz": "raspberry"
}
```

##### PUT

```http
PUT http://example.com/path/to/api/:table/:id
```

This will update an existing record with new values. It takes an unlimited number of parameters of the form `:field = :value`. If fields that do not exist in `:table` are included as parameters they will likely generate a MySQL error.

For example, the request:

```http
PUT http://example.com/api/v1/foo/2?baz=asparagus
```

...will update record ID 2 of our `foo` table:

| id | bar | baz |
| :-: | - | - |
| 1 | hello world | purple people eaters |
| 2 | the quick brown fox | <span style="color: red">asparagus</span> |
| 3 | red | raspberry |

...and return:

```json
{
  "id": "2",
  "bar": "the quick brown fox",
  "baz": "asparagus"
}
```

##### DELETE

```http
DELETE http://example.com/path/to/api/:table/:id
```

This will delete a record from the database.

For example, the request:

```http
DELETE http://example.com/api/v1/foo/2
```

...would update the `foo` table by removing row ID 2:

| id | bar | baz |
| :-: | - | - |
| 1 | hello world | purple people eaters |
| 3 | red | raspberry |

...and would returned the the number of deleted records (probably only 1, might be 0):

```json
1
```
