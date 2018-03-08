import Myr from '../myr/Myr'

var entityModel = [
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 5,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: 0,
      y: 3,
      z: -5
    }
  },
  {
    geometry: {
      primitive: "box"
    },
    material: {
      color: "red"
    },
    position: {
      x: -5,
      y: 3,
      z: -5
    }
  }
]

const initial_state = {
  text: "// Input your code here\nbox();",
  objects: entityModel
}

export default function scene(state = initial_state, action) {
  switch (action.type) {
    case 'EDITOR_RENDER':
      try{
        // eslint-disable-next-line
        var x;
        let m = new Myr;
        let funs = Object.getOwnPropertyNames(m).filter(function (p) {
          return typeof m[p] === 'function';
        })
        let snapshot = action.text;
        for (var fun of funs) {
          snapshot = snapshot.replace(fun+"(","myr."+fun+"(");
        }
        debugger
        x = eval("var myr = new Myr();\n" + snapshot + "\nmyr.els;");
      }
      catch(err){
        console.error("Eval failed")
      }
      return {
          text: action.text,
          objects: entityModel.concat(x)
      }
    case 'EDITOR_REFRESH':
      return initial_state
    default:
      return state
  }
}