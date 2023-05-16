import * as React from "react";
import { StepType } from "@spiffcommerce/core";
import Texticon from "./svg/Texticon";
import Product from "./svg/Product";
import Imageicon from "./svg/Imageicon";

/**
 * Map each step type to an icon to be used in the UI.
 * @param type The type to map.
 * @returns A react component to be rendered into the UI.
 */
export const getIconForStepType = (type: StepType, contrast: boolean, size: "regular" | "large" = "regular") => {
    const getSize = () => {
        if (size === "regular") {
            return "tw-w-[35px] tw-h-[35px]";
        } else {
            return "tw-w-[55px] tw-h-[55px]";
        }
    };

    if (type === StepType.Model) {
        return <Product className={`${getSize()}`} fill={contrast ? "black" : "white"} />;
    }
    if (type === StepType.Picture || type == StepType.Illustration) {
        return <Imageicon className={`${getSize()}`} fill={contrast ? "black" : "white"} />;
    }
    if (type === StepType.Text) {
        return (
            <Texticon
                className={`${getSize()}`}
                fill={contrast ? "black" : "white"}
                color={contrast ? "#ffffff" : "#393A3C"}
            />
        );
    }
};
