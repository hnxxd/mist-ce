define('app/views/controlled', [],
    //
    //  Controlled View
    //
    //  @returns Class
    //
    function () {

        'use strict';

        return Ember.Component.extend({

            //
            //  Properties
            //

            controllerName: null,


            //
            //  Initialization
            //

            init: function () {
                this._super();
                if (!this.get('controllerName')){
                    this.set('controllerName', this.getControllerName());
                    //this.set('controller', Mist.get(this.controllerName));
                }

                var that = this;
                Ember.run.next(function(){
                    $("[data-role='collapsible']").collapsible({
                        collapse: function(event) {
                            $(this).children().next().slideUp(250);
                            var overlay = $(this).attr('id') ? $('#' + $(this).attr('id')+'-overlay') : false;
                            // console.log(overlay);
                            if (overlay) {
                                overlay.removeClass('in').addClass('ui-screen-hidden');
                                overlay.height($())
                            }
                        },
                        expand: function(event, ui) {
                            var overlay = $(this).attr('id') ? $('#' + $(this).attr('id')+'-overlay') : false;
                            // console.log(overlay);
                            if (overlay) {
                                overlay.removeClass('ui-screen-hidden').addClass('in');
                            }
                            $(this).children().next().hide();
                            $(this).children().next().slideDown(250);
                        }
                    });
                });
            },

            didInsertElement: function () {
                this._super();
                var controller = Mist.get(this.controllerName);
                if (!controller)
                    warn('cannot find ', this.controllerName);
                if (controller) {
                    controller.set('view', this);
                }
            },


            willDestroyElement: function () {
                this._super();
                var controller = Mist.get(this.controllerName);
                if (controller)
                    controller.set('view', null);
            }
        });
    }
);
