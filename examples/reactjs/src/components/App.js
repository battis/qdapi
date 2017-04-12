import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <h3>GET all</h3>
          <p id="get-all">Loading&hellip;</p>
          <h3>GET one</h3>
          <p id="get-one">Loading&hellip;</p>
          <h3>POST</h3>
          <p id="post">Loading&hellip;</p>
          <h3>PUT</h3>
          <p id="put">Loading&hellip;</p>
          <h3>DELETE</h3>
          <p id="delete">Loading&hellip;</p>
      </div>
    );
  }

  fetchJSON(url, params, callback) {
      fetch(url, params).then(function(response) {
          return response.json()
      }).then(callback)
  }

  replace(id, text) {
      document.getElementById(id).innerHTML = text;
  }

  format(foo) {
      return 'id: ' + foo.id + '; bar: ' + foo.bar + '; baz: ' + foo.baz
  }

  componentDidMount() {
      var url = 'https://example.com/api/v1/foo'
      var self = this

      /* GET all of the data in the foo table */
      this.fetchJSON(url,{method: 'get'}, function(foos) {
          self.replace('get-all', foos.map(self.format).join('<br/>'))
          /*
           * output:
           *
           * id: 1; bar: hello world; baz: purple people eaters
           * id: 2; bar: the quick brown fox; baz: asparagus
           * id: 3; bar: red; baz: raspberry
           */
      })

      /* GET a single record */
      this.fetchJSON(url + '/2', {method: 'get'}, function(foo) {
          self.replace('get-one', self.format(foo))
          /*
           * output
           *
           * id: 2; bar: the quick brown fox; baz: asparagus
           */
      })

      /* POST a new record */
      this.fetchJSON(url, {
          method: 'post',
          body: JSON.stringify({
              bar: 'dummy info',
              baz: 'more dummy info'
          })
      }, function(foo) {
          self.replace('post', self.format(foo))
          /*
           * output:
           *
           * id: 4; bar: dummy info; baz: more dummy info
           */

          /* PUT updates to an existing record (the one we just inserted!) */
          self.fetchJSON(url + '/' + foo.id, {
              method: 'put',
              body: JSON.stringify({
                  baz: 'smart info!'
              })
          }, function(foo) {
              self.replace('put', self.format(foo))
              /*
               * output:
               *
               * id: 4; bar: dummy info; baz: smart info!
               */

              /* DELETE deletes an existing record */
              self.fetchJSON(url + '/' + foo.id, {
                  method: 'DELETE',
                  body: JSON.stringify({})
              }, function(count) {
                  self.replace('delete', 'deleted ' + count + ' records')
                  /*
                   * output:
                   *
                   * deleted 1 records
                   */
              })
          })
      })

  }
}
