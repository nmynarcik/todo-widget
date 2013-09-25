/*global yoBackbone, Backbone, JST*/

yoBackbone.Views = yoBackbone.Views || {};

(function () {
    'use strict';

    yoBackbone.Views.ProgressView = Backbone.View.extend({

        el: $('.hero-unit'),

        template: JST['app/scripts/templates/progress.ejs'],

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.append(this.template());

            return this;
        },

        setProgress: function(comp, total){
            var perc = comp/total * 100;
            this.$el.find('progress').val(perc);
            this.$el.find('#progressView').find('span').text(comp+'/'+total);
            if($('html').hasClass('ie8') || $('html').hasClass('ie9')){
                this.$el.find('progress-bar span').css('width',perc+'%');
            }
        },

        getProgress: function(){
            return this.$el.find('progress').val();
        }

    });

})();
