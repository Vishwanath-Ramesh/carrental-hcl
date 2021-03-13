import React from "react";

import carIcon from "./car.svg";
import "./App.css";

function carRentalReducer(state, action) {
  switch (action.type) {
    case "SHOW_FORM":
      return { ...state, showForm: action.showForm };
    case "SET_VEHICLES_DATA":
      return { ...state, vehicles: action.vehicles };
    case "SET_SELECTED_VEHICLE":
      return {
        ...state,
        selectedVehicle: state.vehicles.find(
          (vehicle) => vehicle.id === action.selectedVehicle
        ),
      };
    case "SET_CONFIRMBOOKING":
      return {
        ...state,
        bookingConfirmed: action.bookingConfirmed,
      };
    case "SET_PAYABLEAMOUNT":
      return {
        ...state,
        payableAmount: action.payableAmount,
      };
    case "UPDATE_BOOKINGDETAILS":
      if (!Object.entries(action.bookingDetails).length)
        return { ...state, bookingDetails: {} };

      return {
        ...state,
        bookingDetails: { ...state.bookingDetails, ...action.bookingDetails },
      };
    default:
      throw new Error(`Invalid action type - ${action.type}`);
  }
}

function App() {
  const initialState = {
    showForm: false,
    vehicles: [
      {
        id: 1,
        name: "Mruti Swft 2050",
        price: 5.2,
        available: false,
        rental_price: 5000,
        type: "Hatchback",
      },
      {
        id: 2,
        name: "Rnault Kger",
        price: 5.2,
        available: true,
        rental_price: 3000,
        type: "SUV",
      },
      {
        id: 3,
        name: "Adi x-ton",
        price: 5.2,
        available: false,
        rental_price: 5000,
        type: "SUV",
      },
      {
        id: 4,
        name: "And over ange over port",
        price: 209,
        available: false,
        rental_price: 100000,
        type: "Luxury",
      },
      {
        id: 5,
        name: "Aton rtin BS",
        price: 500,
        available: true,
        rental_price: 500000,
        type: "Luxury",
      },
      {
        id: 6,
        name: "Ercedes-Enz A",
        price: 35,
        available: false,
        rental_price: 50000,
        type: "Sedan",
      },
      {
        id: 7,
        name: "MW 2 Series",
        price: 32,
        available: false,
        rental_price: 50000,
        type: "Hatchback",
      },
    ],
    selectedVehicle: null,
    bookingConfirmed: false,
    bookingDetails: {},
    payableAmount: 0,
  };

  const [state, dispatch] = React.useReducer(carRentalReducer, initialState);

  function onVehicleClickHandler(vehicleId) {
    dispatch({
      type: "SET_SELECTED_VEHICLE",
      selectedVehicle: vehicleId,
    });
    dispatch({
      type: "SHOW_FORM",
      showForm: true,
    });
  }

  function onInputChangeHandler(event) {
    dispatch({
      type: "UPDATE_BOOKINGDETAILS",
      bookingDetails: { [event.target.name]: event.target.value },
    });
  }

  function onConfirmBookingHandler() {
    const { bookingDetails, selectedVehicle } = state;
    debugger;
    fetch("/request", {
      method: "POST",
      body: JSON.stringify({
        name: bookingDetails.name,
        email: bookingDetails.email,
        mobile: bookingDetails.mobile,
        vehicle: {
          ...selectedVehicle,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_CONFIRMBOOKING", bookingConfirmed: true });
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onConfirmBookingCloseHandler() {
    dispatch({ type: "SHOW_FORM", showForm: false });
    dispatch({
      type: "UPDATE_BOOKINGDETAILS",
      bookingDetails: {},
    });
    dispatch({
      type: "SET_PAYABLEAMOUNT",
      payableAmount: 0,
    });
  }

  function onDurationChangeHandler(event) {
    dispatch({
      type: "SET_PAYABLEAMOUNT",
      payableAmount: event.target.value * selectedVehicle.rental_price,
    });
  }

  React.useEffect(() => {
    // fetch("/vehicle")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch({
    //       type: "SET_VEHICLES_DATA",
    //       vehicles: data,
    //     });
    //     console.log(data);
    //   });
  }, []);

  const { showForm, vehicles, selectedVehicle, payableAmount } = state;

  return (
    <div>
      <h1 className="heading">Online Car Rental Service</h1>
      <div className="container">
        {vehicles.map((vehicle) => {
          return (
            <div
              key={vehicle.id}
              data-testid={`car_${vehicle.id}`}
              name={`car_${vehicle.id}`}
              className="card"
              onClick={() => onVehicleClickHandler(vehicle.id)}
            >
              <img src={carIcon} alt="Car" />
              <h1>{vehicle.name}</h1>
              <h2>{`${vehicle.price} Lakh (Estimated Price)`}</h2>
              <div className="rental-price">{`${vehicle.rental_price} INR/Month`}</div>
              <p className="vehicle-type">{vehicle.type}</p>
            </div>
          );
        })}
        {showForm && (
          <form className="request-form">
            <div className="content">
              <h1>Booknow</h1>
              <label htmlFor="">Model</label>
              <div className="model-name">{selectedVehicle.name}</div>
              <label htmlFor="">Duration</label>
              <br />
              <input
                type="radio"
                name="duration"
                value="1"
                data-testid={`duration_1`}
                onClick={onDurationChangeHandler}
              />
              <label for="duration">1 Month</label>
              <br />
              <input
                type="radio"
                name="duration"
                value="3"
                data-testid={`duration_3`}
                onClick={onDurationChangeHandler}
              />
              <label for="duration">3 Month</label>
              <br />
              <input
                type="radio"
                name="duration"
                value="6"
                data-testid={`duration_6`}
                onClick={onDurationChangeHandler}
              />
              <label for="duration">6 Month</label>
              <br />
              <input
                type="radio"
                name="duration"
                value="12"
                data-testid={`duration_12`}
                onClick={onDurationChangeHandler}
              />
              <label for="duration">1 Year</label>
              <br />
              <label htmlFor="">{`Rental Price : ${selectedVehicle.rental_price}/Month`}</label>
              <div
                className="amount-payable"
                data-testid="amount-payable"
              >{`Payable Amount : ₹ ${payableAmount}`}</div>
              <h2>Your Details</h2>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                data-testid="name"
                name="name"
                onChange={onInputChangeHandler}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                data-testid="email"
                name="email"
                onChange={onInputChangeHandler}
              />
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                data-testid="mobile"
                name="mobile"
                onChange={onInputChangeHandler}
              />
              <div className="frm-action-btn">
                <button
                  data-testid="submitbtn"
                  type="button"
                  onClick={onConfirmBookingHandler}
                >
                  Submit
                </button>
                <button type="button" onClick={onConfirmBookingCloseHandler}>
                  Close
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="success-message"></div>
    </div>
  );
}

export default App;
