# snabbdom components

using the ELM architecture described in the article
https://medium.com/@yelouafi/react-less-virtual-dom-with-snabbdom-functions-everywhere-53b672cb2fe3

----

## setup

    npm install
    npm run all
    python -m SimpleHTTPServer
    # visit http://127.0.0.1:8000

----

## structure


### main

The `main()` function bootstraps the app to the DOM.
Parameters are:

    main(
      state     : Object,
      targetEl  : Element,
      component : Object (w/ view & update functions as keys)
    ) : void

You have therefore to elect one component to render at top level.
It can spawn other components itself, resulting in a tree of responsibilities.


### component

Each component exports at least:

The `view()` function, which returns a Virtual DOM view of the given component state.
Parameters are:

    view(
      state   : Object,
      handler : Function
    ) : VDomEl


The `update()` function is responsible for updating the state of the component.
Try to return a new object instead of updating the existing one (use literals, slice, spread op, etc.)

    update(
      state  : Object,
      action : Object (with at least a type string or Symbol)
    ) : new state

Supported actions being returned back as the component actions key can be useful.
