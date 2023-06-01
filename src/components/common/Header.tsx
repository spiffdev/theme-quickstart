import React from "react";
import Logo from "../../svg/Logo";
import Nexthash from "../../svg/Nexthash";
import { AnyStepData, StepHandle, StepType } from "@spiffcommerce/core";
import { getIconForStepType } from "../../shared";

const DesktopHeader: React.FunctionComponent<{
    currentStep: StepHandle<AnyStepData>;
    setHeaderHashtag?: any;
    headerHashtag?: boolean;
    onChangeTab: (step: StepHandle<AnyStepData>) => void;
    steps: StepHandle<AnyStepData>[];
}> = ({ steps, currentStep, onChangeTab, headerHashtag, setHeaderHashtag }) => {
    return (
        <header>
            <div
                className="tw-h-[80px] tw-flex tw-justify-between tw-pl-10 tw-pr-20"
                style={{
                    boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.25)",
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "0px 0px 0px 30px",
                }}
            >
                <div className="tw-flex tw-items-center">
                    <Logo className="" />
                    <div className="tw-mr-5 tw-ml-[29px] tw-leading-[22px]">
                        <span className="tw-text-[#F23064] tw-leading-[22px] tw-text-lg tw-font-semibold">
                            Workflow
                        </span>
                        <span className="tw-text-white tw-leading-[22px] tw-text-lg tw-font-semibold">Experience</span>
                    </div>
                </div>
                <div className="tw-flex tw-text-white  tw-gap-6">
                    {steps.map((s) => (
                        <a
                            key={s.getId()}
                            onClick={() => onChangeTab(s)}
                            className={`tw-h-full tw-flex-col   hover:tw-text-white hover:tw-opacity-80 tw-cursor-pointer  tw-flex tw-items-center tw-justify-end tw-pb-[14px]  ${
                                s.getId() === currentStep.getId() && !headerHashtag
                                    ? " !w-opacity-100 tw-border-b-[4px] tw-border-b-[#F23064] "
                                    : "tw-opacity-50  tw-border-b-[4px] tw-border-b-transparent hover:tw-border-b-[#F23064] "
                            }`}
                        >
                            {getIconForStepType(s.getType(), false, "icons")}
                            <span
                                style={{ fontWeight: 600 }}
                                className="tw-px-2 tw-whitespace-nowrap tw-pt-[3px]  hover:tw-text-white hover:tw-opacity-80 tw-leading-[18px]  tw-text-[15px]"
                            >
                                {s.getName()}
                            </span>
                        </a>
                    ))}
                    <button
                        onClick={() => setHeaderHashtag(!headerHashtag)}
                        className={`tw-m-w-[100px] tw-self-center tw-h-full  ${
                            headerHashtag
                                ? " !w-opacity-100 tw-border-b-[4px] tw-border-b-[#F23064] "
                                : "tw-opacity-80 hover:tw-opacity-100 tw-border-b-[4px] tw-border-b-transparent hover:tw-border-b-[#F23064]"
                        }`}
                    >
                        <Nexthash className="" />
                    </button>
                </div>
            </div>
        </header>
    );
};

const MobileHeader: React.FunctionComponent<{
    conversionScreenActive: boolean;
    currentStep: StepHandle<AnyStepData>;
    onChangeTab: (step: StepHandle<AnyStepData>) => void;
    steps: StepHandle<AnyStepData>[];
}> = ({ steps, currentStep, onChangeTab, conversionScreenActive }) => {
    return (
        <header style={{ visibility: conversionScreenActive ? "hidden" : undefined }}>
            <div
                className="tw-h-[119px] tw-flex tw-justify-between"
                style={{
                    boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.25)",
                    background: "rgba(0, 0, 0, 0.5)",
                    flexDirection: "column",
                }}
            >
                <div className="tw-flex tw-justify-center" style={{ flex: "1" }}>
                    <div style={{ marginTop: "17px" }} className="tw-leading-[22px]">
                        <span className="tw-text-[#F23064] tw-leading-[22px] tw-text-lg tw-font-semibold">
                            Workflow
                        </span>{" "}
                        <span className="tw-text-white tw-text-lg tw-leading-[22px]  tw-font-semibold">Experience</span>
                    </div>
                </div>
                <div className="tw-flex tw-text-white   tw-justify-around " style={{ flex: "1" }}>
                    {steps.map((s) => (
                        <a
                            key={s.getId()}
                            onClick={() => onChangeTab(s)}
                            className={`tw-h-full tw-px-[16px] ssm:tw-px-[8px] sssm:tw-px-[3px] ${
                                s.getId() === currentStep.getId() ? "" : "tw-opacity-50"
                            } tw-cursor-pointer tw-flex tw-items-center  hover:tw-text-white hover:tw-opacity-80  tw-justify-center `}
                            style={{
                                borderBottom:
                                    s.getId() === currentStep.getId()
                                        ? "solid 4px #F23064"
                                        : "solid 4px rgba(0,0,0,0) ",
                                // padding: "0 16px",
                                width: "100%",
                            }}
                        >
                            {getIconForStepType(s.getType(), false, "icons")}
                            <span className="tw-px-2 ssm:tw-px-[4px] hover:tw-text-white hover:tw-opacity-80   tw-text-[15px] tw-font-semibold tw-leading-[18px]">
                                {s.getName()}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export const Header: React.FunctionComponent<{
    setHeaderHashtag?: any;
    headerHashtag?: boolean;
    conversionScreenActive: boolean;
    currentStep: StepHandle<AnyStepData>;
    onChangeTab: (step: StepHandle<AnyStepData>) => void;
    steps: StepHandle<AnyStepData>[];
}> = ({ steps, currentStep, onChangeTab, conversionScreenActive, setHeaderHashtag, headerHashtag }) => {
    return (
        <div>
            <div className="tw-hidden lg:tw-block">
                <DesktopHeader
                    setHeaderHashtag={setHeaderHashtag}
                    headerHashtag={headerHashtag}
                    currentStep={currentStep}
                    onChangeTab={onChangeTab}
                    steps={steps}
                />
            </div>
            <div className="lg:tw-hidden">
                <MobileHeader
                    conversionScreenActive={conversionScreenActive}
                    currentStep={currentStep}
                    onChangeTab={onChangeTab}
                    steps={steps}
                />
            </div>
        </div>
    );
};
