glift.rules.movenode = function(properties, children, nodeId, parentNode) {
  return new glift.rules._MoveNode(properties, children, nodeId, parentNode);
};

glift.rules._MoveNode = function(properties, children, nodeId, parentNode) {
  this._properties = properties || glift.rules.properties();
  this.children = children || [];
  // nodeId has the form { nodeNum: 0, varNum: 0 };
  this._nodeId = nodeId || { nodeNum: 0, varNum: 0 };
  this._parentNode = parentNode;
};

glift.rules._MoveNode.prototype = {
  properties:  function() {
    return this._properties;
  },

  /**
   * Set the NodeId. Each node has an ID based on the depth and variation
   * number.
   *
   * Great caution should be exercised when using this method.  If you
   * don't adjust the surrounding nodes, the movetree will get into a funky
   * state.
   */
  _setNodeId: function(nodeNum, varNum) {
    this._nodeId = { nodeNum: nodeNum, varNum: varNum };
    return this;
  },

  /**
   * Get the node number (i.e., the depth number).  For our purposes, we
   * consider passes to be moves, but this is a special enough case that it
   * shouldn't matter for most situations.
   */
  getNodeNum: function() {
    return this._nodeId.nodeNum
  },

  /**
   * Get the variation number.
   */
  getVarNum: function() {
    return this._nodeId.varNum
  },

  /**
   * Get the number of children.  This the same semantically as the number of
   * variations.
   */
  numChildren: function() {
    return this.children.length;
  },

  /**
   * Add a new child node.
   */
  addChild: function() {
    this.children.push(glift.rules.movenode(
      glift.rules.properties(),
      [], // children
      { nodeNum: this.getNodeNum() + 1, varNum: this.numChildren() },
      this));
    return this;
  },

  /**
   * Get the next child node.  This the same semantically as moving down the
   * movetree.
   */
  getChild: function(variationNum) {
    if (variationNum === undefined) {
      return this.children[0];
    } else {
      return this.children[variationNum];
    }
  },

  /**
   * Return the parent node. Returns util.none if no parent node exists.
   */
  getParent: function() {
    if (this._parentNode ) {
      return this._parentNode;
    } else {
      return glift.util.none;
    }
  },

  /**
   * Renumber the nodes.  Useful for when nodes are deleted during SGF editing.
   */
  renumber: function() {
    numberMoves(this, this._nodeId.nodeNum, this._nodeId.varNum);
    return this;
  }
};

// Private number moves function
var numberMoves = function(move, nodeNum, varNum) {
  move._setNodeId(nodeNum, varNum);
  for (var i = 0; i < move.children.length; i++) {
    var next = move.children[i];
    numberMoves(next, nodeNum + 1, i);
  }
  return move;
};
