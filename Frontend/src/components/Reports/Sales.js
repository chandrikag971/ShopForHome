import React, { useContext, useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import UserContext from '../../context/UserContext/UserContext'

function Sales() {
    const [productList, setProductList] = useState([])
    const {token} = useContext(UserContext)

    let data = {}

    productList.forEach(product => {
      let category = product.tags[0]
      if(category in data){
        data[category][0] += product.revenue
        data[category][1] += product.sold
      } else {
        data[category] = [product.revenue,product.sold]
      }
    })

    // Pie Chart
    let pieChartData = Object.keys(data).map((key)=>{
      return [key,data[key][0]]
    })

    pieChartData.unshift(["category", "Revenue"]);

    const pieChartOptions = {
      title: "Revenue Report",
      is3D: true,
    };

    // Bar Chart
    let barChartData = Object.keys(data).map((key)=>{
      return [key,data[key][0],data[key][1]]
    })

    barChartData.unshift(["category","Revenue","Sales"]);

    const barChartOptions = {
      chart: {
        title: "Sales Report",
        subtitle: "Revenue and Sales"
      }
    };

    // Bar Chart Based on Revenue per Day

    let salesData = {}

    productList.forEach(product => {
      product.saleRecords.forEach(record => {
        
        let date = new Date(record.saleDay)
        let formattedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        if(formattedDate in salesData){
          salesData[formattedDate] += record.dayRevenue
        } else {
          salesData[formattedDate] = record.dayRevenue
        }
      })
    })

    const dateComparison = (d1, d2) => {
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      return date1 - date2;
    }

    let dayRevenueData = Object.keys(salesData).map((key)=>{
      return [key,salesData[key]]
    })

    dayRevenueData.sort((data1,data2)=>dateComparison(data1[0],data2[0]))

    dayRevenueData.unshift(["Day", "Revenue"]);

    const dayRevenueOptions = {
      chart:{
        title:"Revenue Per Day"
      }
    }


    useEffect(() => {
        fetch(`http://localhost:9000/admin/products/read-all`, {headers: {"token": token}}).then(res => res.json()).then(result => {
            setProductList(()=>{return result})
        })
    }, [])


    return (
      <div>
        <h1 className="textHeadStyle my-3">Sales Report</h1>
        <center>
          <Chart
            chartType="PieChart"
            data={pieChartData}
            options={pieChartOptions}
            width="95%"
            height="400px"
            legendToggle
            style={{ borderBottom: "2px solid gray", marginBottom: "3rem" }}
          />
        </center>
        <center>
          <Chart
            chartType="Bar"
            data={barChartData}
            options={barChartOptions}
            width="95%"
            height="400px"
            legendToggle
            style={{
              borderBottom: "2px solid gray",
              marginBottom: "3rem",
              paddingBottom: "3rem",
            }}
          />
        </center>
        <center>
          <Chart
            chartType="Bar"
            data={dayRevenueData}
            options={dayRevenueOptions}
            width="95%"
            height="400px"
            legendToggle
            style={{ borderBottom: "2px solid gray", paddingBottom: "3rem" }}
          />
        </center>
      </div>
    );
}

export default Sales
