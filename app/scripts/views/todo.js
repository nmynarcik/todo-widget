/*global yoBackbone, Backbone, JST*/

yoBackbone.Views = yoBackbone.Views || {};

(function () {
    'use strict';
    yoBackbone.Views.TodoView = Backbone.View.extend({

        tagName: 'li',

        template: JST['app/scripts/templates/todo.ejs'],

        events: {
            'click input[type="checkbox"]': 'toggle',
            'dblclick span': 'toggleEdit',
            'click .todo': 'toggleEdit',
            'submit form': 'toggleEdit'
        },

        initialize: function () {
          this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
          this.$el.html(this.template(this.model.toJSON()));

          return this;
        },

        labelClick: function(e){
          e.preventDefault();
          this.model.toggle();
          return;
          if(this.$el.find('input[type="checkbox"]').checked){
            this.$el.find('input[type="checkbox"]').checked = false;
          }else{
            this.$el.find('input[type="checkbox"]').checked = true;
          }
        },

        toggle: function () {
          this.model.toggle();
          // yoBackbone.Views.TodosView.prototype.updateProgress();
          yoBackbone.App.events.trigger("update:progress");
        },

        toggleEdit: function () {
          var input = this.$('form input');
          var title = input.val().trim();

          if (!title) {
              this.model.destroy();
              this.remove();
              return;
          }

          this.$el.toggleClass('editing');

          if (title === this.model.get('title')) {
              // Edit mode.
              input.val(title);
              input.focus();
          } else {
              // Done editing.
              this.model.set('title', title);
              this.model.save();

              this.render();
          }
        }

    });

})();
