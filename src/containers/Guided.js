import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Header from '../components/Header';
import Level from '../components/Level';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions.js';
import * as AuthActions from '../actions/authActions.js';
import * as SceneActions from '../actions/sceneActions.js';
import * as LevelActions from '../actions/levelActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
* @summary - Guided is used for scripted lesson plans. This path is tightly controlled
* and designed to reduce errors at the cost of some creative freedom. 
* 
* @param {string} text - text for the editor
* @param {array} objects - objects for the MYR render
* @param {array} assets - obj models
* @param {object} user - user info
* @param {object} scene - screne name and id
* @param {string} errors - errors from the render process
* @param {array} actions - render, recover, refresh
* @param {array} level - 
* @param {array} levelActions - 
* 
* @returns - JSX expression
*/
const Guided = ({ editor, user, scene, level, levelActions, actions, authActions, match, sceneActions }) => (
  <div className="App">
    <Header
      logging={authActions}
      sceneActions={sceneActions}
      actions={actions}
      user={user}
      scene={scene}
      text={editor.text}
      message={editor.message}
      projectId={match.params.id} />
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <div style={{ height: "24vh" }}>
          <Level level={level} actions={actions} levelActions={levelActions} user={user} />
        </div>
        <div className='guided'>
          <Editor text={editor.text} user={user} />
        </div>
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={editor.objects} sceneConfig={scene.sceneConfig} assets={editor.assets} />
      </div>
    </div>
  </div>
);

// This makes sure we are getting what we think we should
Guided.propTypes = {
  editor: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  level: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  editor: state.editor,
  user: state.user.user,
  scene: state.scene,
  level: state.level
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EditorActions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  sceneActions: bindActionCreators(SceneActions, dispatch),
  levelActions: bindActionCreators(LevelActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guided);