import React, { useCallback, useEffect, useState } from "react";
import { AnyStepData, StepHandle, Variant } from "@spiffcommerce/core";
import { GridVariantSelector, VerticalVariantSelector } from "../VariantSelector";

/**
 * A step that isn't a text step.
 */
export const GenericStep: React.FunctionComponent<{
    step: StepHandle<AnyStepData>;
}> = ({ step }) => {
    // We track the variants of the step for display.
    const [variants, setVariants] = useState<Variant[]>([]);
    const [currentVariant, setCurrentVariant] = useState<Variant | undefined>(undefined);

    useEffect(() => {
        setVariants(step.getAvailableVariants());
        setCurrentVariant(step.getCurrentVariant());
    }, [step]);

    const onVariantChanged = useCallback(
        (variant: Variant) => {
            step.selectVariant(variant);
        },
        [step],
    );

    return (
        <div style={{}} className="tw-pointer-events-auto tw-w-[80px] tw-h-full  lg:tw-w-[215px] ">
            <div
                style={{
                    overflowY: "auto",
                    height: "85%",
                    overflowX: "hidden",
                }}
                className="tw-hidden lg:tw-block tw-pr-[10px] tw-pt-[5px] lg:tw-mt-[15px]   lg:tw-ml-[20px]   tw-scrollbar-thin tw-scrollbar-thumb-slate-500  tw-scrollbar-track-slate-200  "
            >
                {/* desktop */}
                <GridVariantSelector
                    onVariantChanged={onVariantChanged}
                    selectedVariantId={currentVariant?.getId()}
                    variants={variants}
                />
            </div>
            <div className="lg:tw-hidden ">
                {/* mobile*/}
                <VerticalVariantSelector
                    onVariantChanged={onVariantChanged}
                    selectedVariantId={currentVariant?.getId()}
                    variants={variants}
                />
            </div>
        </div>
    );
};
