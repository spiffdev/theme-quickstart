import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { WorkflowExperience } from "@spiffcommerce/core";
import { Close } from "../../svg/Close";
import { Tick } from "../../svg/Tick";
import { Hash } from "../../svg/Hash";

const MobileConvert: React.FC<{
    onConvert: (email: string, mobile: string) => Promise<void>;
    onHideConvert: () => void;
    onLearnMore: () => void;
    onMeeting: () => void;
    onWatchUs: () => void;
    workflowExperience: WorkflowExperience;
}> = (props) => {
    const { onConvert, onHideConvert, onLearnMore, onMeeting, onWatchUs, workflowExperience } = props;
    const [collectingDetails, setCollectingDetails] = useState(true);
    const [screenshot, setScreenshot] = useState<string | undefined>(undefined);
    const [exportedData, setExportedData] = useState<Map<string, { [key: string]: string }>>(new Map());

    const handleConvert = useCallback(
        async (email: string, mobile: string) => {
            await onConvert(email, mobile);
            setCollectingDetails(false);
        },
        [onConvert],
    );

    // We can use the workflow experience to generate a preview image of the user's design.
    useEffect(() => {
        workflowExperience.createPreviewImage().then((preview) => {
            setScreenshot(preview);
        });
        setExportedData(workflowExperience.getExportedData());
    }, [workflowExperience]);

    useEffect(() => {
        if (!collectingDetails) {
            workflowExperience.onDesignFinished();
        }
    }, [collectingDetails, workflowExperience]);

    return (
        <div
            className=" tw-w-full  tw-h-full"
            style={{
                overflow: "hidden",
                top: 0,
                bottom: 20,
                left: 0,
                position: "absolute",
                paddingBottom: 40,
            }}
        >
            <div
                style={{
                    borderRadius: 20,
                }}
                className="tw-my-[20px] tw-bg-white   tw-relative tw-flex tw-justify-center  tw-items-center  tw-mx-[20px] tw-overflow-auto tw-h-full tw-scrollbar-none  "
            >
                <div className="" style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                    <button
                        className="tw-absolute tw-right-[20.5px] tw-top-[24.18px]"
                        onClick={onHideConvert}
                        style={{ position: "fixed", top: 25, right: 25 }}
                    >
                        <Close />
                    </button>
                    <div
                        style={{
                            backgroundColor: "#F5F5F5",
                            borderRadius: "20px 20px 0 0",
                            // display: "flex",
                            // flexDirection: "column",
                            padding: "36px 37px 10px 33px",
                        }}
                    >
                        {!screenshot && (
                            <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center">
                                <Spinner />
                                <p>Preview Loading...</p>
                            </div>
                        )}
                        {screenshot && (
                            <div
                                className="tw-flex tw-flex-col  tw-rounded-md grow"
                                style={{
                                    backgroundImage: `url(${screenshot})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    // margin: "18px auto",
                                    // flex: "1 0 50%",
                                    height: "105px",
                                }}
                            ></div>
                        )}
                        {screenshot && (
                            <div style={{ marginTop: "10px" }}>
                                {Array.from(exportedData).map(([dataKey, value]) => {
                                    if (!value) {
                                        return undefined;
                                    }
                                    return (
                                        <div className="tw-w-full" key={dataKey}>
                                            <table className="tw-table-fixed tw-border-none tw-p-[0px] tw-m-[0px] tw-w-full tw-text-sm">
                                                <col className="tw-border-none tw-p-[0px] tw-m-[0px] " width={"30%"} />
                                                <tbody className="tw-border-none tw-p-[0px] tw-m-[0px] ">
                                                    <tr className="tw-border-none tw-p-[0px] tw-m-[0px] ">
                                                        <td
                                                            className="tw-border-none tw-p-[0px] tw-m-[0px] "
                                                            colSpan={2}
                                                        >
                                                            <h2 className="tw-text-lg  tw-mb-0 tw-font-bold tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
                                                                {dataKey}
                                                            </h2>
                                                        </td>
                                                    </tr>
                                                    {Object.keys(value).map((valueKey, index) => {
                                                        return (
                                                            <tr
                                                                className="tw-border-none tw-p-[0px] tw-m-[0px] "
                                                                key={index}
                                                            >
                                                                <td className="tw-border-none tw-p-[0px] tw-m-[0px] tw-text-[14px] tw-leading-[19px]  tw-font-bold tw-capitalize tw-px-0 tw-py-0 ">
                                                                    {valueKey}:
                                                                </td>
                                                                <td className="tw-text-ellipsis tw-border-none tw-text-[#000000] tw-text-[14px]  tw-font-normal tw-p-[0px] tw-m-[0px]  tw-leading-[19px] tw-overflow-hidden tw-whitespace-nowrap">
                                                                    {value[valueKey]}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div style={{ flex: "0 1 60%" }}>
                        <div style={{ marginBottom: 20, marginLeft: 33, marginTop: 39, marginRight: 37 }}>
                            {collectingDetails ? (
                                <div
                                    style={{
                                        display: "flex",
                                        margin: "5px 0",
                                        // justifyContent: "space-between",
                                        flexDirection: "column",
                                        // alignItems: "center",
                                    }}
                                >
                                    <Hash />
                                    <p
                                        className="tw-leading-[22px]"
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 600,
                                            marginTop: 17,
                                            marginBottom: 12,
                                        }}
                                    >
                                        What happens next?
                                    </p>
                                    {/* <span style={{ visibility: "hidden" }}>
                                        <Hash />
                                    </span> */}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        // display: "flex",
                                        margin: "17px 0",
                                        // justifyContent: "space-between",
                                        // alignItems: "center",
                                    }}
                                >
                                    <Tick />
                                    <p style={{ fontSize: 18, fontWeight: 600, lineHeight: "21.78px", marginTop: 17 }}>
                                        Thank you!
                                    </p>
                                    {/* <span style={{ visibility: "hidden" }}>
                                        <Tick />
                                    </span> */}
                                </div>
                            )}
                            {collectingDetails ? (
                                <ConversionForm onConvert={handleConvert} forMobile />
                            ) : (
                                <ConversionFinalizedPage
                                    forMobile
                                    onMeeting={onMeeting}
                                    onLearnMore={onLearnMore}
                                    onWatchUs={onWatchUs}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DesktopConvert: React.FC<{
    workflowExperience: WorkflowExperience;
    onConvert: (email: string, mobile: string) => Promise<void>;
    onHideConvert: () => void;
    onMeeting: () => void;
    onLearnMore: () => void;
    onWatchUs: () => void;
}> = ({ workflowExperience, onConvert, onHideConvert, onMeeting, onLearnMore, onWatchUs }) => {
    const [collectingDetails, setCollectingDetails] = useState(true);
    const [screenshot, setScreenshot] = useState<string | undefined>(undefined);
    const [exportedData, setExportedData] = useState<Map<string, { [key: string]: string }>>(new Map());

    const handleConvert = useCallback(
        async (email: string, mobile: string) => {
            await onConvert(email, mobile);
            setCollectingDetails(false);
        },
        [onConvert],
    );

    // We can use the workflow experience to generate a preview image of the user's design.
    useEffect(() => {
        workflowExperience.createPreviewImage().then((preview) => {
            setScreenshot(preview);
        });
        setExportedData(workflowExperience.getExportedData());
    }, [workflowExperience]);

    useEffect(() => {
        if (!collectingDetails) {
            workflowExperience.onDesignFinished();
        }
    }, [collectingDetails, workflowExperience]);

    const noReturn = !collectingDetails;

    return (
        <div
            className="tw-absolute tw-left-0  tw-w-full tw-h-full  tw-flex tw-justify-center tw-items-center tw-top-0 tw-z-10 "
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className=" tw-inset-0 tw-z-10 tw-overflow-y-auto">
                <div className="tw-flex tw-min-h-full tw-w-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
                    <div
                        className="tw-relative tw-transform  tw-overflow-hidden tw-bg-white tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full lg:min-tw-w-0  lg:tw-w-[1000px]  lg:tw-h-[418px]"
                        style={{ borderRadius: 20 }}
                    >
                        <div className="tw-flex lg:tw-relative tw-h-full tw-absolute tw-left-0 tw-w-full tw-h-full  tw-flex tw-justify-center tw-items-center tw-top-0 tw-z-10 ">
                            <div className=" tw-bg-[#F5F5F5]  tw-flex tw-flex-col tw-w-full lg:tw-w-[312px]">
                                {!noReturn && (
                                    <button
                                        className="tw-p-1  tw-bg-transparent tw-border-0 tw-text-black tw-bg-black tw-float-right tw-text-xl tw-leading-none tw-font-semibold tw-outline-none focus:tw-outline-none tw-mt-2 tw-mr-2  tw-block lg:tw-hidden"
                                        onClick={onHideConvert}
                                    >
                                        X
                                    </button>
                                )}
                                <div
                                    className="tw-flex tw-mb-[39px] tw-flex-col lg:tw-w-[297px] lg:tw-h-[198px] tw-w-[312px] tw-h-[50%] tw-rounded-md tw-mt-[80px] tw-ml-[6px] tw-mr-[9px] tw-grow"
                                    style={
                                        screenshot
                                            ? {
                                                  backgroundImage: `url(${screenshot})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                                  backgroundRepeat: "no-repeat",
                                              }
                                            : undefined
                                    }
                                >
                                    {!screenshot && (
                                        <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center">
                                            <Spinner />
                                            <p>Preview Loading...</p>
                                        </div>
                                    )}
                                </div>
                                <div className=" tw-pr-[57px]  tw-pl-[47px] tw-overflow-auto  tw-scrollbar-thin tw-scrollbar-thumb-slate-500  tw-scrollbar-track-slate-200   tw-border-spacing-2 tw-w-full  tw-shrink-[2] tw-flex tw-flex-col tw-gap-2">
                                    {Array.from(exportedData).map(([dataKey, value]) => {
                                        if (!value) {
                                            return undefined;
                                        }
                                        return (
                                            <div
                                                className="tw-w-full tw-border-none tw-p-[0px] tw-m-[0px]"
                                                key={dataKey}
                                            >
                                                <table className="tw-table-fixed tw-w-full tw-text-sm tw-border-none tw-p-[0px] tw-m-[0px]">
                                                    <col
                                                        className="tw-border-none tw-p-[0px] tw-m-[0px]"
                                                        width={"30%"}
                                                    />
                                                    <tbody className="tw-border-none tw-p-[0px] tw-m-[0px]">
                                                        <tr className="tw-border-none tw-p-[0px] tw-m-[0px]">
                                                            <td className="tw-border-none tw-p-[0]" colSpan={2}>
                                                                <h2 className="tw-text-lg tw-border-none tw-p-[0px] tw-m-[0px]  tw-font-bold tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
                                                                    {dataKey}
                                                                </h2>
                                                            </td>
                                                        </tr>
                                                        {Object.keys(value).map((valueKey, index) => {
                                                            return (
                                                                <tr
                                                                    className="tw-border-none tw-p-[0px] tw-m-[0px]"
                                                                    key={index}
                                                                >
                                                                    <td className="tw-font-bold tw-text-[#000000] tw-text-[12px] tw-border-none tw-p-[0px] tw-m-[0px] tw-capitalize">
                                                                        {valueKey}:
                                                                    </td>
                                                                    <td className="tw-text-ellipsis tw-text-[#000000] tw-text-[12px]  tw-font-normal tw-border-none tw-p-[0px] tw-m-[0px] tw-pl-[20px] tw-overflow-hidden tw-whitespace-nowrap">
                                                                        {value[valueKey]}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="tw-mt-[44px]"></div>
                            </div>
                            <div className=" tw-px-[48px] lg:tw-px-[28px] xl:tw-px-[48px] tw-pt-[39px]  tw-h-full lg:tw-w-[687px] tw-flex tw-flex-col  ">
                                <div
                                    className={`tw-flex tw-items-start  ${
                                        collectingDetails ? "tw-mb-[56px]" : "tw-mb-[17px]"
                                    }`}
                                >
                                    {collectingDetails ? (
                                        <Hash width="45" height="42.75" />
                                    ) : (
                                        <Tick width="46" height="46" />
                                    )}

                                    <button
                                        className="tw-hidden lg:tw-block tw-absolute tw-top-[24.36px] tw-right-[24.59px]"
                                        onClick={onHideConvert}
                                    >
                                        <Close />
                                    </button>
                                </div>
                                {collectingDetails ? (
                                    <ConversionForm onConvert={handleConvert} forMobile={false} />
                                ) : (
                                    <>
                                        <h1 className="tw-text-lg  tw-leading-[22px] tw-font-semibold">
                                            <b className="tw-font-semibold">Thank you!</b>
                                        </h1>
                                        <ConversionFinalizedPage
                                            forMobile={false}
                                            onMeeting={onMeeting}
                                            onLearnMore={onLearnMore}
                                            onWatchUs={onWatchUs}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConversionForm: React.FC<{
    forMobile: boolean;
    onConvert: (email: string, mobile: string) => Promise<void>;
}> = ({ forMobile, onConvert }) => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <>
            <p
                 className={`${forMobile ? "tw-mb-[17px]" : "xl:tw-mr[39px] lg:tw-mb-[13.25px] xl:tw-mb-[53.25px] "}`}
                style={{
                    lineHeight: forMobile ? "26px" : "30px",
                    fontSize: forMobile ? "16px" : "16px",
                }}
            >
                To fully experience the Spiff workflow, please provide your email and mobile number. We will save and
                send you a personalized product as a PDF with customization options. If you are a new client, we will
                also print and send out this board to you.
            </p>
            <div className="lg:tw-flex tw-justify-between">
                <div className="lg:tw-flex tw-grow">
                    <div className="tw-w-full tw-mr-[25px] tw-mb-[20px] md:tw-mb-[20px]">
                        <label
                            className="tw-block tw-leading-[16px] tw-tracking-wide tw-text-[#F23064] tw-text-[13px] tw-font-semibold tw-mb-[10px]"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="tw-appearance-none lg:tw-text-[14px] tw-leading-[20px] lg:tw-h-[38px]  lg:tw-w-[206px] lg:tw-min-w-0 tw-w-full  tw-min-w-0  tw-block  tw-text-[20px] tw-bg-white tw-text-[#000000] tw-border tw-rounded tw-py-3 tw-px-4   tw-outline-none"
                            style={{ boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.25)", borderRadius: 6 }}
                            type="email"
                            placeholder="john@doe.com"
                            disabled={loading}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="tw-w-full  tw-mr-[16px] tw-mb-[20px] md:tw-mb-[20px]">
                        <label
                            className="tw-block tw-leading-[16px]  tw-tracking-wide tw-text-[#F23064] tw-text-[13px]  tw-font-semibold tw-mb-[10px]"
                            htmlFor="mobile"
                        >
                            Mobile
                        </label>
                        <input
                            className="tw-appearance-none lg:tw-text-[14px] lg:tw-leading-[20px] lg:tw-w-[206px] lg:tw-min-w-0 tw-w-full  lg:tw-h-[38px] tw-text-[20px] tw-block  tw-bg-white tw-text-[#000000] tw-border tw-rounded tw-py-3 tw-pl-4  tw-leading-tight tw-outline-none"
                            style={{
                                boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.25)",
                                borderRadius: 6,
                            }}
                            type="tel"
                            placeholder="04504224"
                            disabled={loading}
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                        />
                    </div>
                </div>
                <div className="tw-w-full lg:tw-w-[200px] tw-flex tw-items-center ">
                    <button
                        style={{
                            all: "unset",
                            marginTop: forMobile ? 0 : 10,
                            width: forMobile ? "100%" : undefined,
                            // paddingTop: forMobile ? "20px" : "",
                            boxShadow: "2px 11px 20px rgba(51, 99, 108, 0.08)",
                        }}
                        className="tw-bg-[#F23064] tw-text-center lg:tw-font-medium lg:tw-text-[14px]  lg:tw-w-[140px] tw-text-white tw-leading-[71px] lg:tw-leading-[20px] tw-rounded-[10px] lg:tw-h-[36px] lg:tw-rounded-[6px] "
                        disabled={loading || email === ""}
                        onClick={async () => {
                            setLoading(true);
                            await onConvert(email, mobile);
                            setLoading(false);
                        }}
                    >
                        Send me the PDF
                    </button>
                </div>
            </div>
        </>
    );
};

const ConversionFinalizedPage: React.FC<{
    forMobile: boolean;
    onMeeting: () => void;
    onLearnMore: () => void;
    onWatchUs: () => void;
}> = ({ forMobile, onMeeting, onLearnMore, onWatchUs }) => {
    return (
        <>
            <div>
                <p className="tw-mt-4 tw-text-[16px] tw-leading-[30px] tw-text-[#000000] ">
                    You’ll receive an email with your product PDF shortly.
                </p>
                <p className="tw-my-[17px] lg:tw-pb-[32px] tw-text-[16px] tw-leading-[30px] tw-text-[#000000]">
                    Want to talk with an Spiff workflow experience customer support team member? You can easily book a
                    meeting below.
                </p>
            </div>
            <div className="tw-flextw-mt-auto tw-w-full" style={{ flexDirection: forMobile ? "column" : "row" }}>
                <button
                    style={{ all: "unset", boxShadow: "2px 11px 20px rgba(51, 99, 108, 0.08)" }}
                    className="tw-bg-[#F23064] lg:tw-font-medium lg:tw-leading-[20px] lg:tw-mb-0 tw-mb-[11px] tw-text-center lg:tw-h-[36px] lg:tw-text-[14px]  lg:tw-rounded-[6px] lg:tw-mr-[11px] tw-w-full  lg:tw-w-[128px]   tw-text-white tw-leading-[71px] tw-rounded-[10px]"
                    onClick={onMeeting}
                >
                    Book a meeting
                </button>
                <button
                    style={{ all: "unset", boxShadow: "2px 11px 20px rgba(51, 99, 108, 0.08)" }}
                    className="tw-bg-[#F23064] lg:tw-font-medium lg:tw-leading-[20px] lg:tw-mb-0 tw-mb-[17px] tw-text-center  lg:tw-rounded-[6px] lg:tw-mr-[11px] lg:tw-text-[14px] tw-w-full lg:tw-w-[178px] lg:tw-h-[36px]  tw-text-white tw-leading-[71px] tw-rounded-[10px]"
                    onClick={onLearnMore}
                >
                    Learn more about Spiff
                </button>
                <button
                    style={{
                        all: "unset",
                        // paddingTop: forMobile ? "20px" : "",
                        boxShadow: "2px 11px 20px rgba(51, 99, 108, 0.08)",
                    }}
                    className="tw-bg-[#F23064] lg:tw-font-medium lg:tw-leading-[20px] lg:tw-mb-0 tw-mb-[17px] tw-text-center  lg:tw-rounded-[6px] lg:tw-text-[14px] tw-w-full lg:tw-w-[147px] lg:tw-h-[36px]  tw-text-white tw-leading-[71px] tw-rounded-[10px]"
                    onClick={onWatchUs}
                >
                    Watch us in action
                </button>
            </div>
        </>
    );
};

export const Convert: React.FC<{
    onConvert: (email: string, mobile: string) => Promise<void>;
    onHideConvert: () => void;
    onLearnMore: () => void;
    onMeeting: () => void;
    onWatchUs: () => void;
    workflowExperience: WorkflowExperience;
}> = (props) => {
    const { onConvert, onHideConvert, onLearnMore, onMeeting, onWatchUs, workflowExperience } = props;

    return (
        <div>
            <div className="tw-hidden   lg:tw-block">
                <DesktopConvert
                    onConvert={onConvert}
                    onHideConvert={onHideConvert}
                    onLearnMore={onLearnMore}
                    onMeeting={onMeeting}
                    onWatchUs={onWatchUs}
                    workflowExperience={workflowExperience}
                />
            </div>
            <div className="lg:tw-hidden   ">
                <MobileConvert
                    onConvert={onConvert}
                    onHideConvert={onHideConvert}
                    onLearnMore={onLearnMore}
                    onMeeting={onMeeting}
                    onWatchUs={onWatchUs}
                    workflowExperience={workflowExperience}
                />
            </div>
        </div>
    );
};
