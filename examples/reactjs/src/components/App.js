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

  replace(id, text) {
      document.getElementById(id).innerHTML = text;
  }

  format(foo) {
      return 'id: ' + foo.id + '; bar: ' + foo.bar + '; baz: ' + foo.baz
  }

  componentDidMount() {
      var url = 'https://roswell.stmarksschool.org/~online-inventory/api/v1/foo'
      var self = this

      /* GET all of the data in the foo table */
      fetch(url).then(function(response) {
          return response.json()
      }).then(function(foos) {
          self.replace('get-all', foos.map(self.format).join('<br/>'))
          /*
           * output:
           *
           * id: 1; bar: hello world; baz: purple people eaters
           * id: 2; bar: the quick brown fox; baz: asparagus
           * id: 3; bar: red; baz: raspberry
           */
      }).catch(error => self.replace('get-all', error))

      /* GET a single record */
      fetch(url + '/2').then(function(response) {
          return response.json()
      }).then(function(foo) {
          self.replace('get-one', self.format(foo))
          /*
           * output
           *
           * id: 2; bar: the quick brown fox; baz: asparagus
           */
      }).catch(error => self.replace('get-one', error))

      /* POST a new record */
      fetch(url, {
          method: 'post',
          body: JSON.stringify({
              bar: 'dummy info',
              baz: 'more dummy info'
          })
      }).then(function(response) {
          return response.json()
      }).then(function(foo) {
          self.replace('post', self.format(foo))
          /*
           * output:
           *
           * id: 4; bar: dummy info; baz: more dummy info
           */

          /* PUT updates to an existing record (the one we just inserted!) */
          fetch(url + '/' + foo.id, {
              method: 'put',
              body: JSON.stringify({
                  baz: 'smart info!'
              })
          }).then(function (response) {
              return response.json()
          }).then(function(foo) {
              self.replace('put', self.format(foo))
              /*
               * output:
               *
               * id: 4; bar: dummy info; baz: smart info!
               */

              /* DELETE deletes an existing record */
              fetch(url + '/' + foo.id, {
                  method: 'DELETE',
                  body: JSON.stringify({})
              }).then(function(response) {
                  return response.json()
              }).then(function(foo) {
                  self.replace('delete', 'deleted ' + foo + ' records')
                  /*
                   * output:
                   *
                   * deleted 1 records
                   */
              }).catch(error => self.replace('delete', error))
          }).catch(error => self.replace('put', error))
      }).catch(error => self.replace('post', error))

  }
}
