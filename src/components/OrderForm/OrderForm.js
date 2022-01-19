import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value})
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.value]})
  }

  handleSubmit = e => {
    e.preventDefault()
    
    const newOrder = {
      id: Date.now(),
      ...this.state
    }
    if(this.state.name && this.state.ingredients.length) {

      this.props.addOrder(newOrder)
      this.clearInputs();
    } else {
      this.clearInputs();

    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button data-cy='possible-ingredients' className='possible-ingredients' key={ingredient} name={ingredient} value={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form data-cy='order-form'>
        <input
          data-cy="name-input"
          className='name-input'
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p data-cy='order-selection'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button data-cy='submit-order' className='submit-order' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
