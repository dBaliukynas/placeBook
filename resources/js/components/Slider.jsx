const Slider = (props) => {
    return (
        <input
            type="range"
            className="form-range"
            min={1}
            max={10001}
            step={10}
            value={props.propertyPrice}
            onChange={props.handlePropertyPriceChange}
            id="customRange2"
        ></input>
    );
};

export default Slider;
