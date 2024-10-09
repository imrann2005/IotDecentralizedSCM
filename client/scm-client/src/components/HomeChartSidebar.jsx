import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// const sourceData = [
//     {
//         "label": "Ads",
//         "value": 32
//     },
//     {
//         "label": "Subscriptions",
//         "value": 45
//     },
//     {
//         "label": "Sponsorships",
//         "value": 23
//     }
// ]

const checkPoints = {
    1: "Manufacturer's Warehouse",
    2: "Quality Control",
    3: "Packaging",
    4: "Manufacturer Dispatch",
    5: "Supplier Warehouse",
    6: "Customs Clearance",
    7: "Loading for Shipment",
    8: "In Transit",
    9: "Destination Customs",
    10: "Supplier Dispatch",
    11: "Local Warehouse",
    12: "Out For Local Delivery",
    13: "Delivered",
    14: "Returned",
    15: "Disposed"
}

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


const HomeChartSidebar = ({ data }) => {
    const shipmentData = data;/* Shipment Array Data */

    const locationCount = shipmentData.reduce((acc, curr) => {
        const loc = curr.currentLocation;
        if (acc[loc]) {
            acc[loc]++;
        } else {
            acc[loc] = 1;
        }
        return acc;
    }, {});

    const sourceData = Object.keys(locationCount).map(key => ({
        label: checkPoints[key],
        value: locationCount[key]
    }));

    // Aggregate product data based on ShipmentName and sum the quantity
    const productCount = shipmentData.reduce((acc, curr) => {
        const product = curr.ShipmentName;
        if (acc[product]) {
            acc[product] += curr.quantity;
        } else {
            acc[product] = curr.quantity;
        }
        return acc;
    }, {});

    const productData = Object.keys(productCount).map(key => ({
        label: key,
        value: productCount[key]
    }));

    const shipmentCountByDate = shipmentData.reduce((acc, curr) => {
        const date = new Date(curr.createdAt).toLocaleString();
        if (acc[date]) {
            acc[date] += curr.quantity;
        } else {
            acc[date] = curr.quantity;
        }
        return acc;
    }, {});

    const shipmentDataByDate = Object.keys(shipmentCountByDate).map(date => ({
        label: date,
        value: shipmentCountByDate[date],
    }));

    console.log(shipmentDataByDate);

    //console.log(productData);

    // console.log(sourceData);

    const classes = ''
    return (
        <div className='bg-[#fffcfc] flex justify-evenly py-2 poppins-light px-2 ' >
            <div className='bg-[#fffcfc] py-4 px-4 shadow-md'>
                <Doughnut
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Count",
                                data: sourceData.map((data) => data.value),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                                borderColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Shipment Status",
                            },
                        },
                    }}
                />
            </div>
            <div className='bg-[#fffcfc] py-4 px-4 shadow-md'>
                <Bar
                    data={{
                        labels: productData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Quantity",
                                data: productData.map((data) => data.value),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(66, 186, 150, 0.8)",
                                    "rgba(100, 149, 237, 0.8)",
                                ],
                                borderColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(66, 186, 150, 0.8)",
                                    "rgba(100, 149, 237, 0.8)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            },
                            title: {
                                display: true,
                                text: 'Shipment-Wise Quantity',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
            <div className='bg-[#fffcfc] py-4 px-4 shadow-md'>
                <Line
                    data={{
                        labels: productData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Quantity",
                                data: productData.map((data) => data.value),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(66, 186, 150, 0.8)",
                                    "rgba(100, 149, 237, 0.8)",
                                ],
                                borderColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(66, 186, 150, 0.8)",
                                    "rgba(100, 149, 237, 0.8)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                            },
                            title: {
                                display: true,
                                text: 'Shipment-Wise Quantity',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
            <div className='bg-slate-400 '>

            </div>
        </div>
    )
}

export default HomeChartSidebar