import React from "react";
import { StepType } from "@spiffcommerce/core";
import { AnyStepData, StepHandle } from "@spiffcommerce/core";
import { getIconForStepType } from "../../shared";

const DesktopFooter: React.FunctionComponent<{
    currentStep?: StepHandle<AnyStepData>;
    onSave: () => void;
}> = ({ currentStep, onSave }) => {
    const icon = currentStep ? getIconForStepType(currentStep.getType(), true, "regular") : null;
    return (
        <div className="tw-w-full tw-relative tw-min-h-[140px] tw-h-full tw-shadow-2xl">
            <div
                className="tw-flex  tw-w-[calc(100%_-_26px)] xl:tw-bottom-[46px]  tw-absolute tw-left-0 tw-bottom-[20px] tw-bg-[#FFFFFF] lg:tw-mr-10 tw-gap-2  tw-p-[24px] tw-justify-between"
                style={{ borderRadius: "0px 0px 20px 0px" }}
            >
                <div className="tw-flex tw-items-center">
                    <div className="tw-flex tw-items-center tw-border-r tw-px-5 tw-min-w-[s380px] tw-max-w-[400px] ">
                        <p className="tw-leading-[55px] tw-h-[55px] tw-flex tw-justify-center tw-items-center">
                            {icon}
                        </p>
                        <h1
                            style={{ all: "unset" }}
                            className="xl:tw-ml-[18px] xl:tw-max-w-[350px] xl:tw-w-[270px] lg:tw-ml-[10px]  tw-leading-[22px] tw-text-[18px] tw-text-black tw-font-[600]"
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
                        className="tw-text-[14px] tw-text-black tw-pl-[22px] tw-leading-[24px]"
                    >
                        {currentStep?.getHelpText()}
                    </div>
                </div>
                <div className="tw-flex tw-justify-between tw-items-center">
                    <div className="tw-ml-5 tw-flex tw-items-center tw-mr-2">
                        <button
                            style={{ fontWeight: 600 }}
                            className="tw-bg-[#F23064] tw-leading-[20px] tw-font-medium tw-text-white tw-text-[14px] tw-px-2 tw-py-2 tw-rounded-md tw-w-[147px] tw-h-[36px]"
                            onClick={onSave}
                        >
                            Save your product
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
    // console.log(currentStep.getType());

    const icon = currentStep ? getIconForStepType(currentStep.getType(), true, "regular") : null;
    return (
        <div className="tw-bg-[#FFF] tw-h-[93px]   tw-w-full tw-flex tw-relative  tw-bottom-0 tw-justify-between">
            <div
                className={`tw-flex tw-items-center tw-justify-center sssm:tw-mb-0   ${
                    currentStep?.getType() === StepType.Text
                        ? "tw-px-[13px] sm:tw-px-[13px] sssm:tw-px-[5px]"
                        : ` ${
                              currentStep?.getType() === StepType.Picture
                                  ? "tw-px-[22px] md:tw-px-[22px] sm:tw-px-[22px] sssm:tw-px-[10px]"
                                  : "tw-px-[20px] md:tw-px-[20px] sm:tw-px-[20px] sssm:tw-px-[8px] "
                          }`
                }`}
            >
                <div className="">{icon}</div>
                <h1
                    className={` ${
                        currentStep?.getType() === StepType.Text
                            ? "tw-ml-[10px]  md:tw-ml-[10px] sm:tw-ml-[10px] tw-mb-0 sssm:tw-ml-[5px]"
                            : "tw-ml-[18px] md:tw-ml-[18px] sm:tw-ml-[18px] tw-mb-0  sssm:tw-ml-[8px]"
                    } tw-leading-[19.36px] tw-mb-0 tw-text-[16px]  tw-font-[600]`}
                >
                    {currentStep?.getName()}
                </h1>
            </div>
            <div
                className="tw-flex tw-justify-center tw-px-[14px] sm:tw-px-[14px] sssm:tw-px-[7px]"
                style={{ flexDirection: "column" }}
            >
                <button
                    style={{ fontWeight: 500, WebkitTapHighlightColor: "transparent" }}
                    className="tw-bg-[#F23064] tw-text-white tw-text-[14px] tw-px-2 tw-py-2 tw-leading-[20px] tw-rounded-md tw-w-[147px] tw-h-[36px]"
                    onClick={onSave}
                >
                    Save your product
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
