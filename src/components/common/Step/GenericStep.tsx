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
        <div className="tw-pointer-events-auto tw-w-[80px] lg:tw-w-[225px]">
            <div className="tw-hidden lg:tw-block">
                {" "}
                {/* desktop */}
                <GridVariantSelector
                    onVariantChanged={onVariantChanged}
                    selectedVariantId={currentVariant?.getId()}
                    variants={variants}
                />
            </div>
            <div className="lg:tw-hidden">
                {" "}
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
