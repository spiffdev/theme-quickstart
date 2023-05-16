import React from "react";
import Logo from "../../svg/Logo";
import Nexthash from "../../svg/Nexthash";
import { AnyStepData, StepHandle } from "@spiffcommerce/core";
import { getIconForStepType } from "../../shared";

const DesktopHeader: React.FunctionComponent<{
    currentStep: StepHandle<AnyStepData>;
    onChangeTab: (step: StepHandle<AnyStepData>) => void;
    steps: StepHandle<AnyStepData>[];
}> = ({ steps, currentStep, onChangeTab }) => {
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
                    <div className="tw-mx-5">
                        <span className="tw-text-[#F23064] tw-text-lg tw-font-semibold">Workflow</span>{" "}
                        <span className="tw-text-white tw-text-lg tw-font-semibold">Experience</span>
                    </div>
                </div>
                <div className="tw-flex tw-text-white tw-gap-6">
                    {steps.map((s) => (
                        <a
                            key={s.getId()}
                            onClick={() => onChangeTab(s)}
                            className={`tw-h-full tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-border-b-transparent tw-border-b-4 ${
                                s.getId() === currentStep.getId()
                                    ? "!tw-border-b-[#F23064] !tw-opacity-100"
                                    : "tw-opacity-50"
                            }`}
                        >
                            {getIconForStepType(s.getType(), false)}
                            <span style={{ fontWeight: 600 }} className="tw-px-2 tw-text-[15px]">
                                {s.getName()}
                            </span>
                        </a>
                    ))}
                    <a className={`tw-m-w-[100px] tw-self-center`}>
                        <Nexthash className="" />
                    </a>
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
                    <div style={{ marginTop: "17px" }}>
                        <span className="tw-text-[#F23064] tw-text-lg tw-font-semibold">Workflow</span>{" "}
                        <span className="tw-text-white tw-text-lg tw-font-semibold">Experience</span>
                    </div>
                </div>
                <div className="tw-flex tw-text-white tw-justify-around" style={{ flex: "1" }}>
                    {steps.map((s) => (
                        <a
                            key={s.getId()}
                            onClick={() => onChangeTab(s)}
                            className={`tw-h-full tw-cursor-pointer tw-flex tw-items-center tw-justify-center`}
                            style={{
                                borderBottom:
                                    s.getId() === currentStep.getId() ? "solid 4px #F23064" : "solid 4px rgba(0,0,0,0)",
                                padding: "0 16px",
                                width: "100%",
                            }}
                        >
                            {getIconForStepType(s.getType(), false)}
                            <span className="tw-px-2 tw-text-[15px]">{s.getName()}</span>
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export const Header: React.FunctionComponent<{
    conversionScreenActive: boolean;
    currentStep: StepHandle<AnyStepData>;
    onChangeTab: (step: StepHandle<AnyStepData>) => void;
    steps: StepHandle<AnyStepData>[];
}> = ({ steps, currentStep, onChangeTab, conversionScreenActive }) => {
    return (
        <div>
            <div className="tw-hidden lg:tw-block">
                <DesktopHeader currentStep={currentStep} onChangeTab={onChangeTab} steps={steps} />
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
