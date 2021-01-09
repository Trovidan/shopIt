import NavbarComponent from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsComponent from './components/products';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import CartComponent from './components/cart';
import Checkout from './components/checkout';
import Table from './components/Table/Table.js'
import "antd/dist/antd.css";
import {dummyTableStructure, dummyData } from './components/Table/utility.js'

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path='/'>
              <NavbarComponent />
              <Route exact path='/antd/table'>
                <Table data={dummyData} tableStructure={dummyTableStructure} />
              </Route>
              <Route exact path="/" component={ProductsComponent} />
              <Route exact path='/product' component={ProductsComponent}/>
              <Route exact path='/cart' component={CartComponent}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
