/*global yoBackbone, Backbone, JST*/

yoBackbone.Views = yoBackbone.Views || {};
yoBackbone.App = yoBackbone.App || {};
yoBackbone.App.events = _.extend({}, Backbone.Events);
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
            _.bindAll(this, 'startVoice','updateProgress');
            this.render();

            this.displayProgress();

            this.listenTo(this.collection, 'add', this.addTodoItem);
            this.listenTo(this.collection, 'reset', this.addAllTodoItems);
            yoBackbone.App.events.on("update:progress", this.updateProgress);

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

        displayProgress: function(){
            this.progress = new yoBackbone.Views.ProgressView();
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
            this.updateProgress();
        },

        addTodoItem: function (todo) {
            var view = new yoBackbone.Views.TodoView({ model: todo });
            this.$('ul').append(view.render().el);
            this.updateProgress();
        },

        updateProgress: function(){
            var total = this.collection.length;
            var comp = this.$el.find('input:checked').size();
            this.progress.setProgress(comp, total);
        },

        addAllTodoItems: function () {
            this.collection.each(this.addTodoItem, this);
            this.updateProgress();
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
