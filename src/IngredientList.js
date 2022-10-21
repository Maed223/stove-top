import React from 'react';



export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Ingredient: "",
      items: []
    }
  }

  updateIngredient(event) {
    this.setState({
      Ingredient: event.target.value
    });
  }

  handleClick() {
    var items = this.state.items;

    items.push(this.state.Ingredient);

    this.setState({
      items: items,
      Ingredient: ""
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i]  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, i) {
              return (
                <tr key={"item-" + i}>
                  <td>
                    <input
                      type="text"
                      value={o}
                      onChange={context.handleItemChanged.bind(context, i)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={context.handleItemDeleted.bind(context, i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            });
  }

  render() {
    return (
      
      <div>
        <table className="">
          <thead>
            <tr>
              <th>
                Ingredients
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr/>
        <input
          type="text"
          value={this.state.Ingredient}
          onChange={this.updateIngredient.bind(this)}
        />
        <button
          onClick={this.handleClick.bind(this)}
        >
          Add Item
        </button>
      </div>
    );
  }
}