# Python Example

This example (could) make use of [virtualenv](http://python-guide-pt-br.readthedocs.io/en/latest/dev/virtualenvs/) by navigating to the project directory and running:

```bash
$ virtualenv .
$ pip install -r requirements.txt
```

Of course, one doesn't need `virtualenv` if one doesn't want, and could just navigate to the project directory and:

```bash
$ pip install -r requirements.txt
```

...and install the dependencies globally. Whatever floats your boat.

### Caveat

You will need to edit [example.py](https://github.com/battis/qdapi/blob/master/examples/python/example.py#L5) to point the `url` at an existing QDAPI installation!
