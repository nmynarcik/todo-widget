/*global yoBackbone, Backbone*/

yoBackbone.Collections = yoBackbone.Collections || {};

(function () {
    'use strict';

    yoBackbone.Collections.TodosCollection = Backbone.Collection.extend({

        localStorage: new Backbone.LocalStorage('backbone-generator-todos'),

        initialize: function () {
            this.model = yoBackbone.Models.TodoModel;
        }

    });

})();
