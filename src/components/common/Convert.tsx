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
            style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                position: "fixed",
                top: 20,
                bottom: 20,
                left: 15,
                right: 15,
            }}
        >
            <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                <button onClick={onHideConvert} style={{ position: "fixed", top: 25, right: 25 }}>
                    <Close />
                </button>
                <div
                    style={{
                        flex: "1 0 40%",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "20px 20px 0 0",
                        display: "flex",
                        flexDirection: "column",
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
                            className="tw-flex tw-flex-col tw-w-[312px] tw-h-[50%] tw-rounded-md grow"
                            style={{
                                backgroundImage: `url(${screenshot})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                margin: "18px auto",
                                flex: "1 0 50%",
                            }}
                        ></div>
                    )}
                    <div style={{ flex: "0 1 50%", overflowY: "scroll", marginLeft: "18px" }}>
                        {Array.from(exportedData).map(([dataKey, value]) => {
                            if (!value) {
                                return undefined;
                            }
                            return (
                                <div className="tw-w-full" key={dataKey}>
                                    <table className="tw-table-fixed tw-w-full tw-text-sm">
                                        <col width={"30%"} />
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>
                                                    <h2 className="tw-text-lg tw-font-bold tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
                                                        {dataKey}
                                                    </h2>
                                                </td>
                                            </tr>
                                            {Object.keys(value).map((valueKey, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="tw-font-bold tw-capitalize">{valueKey}:</td>
                                                        <td className="tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
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
                </div>
                <div style={{ flex: "0 1 60%" }}>
                    <div style={{ margin: 20 }}>
                        {collectingDetails ? (
                            <div
                                style={{
                                    display: "flex",
                                    margin: "5px 0",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Hash />
                                <p style={{ fontSize: 18, fontWeight: 600 }}>What happens next?</p>
                                <span style={{ visibility: "hidden" }}>
                                    <Hash />
                                </span>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    margin: "17px 0",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Tick />
                                <p style={{ fontSize: 18, fontWeight: 600 }}>Thank you!</p>
                                <span style={{ visibility: "hidden" }}>
                                    <Tick />
                                </span>
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
        <div className="tw-relative tw-z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="tw-fixed tw-inset-0 tw-z-10 tw-overflow-y-auto">
                <div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
                    <div
                        className="tw-relative tw-transform tw-overflow-hidden tw-bg-white tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full lg:tw-w-[70vw] lg:tw-h-[60vh] lg:tw-max-w-[1000px] lg:tw-max-h-[418px]"
                        style={{ borderRadius: 20 }}
                    >
                        <div className="tw-flex tw-h-full">
                            <div className="tw-w-full tw-bg-[#F5F5F5] tw-p-5 tw-flex tw-flex-col">
                                {!noReturn && (
                                    <button
                                        className="tw-p-1 tw-ml-auto tw-bg-transparent tw-border-0 tw-text-black  tw-float-right tw-text-xl tw-leading-none tw-font-semibold tw-outline-none focus:tw-outline-none tw-mt-2 tw-mr-2  tw-block lg:tw-hidden"
                                        onClick={onHideConvert}
                                    >
                                        X
                                    </button>
                                )}
                                <div
                                    className="tw-flex tw-flex-col tw-w-[312px] tw-h-[50%] tw-rounded-md tw-grow"
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
                                <div className="tw-mt-5 tw-border-spacing-2 tw-w-full tw-overflow-y-auto tw-shrink-[2] tw-flex tw-flex-col tw-gap-2">
                                    {Array.from(exportedData).map(([dataKey, value]) => {
                                        if (!value) {
                                            return undefined;
                                        }
                                        return (
                                            <div className="tw-w-full" key={dataKey}>
                                                <table className="tw-table-fixed tw-w-full tw-text-sm">
                                                    <col width={"30%"} />
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <h2 className="tw-text-lg tw-font-bold tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
                                                                    {dataKey}
                                                                </h2>
                                                            </td>
                                                        </tr>
                                                        {Object.keys(value).map((valueKey, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="tw-font-bold tw-capitalize">
                                                                        {valueKey}:
                                                                    </td>
                                                                    <td className="tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
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
                            </div>
                            <div className="tw-grow tw-p-8 tw-h-full tw-flex tw-flex-col tw-justify-between">
                                <div className="tw-flex tw-items-start tw-justify-between">
                                    {collectingDetails ? <Hash /> : <Tick />}
                                    {!noReturn && (
                                        <button className="tw-hidden lg:tw-block" onClick={onHideConvert}>
                                            <Close />
                                        </button>
                                    )}
                                </div>
                                {collectingDetails ? (
                                    <ConversionForm onConvert={handleConvert} forMobile={false} />
                                ) : (
                                    <>
                                        <h1 className="tw-text-lg tw-mt-4">
                                            <b>Thank you!</b>
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
                className="lg:tw-max-w-[85%]"
                style={{
                    lineHeight: forMobile ? "19px" : "30px",
                    fontSize: forMobile ? "14px" : "16px",
                    margin: forMobile ? "10px 0" : "0 0 17px",
                }}
            >
                To fully experience the Spiff workflow, please provide your email and mobile number. We will save and
                send you a personalized product as a PDF with customization options. If you are a new client, we will
                also print and send out this board to you.
            </p>
            <div className="lg:tw-flex tw-justify-between">
                <div className="lg:tw-flex tw-grow">
                    <div className="tw-w-full tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label
                            className="tw-block tw-tracking-wide tw-text-[#F23064] tw-text-xs tw-font-bold tw-mb-2"
                            htmlFor="email"
                        >
                            Email*
                        </label>
                        <input
                            className="tw-appearance-none tw-block tw-w-full tw-bg-white tw-text-[#000000] tw-border tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight tw-outline-none"
                            style={{ boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.25)", borderRadius: 6 }}
                            type="email"
                            placeholder="john@doe.com"
                            disabled={loading}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="tw-w-full tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label
                            className="tw-block tw-tracking-wide tw-text-[#F23064] tw-text-xs tw-font-bold tw-mb-2"
                            htmlFor="mobile"
                        >
                            Mobile
                        </label>
                        <input
                            className="tw-appearance-none tw-block tw-w-full tw-bg-white tw-text-[#000000] tw-border tw-rounded tw-py-3 tw-pl-4 tw-mb-3 tw-leading-tight tw-outline-none"
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
                <div className="tw-w-full lg:tw-w-[200px] tw-flex tw-items-center tw-px-3">
                    <button
                        style={{ all: "unset", marginTop: forMobile ? 0 : 10, width: forMobile ? "100%" : undefined }}
                        className="tw-bg-[#F23064] tw-text-white tw-rounded tw-p-2"
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
                <p className="tw-my-4 tw-text-slate-500 tw-text-lg tw-leading-relaxed">
                    You will receive an email with your product PDF shortly.
                </p>
                <p className="tw-my-4 tw-text-slate-500 tw-text-lg tw-leading-relaxed">
                    Book a meeting below with a workflow experience expert to learn more about Spiff.
                </p>
            </div>
            <div className="tw-flex tw-mt-auto tw-w-full" style={{ flexDirection: forMobile ? "column" : "row" }}>
                <button
                    style={{ all: "unset", margin: "2px" }}
                    className="tw-bg-[#F23064] tw-text-white tw-rounded tw-whitespace-nowrap tw-p-2"
                    onClick={onMeeting}
                >
                    Book a meeting
                </button>
                <button
                    style={{ all: "unset", margin: "2px" }}
                    className="tw-bg-[#F23064] tw-text-white tw-rounded tw-whitespace-nowrap p-2"
                    onClick={onLearnMore}
                >
                    Learn about more about Spiff
                </button>
                <button
                    style={{ all: "unset", margin: "2px" }}
                    className="tw-bg-[#F23064] tw-text-white tw-rounded tw-whitespace-nowrap tw-p-2"
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
            <div className="tw-hidden lg:tw-block">
                <DesktopConvert
                    onConvert={onConvert}
                    onHideConvert={onHideConvert}
                    onLearnMore={onLearnMore}
                    onMeeting={onMeeting}
                    onWatchUs={onWatchUs}
                    workflowExperience={workflowExperience}
                />
            </div>
            <div className="lg:tw-hidden">
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
