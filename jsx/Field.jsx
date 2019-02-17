const Field = props => (
    <div className="form-group">
        <input 
            type={props.type} 
            placeholder={props.email} 
            className="form-control" 
            value={props.value} 
            onChange={props.onChange}
            required={props.required}/>
        <span className="form_icon">
            <i className={"fa_icon form-" + props.icon} aria-hidden="true" />
        </span>
        <div className="invalid-feedback">{props.errorMessage}</div>
    </div>
);
