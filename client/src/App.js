import React, { Component } from 'react';
import axios from 'axios';
import Auxiliary from './hoc/Auxiliary';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Cupom from './components/Cupom/Cupom';
import Summary from './components/Summary/Summary';
import Button from './components/UI/Button/Button';
import Modal from './components/UI/Modal/Modal';

import logo from './logo.svg';
import styles from "./App.scss";

class App extends Component {
  state = {
    product: {
      image: null,
      title: null,
      price: null
    },
    checkout: {
      id: null,
      shipping: null,
      totalPrice: null,
      cupom: {
        id: null,
        title: null,
        discount: null
      }
    },
    action: null,
    loading: false,
    discountValue: null,
    discountId: null
  }

  componentWillMount() {
    this.setState({loading: true});
    this.getDefaultPrices();
  }

  getDefaultPrices() {
    axios.get('http://localhost:5000/api/checkouts/6544')
      .then(response => {
        this.setProductState(response.data.product);
        this.setCheckoutState(response.data.checkout);

        //Array de cupons disponíveis
        let cupons = [];
        response.data.checkout.availableCoupons.forEach(item => {
          cupons.push(item);
        });
        this.setCuponsState(cupons);
        if(this.state.loading) {
          this.setState({loading: false});
        }
      });
  }

  radioChangeHandler = (event) => {
    let value = event.target.value;
    if(value) {
      axios.get(`http://localhost:5000/api/checkouts/6544?couponId=${value}`)
        .then(response => {
          this.setProductState(response.data.product);
          this.setCheckoutState(response.data.checkout);
          this.setDiscount(response.data.checkout.availableCoupons, value);
        })
    }
    else {
      this.getDefaultPrices();
      this.setState({discountValue: null});
      this.setState({discountId: null});
    }
  }

  setDiscount = (cupons, id) => {
    const selectedCupom = cupons.filter(cupom => {
      return +cupom.id === +id
    });
    this.setState({discountValue: selectedCupom[0].discount});
    this.setState({discountId: selectedCupom[0].id});
  }

  setProductState = (product) => {
    const productState = {...this.state.product};
    productState.image = product.image;
    productState.title = product.title;
    productState.price = product.price;
    this.setState({product: productState});
  }

  setCheckoutState = (checkout) => {
    const checkoutState = {...this.state.checkout};
    checkoutState.shipping = checkout.shippingPrice;
    checkoutState.totalPrice = checkout.totalPrice;
    checkoutState.id = checkout.id;

    this.setState({checkout: checkoutState});
  }

  setCuponsState = (cupons) => {
    const cupomState = [{...this.state.checkout.cupom}];
    cupons.forEach((item, index) => {
      cupomState[index].id = cupons[index].id
      cupomState[index].title = cupons[index].title;
      cupomState[index].discount = cupons[index].discount;
    });

    this.setState(prevState => ({
      ...prevState,
      checkout: {
        ...prevState.checkout,
        cupom: cupomState
      }
    }));
  }

  modalHandler = () => {
    this.setState({action: null});
  }

  buttonActionHandler = (action) => {
    if(action === 'confirm') {
      this.confirmPurchase(this.state.discountId);
    }
    this.setState({action: action});
  }

  confirmPurchase = (id) => {
    let cupom = {cupomId: id}
    axios.post('http://localhost:5000/api/checkouts/6544', cupom)
      .then(response => {
        //Status 200!
        console.log(response);
      })
  }

  render() {

    let content = (
      <Auxiliary>
        <div className={styles['width-wrapper']}>
          <Product
            image={this.state.product.image}
            title={this.state.product.title} />
          <Cupom
            cupons={this.state.checkout.cupom}
            change={this.radioChangeHandler} />
          <Summary
            price={this.state.product.price}
            discount={this.state.discountValue}
            shipping={this.state.checkout.shipping}
            totalPrice={this.state.checkout.totalPrice} />
        </div>
        <div className={styles['actions-wrapper']}>
          <div className={[styles['width-wrapper'], styles['buttons-wrapper']].join(' ')}>
            <Button
              btnType="cancel"
              clicked={this.buttonActionHandler}>cancelar</Button>
            <Button
              btnType="confirm"
              clicked={this.buttonActionHandler}>confirmar</Button>
          </div>
        </div>
      </Auxiliary>
    );

    if(this.state.loading) {
      content = (
        <div className={[styles['width-wrapper'], styles.loading].join(' ')}>Loading product</div>
      );
    }

    return (
      <div className={styles['app-wrapper']}>
        <Header logo={logo} />
        <main>
          <Modal
            show={this.state.action}
            modalClose={this.modalHandler} />
          {content}
        </main>

      </div>
    );
  }
}

export default App;
