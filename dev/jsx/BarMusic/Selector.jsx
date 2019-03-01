import React from 'react';

const Selector = props => (
    <div className="jp_quality_optn custom_select">
        <select>
            <option>quality</option>
            <option value="1">HD</option>
            <option value="2">High</option>
            <option value="3">medium</option>
            <option value="4">low</option>
        </select>
    </div>
);
export default Selector;