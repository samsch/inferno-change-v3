import Inferno from 'inferno';

const Component = props => (
  <div>
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log('Form submit', props.text);
      }}
    >
      <div>
        <label>
          Text{' '}
          <input
            type="text"
            value={props.text}
            onChange={e => props.update(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
);
export default Component;
