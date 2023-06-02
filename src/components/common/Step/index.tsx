import React from "react";
import { AnyStepData, StepHandle, StepType } from "@spiffcommerce/core";
import { TextStep } from "./TextStep";
import { GenericStep } from "./GenericStep";

const InnerStep: React.FunctionComponent<{
    step: StepHandle<AnyStepData>;
}> = (props) => {
    const { step } = props;
    if (step.getType() === StepType.Text) {
        return <TextStep step={step} />;
    }
    return <GenericStep step={step} />;
};

export const Step: React.FC<{
    step: StepHandle<AnyStepData>;
}> = (props) => {
    return (
        <div>
            <div className="tw-hidden lg:tw-block tw-h-full" style={{ position: "absolute", top: 20, left: 20 }}>
                <InnerStep // desktop
                    step={props.step}
                />
            </div>
            <div
                className="lg:tw-hidden"
                style={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                    width: "100%",
                    height: "100%",
                    paddingRight: "32px",
                    pointerEvents: "none",
                }}
            >
                <InnerStep // mobile
                    step={props.step}
                />
            </div>
        </div>
    );
};
