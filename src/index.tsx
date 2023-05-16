import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles.css";

// We mount the element with ID dev-root if existing to allow for
// local development. TODO: Can we split entry points or something.
const devRoot = document.getElementById("dev-root");
if (devRoot) {
    ReactDOM.render(
        <App
            workflowId={process.env.WORKFLOW_ID}
            integrationProductId={process.env.INTEGRATION_PRODUCT_ID}
            onMeeting={() => {
                console.log("Meeting requested");
            }}
            onLearnMore={() => {
                console.log("Learn More Clicked");
            }}
            onWatchUs={() => {
                console.log("Watch Us Clicked");
            }}
        />,
        document.getElementById("dev-root"),
    );
}

/**
 * A helper function used to render the Spiff Commerce experience.
 * @param el The HTML element to embed the experience within.
 * @param workflowId The workflow ID to load.
 * @param integrationProductId The integration product ID to load. The workflow ID provided should be found on this product in Spiff Hub.
 * @param onMeeting A callback function to be called when the user requests a meeting.
 * @param onLearnMore A callback function to be called when the user clicks the Learn More button.
 * @param onWatchUs A callback function to be called when the user clicks the Watch Us button.
 */
window["spiffCommerceExperience"] = function spiffCommerceExperience(
    el: HTMLElement,
    workflowId: string,
    integrationProductId: string,
    onMeeting: () => void,
    onLearnMore: () => void,
    onWatchUs: () => void,
) {
    ReactDOM.render(
        <App
            workflowId={workflowId}
            integrationProductId={integrationProductId}
            onMeeting={onMeeting}
            onLearnMore={onLearnMore}
            onWatchUs={onWatchUs}
        />,
        el,
    );
};
