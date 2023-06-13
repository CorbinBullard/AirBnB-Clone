import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewSpotThunk } from "../../store/spots";
import { csrfFetch } from "../../store/csrf";
import { useHistory } from "react-router-dom";
import "./CreateNewSpot.css"

const CreateNewSpot = () => {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [preview, setPreview] = useState('');


    const [errors, setErrors] = useState({});
    const [submitWithErrors, setSubmitWithErrors] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        const errorsObj = {}
        if (!country) errorsObj.country = "Country is required";
        if (!address) errorsObj.address = "Address is required";
        if (!city) errorsObj.city = "City is required";
        if (!state) errorsObj.state = "State is required";
        if (!lat) errorsObj.lat = "Latitude is required";
        if (!lng) errorsObj.lng = "Longitude is required";
        if (description.length < 30) errorsObj.description = "Description needs a minimum of 30 characters";
        if (!name) errorsObj.name = "Name is required";
        if (!price) errorsObj.price = "Price is required";
        if (price && isNaN(+price)) errorsObj.price = "Price must be a number";
        if (!preview) errorsObj.preview = "Preview image is required";
        // if (preview && !isValidUrl(preview)) errorsObj.preview = "Image URL must end in .png, .jpg, or .jpeg";
        // if (img1 && !isValidUrl(img1)) errorsObj.img1 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (img2 && !isValidUrl(img2)) errorsObj.img2 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (img3 && !isValidUrl(img3)) errorsObj.img3 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (img4 && !isValidUrl(img4)) errorsObj.img4 = "Image URL must end in .png, .jpg, or .jpeg";

        setErrors(errorsObj);


    }, [country, address, city, state, lat, lng, description, name, price, preview])

    const isValidUrl = (url) => {
        const imageFormatTypes = ['jpg', 'jpeg', 'png'];
        const urlArr = url.split('.');
        if (imageFormatTypes.includes(urlArr[urlArr.length - 1])) return true;
        else {
            console.log("suffix: ", urlArr[urlArr.length - 1])
            return false
        };
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) {
            setSubmitWithErrors(true);
            return window.alert("Cannot Submit");
        }
        const newSpot = {
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
        const spot = await dispatch(postNewSpotThunk(newSpot));
        console.log("PREVIEW IMAGE : ", preview)
        const formData = new FormData();
        formData.append("image", preview)
        formData.append("preview", true)
        console.log("FORM DATA : ----> ", formData)

        await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            body: formData
        })

        history.push(`/spots/${spot.id}`)

    }
    // const submitImages = async (id) => {
    //     console.log("IMAGES", img1, img2, img3, img4)
    //     await csrfFetch(`/api/spots/${id}/images`, {
    //         method: 'POST',
    //         body: JSON.stringify({ url: preview, preview: true })
    //     })
    //     if (img1) {
    //         await csrfFetch(`/api/spots/${id}/images`, {
    //             method: 'POST',
    //             body: JSON.stringify({ url: img1, preview: false })
    //         })
    //     }
    //     if (img2) {
    //         await csrfFetch(`/api/spots/${id}/images`, {
    //             method: 'POST',
    //             body: JSON.stringify({ url: img2, preview: false })
    //         })
    //     }
    //     if (img3) {
    //         await csrfFetch(`/api/spots/${id}/images`, {
    //             method: 'POST',
    //             body: JSON.stringify({ url: img3, preview: false })
    //         })
    //     }
    //     if (img4) {
    //         await csrfFetch(`/api/spots/${id}/images`, {
    //             method: 'POST',
    //             body: JSON.stringify({ url: img4, preview: false })
    //         })
    //     }
    // }

    return (
        <form id="create-new-spot-form"
            onSubmit={handleSubmit}>
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <div id="create-spot-location-container">
                <div id="create-spot-country">
                    <label htmlFor="country">Country </label>
                    {submitWithErrors && errors.country && <p className="form-errors">{errors.country}</p>}
                    <input type="text" placeholder="Country" onChange={e => setCountry(e.target.value)} value={country}></input>
                </div>
                <div id="create-spot-address">
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
                <div id="lat-lng">
                    <div id="lat-container">
                        <label htmlFor="lat">Latitude</label>
                        {submitWithErrors && errors.lat && <p className="form-errors">{errors.lat}</p>}
                        <input type="text" placeholder="Latitude" onChange={e => setLat(e.target.value)} value={lat}></input>
                    </div>
                    <div id="lng-container">
                        <label htmlFor="lng">Longitude</label>
                        {submitWithErrors && errors.lng && <p className="form-errors">{errors.lng}</p>}
                        <input type="text" placeholder="Longitude" onChange={e => setLng(e.target.value)} value={lng}></input>
                    </div>
                </div>
            </div>
            <div className="create-spot-description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea id="description-input" type="textarea" placeholder="Please write at least 30 characters" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                {submitWithErrors && errors.description && <p className="form-errors">{errors.description}</p>}
            </div>
            <div id="create-spot-title">
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input type="text" placeholder="Name of your spot" onChange={e => setName(e.target.value)} value={name}></input>
                {submitWithErrors && errors.name && <p className="form-errors">{errors.name}</p>}
            </div>
            <div id="create-spot-price">
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div id="price-sign">
                    <p>$</p> <input type="text" placeholder="Price per night (USD)" onChange={e => setPrice(e.target.value)} value={price}></input>
                </div>
                {submitWithErrors && errors.price && <p className="form-errors">{errors.price}</p>}
            </div>
            <div id="create-spot-photos">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <input
                    type="file"
                    onChange={e => setPreview(e.target.files[0])}
                    multiple
                />
                {submitWithErrors && errors.preview && <p className="form-errors">{errors.preview}</p>}
            </div>
            <button id="create-new-spot-form-button">Create Spot</button>
        </form>
    )
}
export default CreateNewSpot;
