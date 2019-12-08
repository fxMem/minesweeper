import * as React from "react";
import '../styles/circleSpinner.css';

// From https://github.com/tobiasahlin/SpinKit
export function SpinnerCircle() {
    return <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>
}