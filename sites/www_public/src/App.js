import React, {Component} from 'react';
import './App.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import OrderForm from "./components/OrderForm";
import Logo from "./components/Logo";
import Items from "./components/Items";
import { withSnackbar } from 'notistack';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            airplanes: [],
            totalCargoWeightAllowed: 0,
            currentCargoWeight: 0,
            cargo: []
        };

        this.handleSubmit =this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost/api/airplanes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    airplanes: data.data
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    setCurrentCargoWeight = (payload) => {
        this.setState({currentCargoWeight: payload});
    }

    currentCargoWeight = () => (this.state.currentCargoWeight);

    setTotalCargoWeightAllowed = (payload) => {
        this.setState({totalCargoWeightAllowed: payload});
    }

    handleSubmit(event) {
        event.preventDefault();

        let totalCargo = 0;
        let m;


        const formData = new FormData(event.currentTarget);

        let requestBody = {
            "from": '',
            "to": '',
            "date": '',
            "airplane": '',
            "cargo": []
        }

        formData.forEach((value, property) => {
            if(property === 'airplane') {
                requestBody[property] = value;
            } else {
                m = [];
                m = property.match(/item\[(?<id>\d)](?<val>.*)/);
                if(m) {
                    if(requestBody.cargo[m[1]] === undefined) {
                        requestBody.cargo[m[1]] = {}
                    }
                    Object.assign(requestBody.cargo[m[1]],{[m[2]]: value})
                    if(m[2] === 'weight') {
                        totalCargo = totalCargo + parseFloat(value);
                    }
                } else {
                    requestBody[property] = value;
                }

            }
        });

        if(totalCargo > this.state.totalCargoWeightAllowed) {
            this.props.enqueueSnackbar('Too much cargo! Reduce items!.', {variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
            return;
        }

        requestBody.cargo = requestBody.cargo.filter(n => n);

        fetch("http://localhost/api/transports",
            {
                body: JSON.stringify(requestBody),
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status} ${response.statusText}`);
                }
                return response.json()
            })
            .then((data) => {
                this.props.enqueueSnackbar('Transport order send!.', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
                event.target.reset();
                setTimeout(function () {
                    window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
                }, 1500);
            })
            .catch((error) => {
                this.props.enqueueSnackbar('Something went wrong!.', {variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top' }});
                console.error('Error:', error);
            });
    }

  render() {
    return (
            <form onSubmit={this.handleSubmit}>
              <div className="App">
                  <Grid2 container spacing={0.5}>
                      <Grid2 xs={6}>
                          <Logo/>
                      </Grid2>
                      <Grid2 xs={6} className="HeaderImage"></Grid2>
                      <Grid2 xs={12}>
                          <OrderForm airplanes={this.state.airplanes} setTotalCargoWeightAllowed={this.setTotalCargoWeightAllowed} />
                      </Grid2>
                      <Grid2 xs={3} sm={4} md={12}>
                              <Items currentCargoWeight={this.currentCargoWeight} setCurrentCargoWeight={this.setCurrentCargoWeight} />
                      </Grid2>
                  </Grid2>
              </div>
            </form>
    );
  }
}

export default withSnackbar(App);
