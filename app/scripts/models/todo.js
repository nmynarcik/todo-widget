/*global yoBackbone, Backbone*/

yoBackbone.Models = yoBackbone.Models || {};

(function () {
    'use strict';

    yoBackbone.Models.TodoModel = Backbone.Model.extend({

        defaults: {
            title: '',
            completed: false
        },

        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });
        }

    });

})();
