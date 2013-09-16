/*global yoBackbone, Backbone, JST*/

yoBackbone.Views = yoBackbone.Views || {};

(function () {
    'use strict';

    yoBackbone.Views.HelpModalView = Backbone.View.extend({

        el: '.modal',
        events: {
          'click .modal-footer button': 'close'
        },
        template: JST['app/scripts/templates/help-modal.ejs'],

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.addClass('hide');
            return this;
        },

        show: function(){
          this.$el.fadeIn().removeClass('hide');
          this.$el.modal();
          console.log(this.$el);
        },

        close: function(){
          this.$el.modal('hide');
          this.$el.fadeOut().addClass('hide');
        }
    });

})();
