import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchCurrentSpotThunk, updateCurrentSpotThunk } from "../../store/spots";
import "./UpdateSpot.css"
// import SpotForm from "../SpotForm";

const UpdateSpot = () => {
    let currSpot;

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const [errors, setErrors] = useState({});
    const [submitWithErrors, setSubmitWithErrors] = useState(false);


    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {

        const promise = new Promise(resolve => resolve(dispatch(fetchCurrentSpotThunk(id))))
        promise.then((spot) => {
            currSpot = spot;
            setCountry(spot.country);
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setLat(spot.lat);
            setLng(spot.lng);
            setDescription(spot.description);
            setName(spot.name);
            setPrice(spot.price);
        })

    }, [dispatch]);


    useEffect(() => {
        const errorsObj = {}
        if (!country) errorsObj.country = "Country is required";
        if (!address) errorsObj.address = "Address is required";
        if (!city) errorsObj.city = "City is required";
        if (!state) errorsObj.state = "State is required";
        if (!lat) errorsObj.lat = "Latitude is required";
        if (!lng) errorsObj.lng = "Longitude is required";
        if (description?.length < 30) errorsObj.description = "Description needs a minimum of 30 characters";
        if (!name) errorsObj.name = "Name is required";
        if (!price) errorsObj.price = "Price is required";
        if (price && isNaN(+price)) errorsObj.price = "Price must be a number";

        setErrors(errorsObj);



    }, [country, address, city, state, lat, lng, description, name, price])


    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) {
            setSubmitWithErrors(true);
            return window.alert("Cannot Submit");
        }
        const newSpot = {
            id: id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        dispatch(updateCurrentSpotThunk(newSpot))
        history.push(`spots/${id}`);
    }



    return (
        <form id="update-new-spot-form"
            onSubmit={handleSubmit}>
            <h2>Update a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <div id="update-spot-location-container">
                <div id="update-spot-country">
                    <label htmlFor="country">Country </label>
                    {submitWithErrors && errors.country && <p className="form-errors">{errors.country}</p>}
                    <input type="text" placeholder="Country" onChange={e => setCountry(e.target.value)} value={country}></input>
                </div>
                <div id="update-spot-address">
                    <label htmlFor="address">Street Address</label>
                    {submitWithErrors && errors.address && <p className="form-errors">{errors.address}</p>}
                    <input type="text" placeholder="Address" onChange={e => setAddress(e.target.value)} value={address}></input>
                </div>
                <div id="city-state">
                    <div id="city-container">
                        <label htmlFor="city">City</label>
                        {submitWithErrors && errors.city && <p className="form-errors">{errors.city}</p>}
                        <input type="text" placeholder="City" onChange={e => setCity(e.target.value)} value={city}></input>
                    </div>
                    <div id="state-container">
                        <label htmlFor="State">State</label>
                        {submitWithErrors && errors.state && <p className="form-errors">{errors.state}</p>}
                        <input type="text" placeholder="STATE" onChange={e => setState(e.target.value)} value={state}></input>
                    </div>
                </div>
                <div className="lat-lng">
                    <label htmlFor="lat">Latitude</label>
                    {submitWithErrors && errors.lat && <p className="form-errors">{errors.lat}</p>}
                    <input type="text" placeholder="Latitude" onChange={e => setLat(e.target.value)} value={lat}></input>
                    <label htmlFor="lng">Longitude</label>
                    {submitWithErrors && errors.lng && <p className="form-errors">{errors.lng}</p>}
                    <input type="text" placeholder="Longitude" onChange={e => setLng(e.target.value)} value={lng}></input>
                </div>
            </div>
            <div className="update-spot-description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea id="description-input" type="textarea" placeholder="Please write at least 30 characters" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                {submitWithErrors && errors.description && <p className="form-errors">{errors.description}</p>}
            </div>
            <div className="update-spot-title">
                <h3>update a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input type="text" placeholder="Name of your spot" onChange={e => setName(e.target.value)} value={name}></input>
                {submitWithErrors && errors.name && <p className="form-errors">{errors.name}</p>}
            </div>
            <div className="update-spot-price">
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div id="price-sign">
                    <p>$</p> <input type="text" placeholder="Price per night (USD)" onChange={e => setPrice(e.target.value)} value={price}></input>
                </div>
                {submitWithErrors && errors.price && <p className="form-errors">{errors.price}</p>}
            </div>

            <button id="update-new-spot-form-button">Update Spot</button>
        </form>
    )
}
export default UpdateSpot;