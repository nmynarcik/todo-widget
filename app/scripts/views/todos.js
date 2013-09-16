/*global yoBackbone, Backbone, JST*/

yoBackbone.Views = yoBackbone.Views || {};
var reco;

(function () {
    'use strict';

    yoBackbone.Views.TodosView = Backbone.View.extend({

        el: '#todo-app',
        template: JST['app/scripts/templates/todos.ejs'],

        events: {
        'submit': 'createTodo',
        'click #voiceBtn': 'startVoice',
        'click #helpBtn': 'getHelp'
        },

        initialize: function () {
            _.bindAll(this, 'startVoice');
            this.render();

            this.listenTo(this.collection, 'add', this.addTodoItem);
            this.listenTo(this.collection, 'reset', this.addAllTodoItems);

            this.collection.fetch();

            if (typeof webkitSpeechRecognition === "undefined") {
                $('#voiceBtn').remove();
            }else{
                $('html').addClass('chrome');
                reco = new WebSpeechRecognition();
                reco.statusText('status');
                reco.statusImage('voiceBtn');
                reco.continuous = false;
                reco.finalResults('new-todo');
                reco.onEnd = function() {
                  if (reco.final_transcript != '') {
                    $('#todo-form').submit();
                  }
                };
            }
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        createTodo: function (event) {
            if(event)
                event.preventDefault();

            var title = this.$('#new-todo').val().trim();
            var id = _.uniqueId('todo_');

            if (title) {
                this.collection.create(new yoBackbone.Models.TodoModel({
                    title: title,
                    id: id
                }));
                $('#new-todo').val('');
            }
        },

        addTodoItem: function (todo) {
            var view = new yoBackbone.Views.TodoView({ model: todo });
            this.$('ul').append(view.render().el);
        },

        addAllTodoItems: function () {
            this.collection.each(this.addTodoItem, this);
        },

        startVoice: function(e) {
            if($(e.currentTarget).hasClass('disabled')){
                return;
            }
            console.log('starting voice router');
            reco.toggleStartStop()
        },

        getHelp: function(){
            var helpModal = new yoBackbone.Views.HelpModalView();
            helpModal.show();
        }
    });

})();
