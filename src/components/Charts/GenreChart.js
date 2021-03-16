import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import route from "data/Routes";
import { convertGenresForChart, dateFormatter, filterMatcher, keywordGraphMatcher, releaseYearFormatter } from "helpers/convertGenres";
import Loader from "react-loader-spinner";
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "../../css/Charts.css";

export default () => {
    let sDate = new Date()
    sDate = new Date(sDate.getTime() - (7 * 86400000))
    const [barData, setBarData] = useState({});
    const [errors, setErrors] = useState(false);
    const [isloaded, setLoaded] = useState(false);
    const [startDate, setStartDate] = useState(sDate);
    const [endDate, setEndDate] = useState(new Date());
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Genres");

    useEffect(() => {
        makeRequest(startDate, endDate, selectedItem)
            .then((data) => {
                if (data) {
                    convertGenresForChart(data.labels.labels)
                        .then((convertedLabels) => {
                            data.labels = convertedLabels;
                            setBarData(barData => ({ ...data }));
                            setLoaded(isloaded => !isloaded);
                            return;
                        });
                }
                setErrors(erros => !errors)
            }).catch((err) => {
                setErrors(errors => !errors);
            });
    }, []);
    const getNewGraph = () => {
        setLoaded(isloaded => !isloaded);
        makeRequest(startDate, endDate, selectedItem.replace(" ", ""))
            .then((data) => {
                console.log(data);
                if (data) {
                    switch (selectedItem) {
                        case "Genres":
                            convertGenresForChart(data.labels.labels)
                                .then((convertedLabels) => {
                                    data.labels = convertedLabels;
                                    setBarData(barData => ({ ...data }));
                                    setLoaded(isloaded => !isloaded);

                                });
                            break;
                        case "Filters":
                            filterMatcher(data.labels.labels)
                                .then((convertedLabels) => {
                                    console.log(convertedLabels);
                                    data.labels = convertedLabels;
                                    setBarData(barData => ({ ...data }));
                                    setLoaded((isloaded) => !isloaded);

                                });
                            break;
                        case "Keywords":
                            keywordGraphMatcher(data.labels.labels)
                                .then((convertedLabels) => {
                                    data.labels = convertedLabels;
                                    setBarData(barData => ({ ...data }));
                                    setLoaded((isloaded) => !isloaded);
                                });
                            break;
                        case "Daily Generations":
                            dateFormatter(data.labels.labels)
                                .then((convertedLabels) => {
                                    data.labels = convertedLabels;
                                    setBarData((barData) => ({ ...data }));
                                    setLoaded((isloaded) => !isloaded);
                                });
                            break;
                        case "Release Years":
                            releaseYearFormatter(data.labels.labels)
                                .then((convertedLabels) => {
                                    data.labels = convertedLabels;
                                    setBarData((barData) => ({ ...data }));
                                    setLoaded((isloaded) => !isloaded);
                                });
                            break;
                        default:
                            break;
                    }

                }
                setErrors((errors) => !errors);
            }).catch((err) => {
                setErrors((errors) => !errors);
            })
    }
    const toggle = () => {
        setDropDownToggle((dropDownToggle) => !dropDownToggle);
    }
    const dropDownOnClick = (chartType) => {
        setSelectedItem(() => chartType);
    }
    return (
        <Container>
            <Row className="justify-content-center">{errors ? <p>Error recieving chart data, please try again later</p> : ""}</Row>
            <Row className="justify-content-center">
                <Dropdown isOpen={dropDownToggle} toggle={toggle}>
                    <DropdownToggle caret>
                        {selectedItem}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => dropDownOnClick("Genres")}>Genres</DropdownItem>
                        <DropdownItem onClick={() => dropDownOnClick("Filters")}>Filters</DropdownItem>
                        <DropdownItem onClick={() => dropDownOnClick("Keywords")}>Keywords</DropdownItem>
                        <DropdownItem onClick={() => dropDownOnClick("Release Years")}>Release Years</DropdownItem>
                        <DropdownItem onClick={() => dropDownOnClick("Daily Generations")}>Daily Generations</DropdownItem>

                    </DropdownMenu>
                </Dropdown>
                <p>Start Date:</p><DatePicker selected={startDate} onChange={date => setStartDate(date)} className="datePicker mr-2" />
                <p>End Date:</p><DatePicker selected={endDate} onChange={date => setEndDate(date)} maxDate={new Date()} className="datePicker mr-2" />
                <Button style={{ backgroundColor: "#742cff" }} onClick={getNewGraph} size="sm">Get New Graph</Button>  </Row>
            <Row className="justify-content-center">
                {!isloaded ? <Loader type="ThreeDots" color="blue" /> : <Bar data={barData} type="bar" />}
            </Row>
        </Container>
    )
}

async function makeRequest(startDate, endDate, chartType) {
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
    return await axios.get(`${route}/api/data/insights/${startDate}/${endDate}/${chartType}`)
        .then((res) => {
            console.log(res);
            if (res.status !== 200) { return false; }
            return res.data;
        }).catch((err) => false);
}