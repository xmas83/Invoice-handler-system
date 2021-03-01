import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp,faThumbsDown,faImage,faMoneyCheckAlt,faSearchDollar} from '@fortawesome/free-solid-svg-icons'


class App extends Component {
  state = {
    isLoading: false,
    invoices: [],
      /*{
        "id": "100",
        "Vendor": "Hankook",
        "Amount": "$18,000",
        "Invoice": "1123",
        "Date": "02/10/2021"

      },
      {
        "id": "200",
        "Vendor": "Hankook",
        "Amount": "$12,500",
        "Invoice": "1133",
        "Date": "02/09/2021"

      },
      {
        "id": "300",
        "Vendor": "Hankook",
        "Amount": "$19,120",
        "Invoice": "1113",
        "Date": "02/14/2021"

      }
    ]*/
  }

  remove(id) {
    let updatedInvoices = [...this.state.invoices].filter(i => i.id !== id);
    this.setState({invoices: updatedInvoices});
  }

  async componentDidMount(){
    const response = await fetch('https://j1ymgu28x4.execute-api.eu-north-1.amazonaws.com/Dev');
    const body = await response.json();
    this.setState({invoices:body,isLoading:false});

  }


  render() {
    const isLoading = this.state.isLoading;
    const allInvoices = this.state.invoices;


    if (isLoading)
      return (<div>Loading...</div>);

    let invoices =
      allInvoices.map(invoice =>
        <tr key={invoice.id}>
          <td>{invoice.Vendor}</td>
          <td>{invoice.Amount}</td>
          <td>{invoice.Invoice}</td>
          <td>{invoice.Date}</td>
          <td><Button className="btn btn-lg btn-success" onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faThumbsUp}/> OK</Button></td>
          <td><Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faThumbsDown}/> NOK</Button></td>
          <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faMoneyCheckAlt}/> 50%</Button></td>
          <td><Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faSearchDollar}/> ??</Button></td>
          <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faImage}/> Image</Button></td>
        </tr>
      )


    return (
      <div className={'container border border-secondary rounded center'}>
        <div className={'row'}>
          <div className={'col-12'}>
            <h4>Pending Invoices - The Test Company</h4>
          </div>
        </div>
        <div className={'row'}>
          <div className={'.col-xs-12 center text-center'}>
            <Table dark responsive striped bordered hover>
              <thead>
              <tr>
              <th scope={'row'}>Vendor</th>
              <th scope={'row'}>Amount</th>
              <th scope={'row'}>Invoice #</th>
              <th scope={'row'}>Date</th>
              <th scope={'row'} colSpan={'4'}>Action</th>
              <th scope={'row'}>Image</th>
              </tr>
              </thead>
              <tbody>
              {this.state.invoices.length === 0 ? <td colSpan={'9'}>You're all caught up!</td> : invoices}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
