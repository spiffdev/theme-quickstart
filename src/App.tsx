import * as React from "react";
import { useCallback, useState, useRef, useEffect } from "react";
import { SpiffCommerceClient, WorkflowExperience, RenderableScene, StepHandle, AnyStepData } from "@spiffcommerce/core";
import { SpiffCommerce3DPreviewService } from "@spiffcommerce/preview";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import Rotatelogo from "./svg/Rotatelogo";
import { Step } from "./components/common/Step";
import { Convert } from "./components/common/Convert";
import { Spinner } from "./components/common/Spinner";

/**
 * This is the main wrapper component for the App editor.
 * See app in src/index.tsx for usage.
 */
const App: React.FunctionComponent<{
    /**
     * The workflow to be used.
     */
    workflowId: string;
    /**
     * The integration product associated to the workflow being run.
     */
    integrationProductId: string;
    /**
     * Callback for when the user clicks the "Start Meeting" button.
     */
    onMeeting: () => void;
    /**
     * Callback for when the user clicks the "Learn More" button.
     */
    onLearnMore: () => void;
    /**
     * Callback for when the user clicks the "Watch Us" button.
     */
    onWatchUs: () => void;
}> = ({ workflowId, integrationProductId, onMeeting, onLearnMore, onWatchUs }) => {
    const [workflowExperience, setWorkflowExperience] = useState<WorkflowExperience | undefined>(undefined);
    const [tabIndex, setTabIndex] = useState(0);
    const [showConversionUI, setShowConversionUI] = useState(false);
    const [steps, setSteps] = useState<StepHandle<AnyStepData>[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const setupWorkflowExperience = useCallback(
        async (client: SpiffCommerceClient) => {
            const exp = await client.getWorkflowExperience(workflowId, undefined, (workflow) => {
                const preview = new SpiffCommerce3DPreviewService({
                    ...workflow.globalPreviewConfig,
                    transparentBackground: true,
                });
                return preview;
            });
            setWorkflowExperience(exp);
        },
        [workflowId],
    );

    const handleTabChange = useCallback(
        (newStep: StepHandle<AnyStepData>) => {
            setShowConversionUI(false);
            setTabIndex(steps.findIndex((s) => s.getId() === newStep.getId()));
            newStep.executeAnimations();
        },
        [steps],
    );

    useEffect(() => {
        const client = new SpiffCommerceClient({});
        client.initFromIntegrationProduct(integrationProductId).then(() => {
            setupWorkflowExperience(client);
        });
    }, [integrationProductId, setupWorkflowExperience, workflowId]);

    useEffect(() => {
        if (canvasRef.current && workflowExperience) {
            workflowExperience.getWorkflowManager().getPreviewService()?.registerView(canvasRef.current);
        }
    }, [canvasRef, workflowExperience]);

    useEffect(() => {
        if (!workflowExperience) {
            return;
        }
        // This listener will be called each time a change occurs to the list of steps that are active.
        const onScenesChange = (scenes: RenderableScene[]) => {
            const renderableSteps = scenes.flatMap((s) => s.renderableSteps);
            const steps = workflowExperience.getSteps().filter((s) => renderableSteps.includes(s.getId()));
            setSteps(steps);
        };
        // Attach the listener right after the experience is constructed.
        workflowExperience.attachRenderableSceneListener(onScenesChange);
        // Detach before the experience is destroyed.
        return () => workflowExperience.detachRenderableSceneListener(onScenesChange);
    }, [workflowExperience]);

    const currentStep = steps[tabIndex];
    const hasSteps = steps.length > 0 && !!currentStep;

    return (
        <div className="App ">
            <div
                style={{
                    touchAction: "none",
                }}
                className="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col "
            >
                {hasSteps && (
                    <Header
                        headerHashtag={showConversionUI}
                        setHeaderHashtag={setShowConversionUI}
                        conversionScreenActive={showConversionUI}
                        steps={steps}
                        currentStep={currentStep}
                        onChangeTab={handleTabChange}
                    />
                )}
                <div className="tw-flex tw-flex-1 tw-justify-center content  tw-w-full    tw-relative ">
                    {hasSteps && !showConversionUI && <Step step={currentStep} />}

                    <canvas
                        key="canvas"
                        ref={canvasRef}
                        className={`tw-outline-none ${showConversionUI ? "tw-hidden" : "tw-block"}`}
                        style={{
                            maxWidth: "100%",
                            height: "100%",
                            display: !showConversionUI ? "block" : "hidden",
                        }}
                    />
                    {hasSteps && !showConversionUI && <PreviewHint />}
                    {!hasSteps && (
                        <div className="tw-absolute tw-w-full tw-h-full tw-pt-[10.4%] tw-flex tw-items-center tw-justify-center tw-pointer-events-none">
                            <Spinner />
                        </div>
                    )}
                </div>
                {hasSteps && showConversionUI && (
                    <Convert
                        workflowExperience={workflowExperience}
                        onConvert={(email, mobile) =>
                            workflowExperience.assignCustomerDetails({ emailAddress: email, phoneNumber: mobile })
                        }
                        onHideConvert={() => setShowConversionUI(false)}
                        onMeeting={onMeeting}
                        onLearnMore={onLearnMore}
                        onWatchUs={onWatchUs}
                    />
                )}
                <Footer
                    currentStep={currentStep}
                    onSave={() => setShowConversionUI(true)}
                    shouldShow={hasSteps && !showConversionUI}
                />
            </div>
        </div>
    );
};

const PreviewHint: React.FC = () => {
    return (
        <div
            className="tw-flex tw-items-end tw-flex-col tw-hidden lg:tw-block"
            style={{ position: "absolute", top: "30px", right: "30px" }}
        >
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-2">
                <Rotatelogo className="tw-animate-spin-slow" />
                <p
                    style={{
                        all: "unset",
                        fontWeight: 200,
                        fontSize: 14,
                    }}
                    className="tw-font-light tw-text-[18px] tw-text-white tw-leading-5"
                >
                    3D Rotate View
                </p>
            </div>
        </div>
    );
};

export default App;
