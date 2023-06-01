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
export const getIconForStepType = (
    type: StepType,
    contrast: boolean,
    size: "regular" | "icons" | "large" = "regular",
) => {
    const getSizeModel = () => {
        if (size === "regular") {
            return "tw-w-[38.73px]  tw-h-[44.69px] tw-shrink-0";
        }
        if (size === "icons") {
            return "tw-w-[23.94px] tw-h-[27.62px] tw-shrink-0";
        }
        return "tw-w-[55px] tw-h-[55px] tw-shrink-0";
    };
    const getSizeText = () => {
        if (size === "regular") {
            return "tw-w-[55px]  tw-h-[55px] tw-shrink-0";
        }
        if (size === "icons") {
            return "tw-w-[30px] tw-h-[30px] tw-shrink-0";
        }
        return "tw-w-[55px] tw-h-[55px] tw-shrink-0";
    };
    const getSizeTextPicture = () => {
        if (size === "regular") {
            return "tw-w-[36.67px]  tw-h-[36.67px] tw-shrink-0";
        }
        if (size === "icons") {
            return "tw-w-[22.67px] tw-h-[22.67px] tw-shrink-0";
        }
        return "tw-w-[55px] tw-h-[55px] tw-shrink-0";
    };

    if (type === StepType.Model) {
        return <Product className={`${getSizeModel()}  `} fill={contrast ? "black" : "white"} />;
    }
    if (type === StepType.Picture || type == StepType.Illustration) {
        return <Imageicon className={`${getSizeTextPicture()}`} fill={contrast ? "black" : "white"} />;
    }
    if (type === StepType.Text) {
        return (
            <Texticon
                className={`${getSizeText()} `}
                fill={contrast ? "black" : "white"}
                color={contrast ? "#ffffff" : "#393A3C"}
            />
        );
    }
};
