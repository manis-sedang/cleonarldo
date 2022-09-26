'use babel';

import CleonarldoView from './cleonarldo-view';
import { CompositeDisposable } from 'atom';

export default {

  cleonarldoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cleonarldoView = new CleonarldoView(state.cleonarldoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cleonarldoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cleonarldo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cleonarldoView.destroy();
  },

  serialize() {
    return {
      cleonarldoViewState: this.cleonarldoView.serialize()
    };
  },

  toggle() {
    console.log('Cleonarldo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
