import React from "react";
import { AnyStepData, StepHandle } from "@spiffcommerce/core";
import { getIconForStepType } from "../../shared";

const DesktopFooter: React.FunctionComponent<{
    currentStep?: StepHandle<AnyStepData>;
    onSave: () => void;
}> = ({ currentStep, onSave }) => {
    const icon = currentStep ? getIconForStepType(currentStep.getType(), true, "large") : null;
    return (
        <div className="tw-w-full tw-shadow-2xl">
            <div
                className="tw-flex tw-bg-[#FFFFFF] lg:tw-mr-10 tw-gap-2 lg:tw-mb-5 2xl:tw-mb-10 tw-p-[24px] tw-justify-between"
                style={{ borderRadius: "0px 0px 20px 0px" }}
            >
                <div className="tw-flex tw-items-center">
                    <div className="tw-flex tw-items-center tw-border-r tw-px-5 tw-min-w-[380px] tw-max-w-[400px] ">
                        {icon}
                        <h1
                            style={{ all: "unset" }}
                            className="tw-ml-[18px] tw-text-[18px] tw-text-black tw-font-[600]"
                        >
                            {currentStep?.getName()}
                        </h1>
                    </div>
                    <div
                        style={{
                            maxWidth: 800,
                            display: "-webkit-box",
                            lineClamp: 2,
                            boxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            all: "unset",
                            WebkitLineClamp: 2,
                        }}
                        className="tw-text-[14px] tw-text-black tw-pl-5"
                    >
                        {currentStep?.getHelpText()}
                    </div>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center">
                    <div className="tw-ml-5 tw-flex tw-items-center tw-mr-2">
                        <button
                            style={{ fontWeight: 600 }}
                            className="tw-bg-[#F23064] tw-text-white tw-text-[14px] tw-px-2 tw-py-2 tw-rounded-md tw-w-[147px] tw-h-[36px]"
                            onClick={onSave}
                        >
                            Save Your Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MobileFooter: React.FunctionComponent<{
    currentStep?: StepHandle<AnyStepData>;
    onSave: () => void;
}> = ({ currentStep, onSave }) => {
    const icon = currentStep ? getIconForStepType(currentStep.getType(), true, "regular") : null;
    return (
        <div className="tw-bg-[#FFF] tw-h-[93px] tw-flex tw-justify-between">
            <div className="tw-flex tw-items-center tw-px-5">
                {icon}
                <h1 className="tw-ml-[18px] tw-text-[16px] tw-font-[600]">{currentStep?.getName()}</h1>
            </div>
            <div className="tw-flex tw-justify-center" style={{ flexDirection: "column", padding: "0 14px" }}>
                <button
                    style={{ fontWeight: 600 }}
                    className="tw-bg-[#F23064] tw-text-white tw-text-[14px] tw-px-2 tw-py-2 tw-rounded-md tw-w-[147px] tw-h-[36px]"
                    onClick={onSave}
                >
                    Save Your Product
                </button>
            </div>
        </div>
    );
};

export const Footer: React.FunctionComponent<{
    currentStep?: StepHandle<AnyStepData>;
    onSave: () => void;
    shouldShow: boolean;
}> = ({ currentStep, onSave, shouldShow }) => {
    return (
        <div style={{ visibility: shouldShow ? undefined : "hidden" }}>
            <div className="tw-hidden lg:tw-block">
                <DesktopFooter currentStep={currentStep} onSave={onSave} />
            </div>
            <div className="lg:tw-hidden">
                <MobileFooter currentStep={currentStep} onSave={onSave} />
            </div>
        </div>
    );
};
