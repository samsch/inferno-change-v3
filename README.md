# Controlled input bug - Inferno v3

Inferno input elements with a value prop should not change on text input unless the value prop changes, such as when using onInput to get user input. However, the input **does** change, which means you can use **onChange** and have functionality somewhat similar to onInput, but without the actual state updates (just the DOM updates, as if it was uncontrolled).

## Running the app
To install dependencies, run `npm install`.

The app can then be run with `npm start`.

In the app, you can type in the text input as if it was an uncontrolled input.

Hit enter and the onChange event goes through, and the form submits.
