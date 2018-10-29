# Additions to the code made during presentation

In order to show the evolution of the app from newly created to complete, tedious changes will be stored here to be copy + pasted into the code during the presentation.

## Files

### src/index.css
```css
* {
  box-sizing: border-box;
  font-family: Verdana;
}

html, body, #root {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  border: none;
  overflow: hidden;
}

main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-content: flex-start;
  align-items: flex-start;
  
  width: 100%;
  height: 100vh;
}

main > header {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 0 0 0 1em;
  
  background-color: #191919;
  color: #efefef;
}

main > header > nav {
  height: 100%;
  padding: 0;
  margin: 0;
}

main > header > nav > a {
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: #efefef;
  transition: all .33s ease;
  padding: 1em;
}

main > header > nav > a:hover {
  background-color: #dddddd;
  color: #141414;
}

main > article {
  overflow-x: hidden;
  overflow-y: auto;
  
  padding: 1em;
  background-color: #ffffff;
  color: #141414;
  width: 100%;
  height: calc(100vh - 75px);
}

```

### src/Layout.js

```jsx
import React from 'react';

export default ({ children }) => (
  <main>
    <header>
      <h4>
      Title Here
      </h4>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
      </nav>
    </header>
    <article>
      { children }
    </article>
  </main>
);

```

### src/FormField.js

```jsx
import React from 'react';

export default class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.handleValueChanged = this.handleValueChanged.bind(this);
  }

  handleValueChanged(evt) {
    evt.stopPropogation();

    this.setState({ value: evt.target.value() }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.value);
      }
    });
  }

  render() {
    return <input 
              type="text" 
              id={this.props.id || `field_${Date.now()}`} 
              className={this.props.className || ''} 
              value={this.state.value} 
              onChange={this.handleValueChanged} />;
  }
}

```

### src/Drivers.js

```jsx
import React from 'react';

export default (props) => (

);

```

### src/Vehicle.js

