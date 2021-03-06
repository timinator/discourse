/**
  A base class for helping us display modal content

  @class ModalView
  @extends Ember.ContainerView
  @namespace Discourse
  @module Discourse
**/
Discourse.ModalView = Ember.ContainerView.extend({
  childViews: ['modalHeaderView', 'modalBodyView', 'modalErrorsView'],
  classNames: ['modal', 'hidden'],
  classNameBindings: ['controller.currentView.modalClass'],
  elementId: 'discourse-modal',

  modalHeaderView: Ember.View.create({
    templateName: 'modal/modal_header',
    titleBinding: 'controller.currentView.title'
  }),

  modalBodyView: Ember.ContainerView.create({
    currentViewBinding: 'controller.currentView'
  }),

  modalErrorsView: Ember.View.create({
    templateName: 'modal/modal_errors'
  }),

  viewChanged: (function() {
    var view,
      _this = this;
    this.set('modalErrorsView.errors', null);
    if (view = this.get('controller.currentView')) {
      $('#modal-alert').hide();
      return Em.run.next(function() {
        return _this.$().modal('show');
      });
    }
  }).observes('controller.currentView')

});


