var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      {
        id: '001',
        title: 'Todo Vue.js 作業',
        completed: false
      }
    ],
    cacheTodo: {},
    cacheTitle: '',
    visibility: 'all'
  },
  methods: {
    addTodo: function() {
      var value = this.newTodo.trim();
      var timestamp = Math.floor(Date.now());
      // console.log(value, timestamp);
      if (!value) {
        return;
      }
      this.todos.push({
        id: timestamp,
        title: value,
        computed: false
      });
      this.newTodo = '';
    },
    removeTodo: function(todo) {
      // 方法一
      /*
      var newIndex = '';
      var vm = this;
      vm.todos.forEach(function(item, key) {
        if (todo.id === item.id) {
          newIndex = key
        }
      })
      this.todos.splice(newIndex, 1);
      */
      // 方法二
      var vm = this;
      var newIndex = vm.todos.findIndex(function (item, key) {
        return todo.id === item.id;
      });
      this.todos.splice(newIndex, 1);
    },
    editTodo: function(item) {
      // console.log(item);
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function() {
      this.cacheTodo = {};
    },
    doneEdit: function(item) {
      item.title = this.cacheTitle;
      this.cacheTitle = '';
      this.cacheTodo = {};
    },
    clearAllTodos: function(){
      this.todos = [];
    }
  },
  computed: {
    filteredTodos: function() {
      if (this.visibility == 'all') {
        return this.todos;
      } else if (this.visibility == 'active') {
        var newTodos = [];
        this.todos.forEach(function (item) {
          if (!item.completed) {
            newTodos.push(item);
          }
        })
        return newTodos;
      } else if (this.visibility == 'completed') {
        var newTodos = [];
        this.todos.forEach(function (item) {
          if (item.completed) {
            newTodos.push(item);
          }
        })
        return newTodos;
      }
      return [];
    },
    unfinishedTodos: function() {
      var unTodos = [];
      this.todos.forEach(function (item) {
        if(!item.completed) {
          unTodos.push(item);
        }
      });
      return unTodos.length;
    }
  }
});