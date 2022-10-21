import React from "react";

import CustomStore from "devextreme/data/odata/store";

import DataGrid, { Column, Selection } from "devextreme-react/data-grid";

import DiscountCell from "./DiscountCell.js";

const pageSizes = [10, 25, 50, 100];

// Simulate a delay.
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

class MyCustomStore extends CustomStore {
  constructor(options) {
    super({
      ...options,
      ...{
        load: () => {
          super.load(...arguments);
        }
      }
    });
  }
}
const dataSourceOptions = {
  store: new MyCustomStore({
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request) {
      request.params.startDate = "2020-05-10";
      request.params.endDate = "2020-05-15";
    }
    // load: async (options) => {
    //   await wait(10000);
    //   return {
    //     data: new Array(1000)
    //       .fill(0)
    //       .map((_, index) => ({ id: index, name: "Test " + index }))
    //   };
    // }
  })
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.onContentReady = this.onContentReady.bind(this);
  }

  render() {
    return (
      <div className="dx-selection-disabled">
        <DataGrid
          dataSource={dataSourceOptions}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
          onContentReady={this.onContentReady}
        >
          <Selection mode="multiple" showCheckBoxesMode="always" />

          <Column dataField="Product" />
          <Column
            dataField="Amount"
            caption="Sale Amount"
            dataType="number"
            format="currency"
            alignment="right"
          />
          <Column
            dataField="Discount"
            caption="Discount %"
            dataType="number"
            format="percent"
            alignment="right"
            allowGrouping={false}
            cellRender={DiscountCell}
            cssClass="bullet"
          />
          <Column dataField="SaleDate" dataType="date" />
          <Column dataField="Region" dataType="string" />
          <Column dataField="Sector" dataType="string" />
          <Column dataField="Channel" dataType="string" />
          <Column dataField="Customer" dataType="string" width={150} />
        </DataGrid>
      </div>
    );
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(["EnviroCare"]);
      this.setState({
        collapsed: true
      });
    }
  }
}

export default App;
