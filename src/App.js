import "./App.css";
import React, { useState, useEffect } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";

const Calculator = () => {
  const [kwh, setKwh] = useState("");
  const [cup, setCup] = useState(0);
  const [cupOld, setCupOld] = useState(0);
  const [usd, setUsd] = useState(0);
  useEffect(() => {
    const prices = [//kW (cumulative)
      [100, 0.33],	//0-100
      [50, 1.07],	//101-150
      [50, 1.43],	//151-200
      [50, 2.46],	//201-250
      [50, 3.],		//251-300
      [50, 4.],		//301-350
      [50, 5.],		//351-400
      [50, 6.],		//401-450
      [50, 7.],		//451-500
      [100, 9.2],	//501-600
      [100, 9.45],	//601-700
      [300, 9.85],	//701-1000
      [800, 10.8],	//1001-1800
      [800, 11.8],	//1801-2600
      [800, 12.9],	//2601-3400
      [800, 13.95],	//3401-4200
      [800, 15],	//4201-5000
      [100000000000, 20],//5000-..
    ];
    /*
    const initialPrices = [
      [100, 0.4],
      [50, 1.3],
      [50, 1.75],
      [50, 3],
      [50, 4],
      [50, 7.5],
      [150, 9],
      [500, 10],
      [4000, 15],
      [100000000000, 25],
    ];
    */
    const pricesOld = [
      [100, 0.09],
      [50, 0.3],
      [50, 0.4],
      [50, 0.6],
      [50, 0.8],
      [50, 1.5],
      [150, 1.8],
      [500, 2],
      [4000, 3],
      [1000000, 5],
    ];
    const calculateCup = (kWh, pricesData) => {
      var amount = 0;
      for (let i = 0; i <= pricesData.length; i++) {
        var price = pricesData[i];
        if (kWh <= price[0]) {
          amount += kWh * price[1];
          return amount;
        }
        amount += price[0] * price[1];
        kWh -= price[0];
      }
    };
    if (!isNaN(kwh) && kwh < 1000000) {
      setCup(calculateCup(kwh, prices));
      setCupOld(calculateCup(kwh, pricesOld));
    }
  }, [kwh]);
  useEffect(() => {
    setUsd(cup / 24);
  }, [cup]);
  return (
    <div className="p-3 m-2 text-center">
      <InputGroup>
        <FormControl
          id="kWh"
          value={kwh}
          className="text-center"
          onChange={(e) => setKwh(e.target.value)}
          autofocus="true"
          inputMode="numeric"
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon3">kWh</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <Container className="p-3 my-3 oldPrice rounded">
        <h3>Antes de 01/01/2021</h3>
        <Table striped borderless hover className="text-center">
          <thead>
            <tr>
              <th>CUP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${cupOld.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className="p-3 my-3 newPrice rounded">
        <h3 className="m-2">Después de 01/01/2021</h3>
        <Table striped borderless hover className="text-center">
          <thead>
            <tr>
              <th>CUP</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${cup.toFixed(2)}</td>
              <td>${usd.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

function App() {
  return (
    <Container>
      <Jumbotron className="p-3 m-2 bg-primary text-light">
        <h1 className="header text-center">
          Calcule su factura eléctrica en Cuba
        </h1>
      </Jumbotron>
      <Calculator />
    </Container>
  );
}

export default App;
